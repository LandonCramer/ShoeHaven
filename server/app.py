from flask import Flask, request, jsonify, make_response
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Sneaker, User
from exts import db
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token,get_jwt_identity, jwt_required  


# 'pbkdf2:sha256:600000$fPr80Ucsm48KZZ8E$a4dd6c1f35412884a2fe620f2a1683adaa5ec2359a075befb2305362b36965a2'

# creating Flask instance
app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)

migrate = Migrate(app, db)
JWTManager(app)

api = Api(app, doc="/docs")

# model serializer, formats into JSON so we can use in the front end.
sneaker_model = api.model(
    "Sneaker",
    {
        "id": fields.Integer(),
        "brand": fields.String(),
        "name": fields.String(),
        "color": fields.String(),
        "description": fields.String(),
        "price": fields.Float(),
        "image": fields.String(),
        "link": fields.String(),
    },
)

signup_model=api.model(
    "SignUp",
    {
        "username":fields.String(),
        "email":fields.String(),
        "password":fields.String()
    }
)

login_model=api.model(
    'Login',
    {
        'username':fields.String(),
        'password':fields.String()
    }
)


@api.route("/hello")
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}



@api.route('/signup')
class SignUp(Resource):
    #not this decorator helps us to expect data and serialize
    @api.expect(signup_model)
    def post(self):
        #accsess data from client
        data = request.get_json()
        #checking if user exists
        username =data.get('username')
        #creating a database query to check if the user exists
        db_user = User.query.filter_by(username=username).first()

        if db_user is not None:
            return jsonify({"message":f"User with username {username} already exists"})

        new_user=User(
            username=data.get('username'),
            email=data.get('email'),
            #hashing password with Werkzeug function, get data from client and hash it
            password=generate_password_hash(data.get('password'))
        )
        #created a convenience method in models to add current object to data base session 
        new_user.save()

       
        return make_response(jsonify({"message": "User created successfuly"}), 201)

@api.route('/login')
class Login(Resource):

    @api.expect(login_model)
    def post(self):
        data=request.get_json()

        username=data.get('username')
        password=data.get('password')
        
        #if username is equal to the username get first obj
        db_user=User.query.filter_by(username=username).first()

        #if user exists check password hash then password
        if db_user and check_password_hash(db_user.password, password):

            access_token=create_access_token(identity=db_user.username)
            refresh_token=create_refresh_token(identity=db_user.username)
            
            return jsonify({"access_token":access_token, "refresh_token":refresh_token})

#This is our refresh token
@api.route("/refresh")
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return make_response(jsonify({"access_token": new_access_token}), 200)





@api.route("/sneakers")
class SneakersResource(Resource):
    # serializes model
    @api.marshal_list_with(sneaker_model)
    def get(self):
        """Get all sneakers"""
        sneakers = Sneaker.query.all()

        return sneakers

    @api.marshal_with(sneaker_model)
    def post(self):
        """Create a new sneaker"""

        data = request.get_json()

        new_sneaker = Sneaker(
            brand=data.get("brand"),
            name=data.get("name"),
            color=data.get("color"),
            description=data.get("description"),
            price=data.get("price"),
            image=data.get("image"),
            link=data.get("link"),
        )
        new_sneaker.save()

        return new_sneaker, 201


@api.route("/sneaker/<int:id>")
class SneakerResource(Resource):
    @api.marshal_with(sneaker_model)
    def get(self, id):
        """Get shoe by id"""
        sneaker = Sneaker.query.get_or_404(id)

        return sneaker

    @api.marshal_with(sneaker_model)
    def put(self, id):
        """Update shoe by id"""

        sneaker_to_update = Sneaker.query.get_or_404(id)
        data = request.get_json()

        sneaker_to_update.update(
            data.get("brand"),
            data.get("name"),
            data.get("color"),
            data.get("description"),
            data.get("price"),
            data.get("image"),
            data.get("link"),
        )

        return sneaker_to_update

    @api.marshal_with(sneaker_model)
    def delete(self, id):
        """Delete shoe by id"""

        sneaker_to_delete = Sneaker.query.get_or_404(id)

        sneaker_to_delete.delete()

        return sneaker_to_delete


# model (serializer)
@app.shell_context_processor
def make_shell_context():
    return {"db": db, "Sneaker": Sneaker}


# Members API Route-setup
# @api.route("/members")
# def members():
#     return {"members":  ["Member1", "Memeber2", "Member3" ]}


if __name__ == "__main__":
    app.run(debug=True)
