from flask import Flask, request, jsonify, make_response, session
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Sneaker, User, Cart, CartSneaker, UserSneaker
from exts import db
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token,get_jwt_identity, jwt_required, current_user
from flask_cors import CORS
from datetime import datetime 
# 'pbkdf2:sha256:600000$fPr80Ucsm48KZZ8E$a4dd6c1f35412884a2fe620f2a1683adaa5ec2359a075befb2305362b36965a2'

# creating Flask instance
app = Flask(__name__)
app.config.from_object(DevConfig)

CORS(app)

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

# cart_model=api.model(
#     "CartItem",
#     {
        
#         'sneaker_id':fields.Integer(),
#         'quantity':fields.Integer()
#     }
# )

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
           
        access_token = create_access_token(identity=new_user.username, expires_delta=False)
        refresh_token = create_refresh_token(identity=new_user.username, expires_delta=False)
            # serialized_user = User
            
            # session["currentId"]=db_user.id
        return jsonify({"access_token":access_token, "refresh_token":refresh_token, "new_user":new_user.to_dict()}),201
       
@api.route('/login')
class Login(Resource):

    @api.expect(login_model)
    def post(self):
        # import ipdb; ipdb.set_trace()
        data=request.get_json()

        username=data.get('username')
        password=data.get('password')
        
        #if username is equal to the username get first obj
        db_user=User.query.filter_by(username=username).first()

        #if user exists check password hash then password
        if db_user and check_password_hash(db_user.password, password):
         
            
            access_token = create_access_token(identity=db_user.username, expires_delta=False)
            refresh_token = create_refresh_token(identity=db_user.username, expires_delta=False)
            # serialized_user = User
            
            # session["currentId"]=db_user.id
            # import ipdb; ipdb.set_trace()
            return jsonify({"access_token":access_token, "refresh_token":refresh_token})## "db_user": db_user})
        return jsonify({"message":"Invalid credentials"})

@api.route('/logout')
class LogOut(Resource):
    def get(self):
        #  session["currentId"]= ""
         return make_response({}, 200)

@api.route('/currentuser')
class CurrentUser(Resource):
    @jwt_required()
    def get(self):
        try:
            currentId = get_jwt_identity()
            return currentId, 200
        except Exception as e:
            return str(e) 



from flask_restful import Resource




# user_schema = User(session=db.session)

@api.route("/me")
class Me(Resource):
    @jwt_required()
    def get(self):
        # if session.get("coach_id"):
        if user := db.session.get(User, get_jwt_identity()):
            return User, 200
        return {"message": "Unathorized"}, 403
        # return {"message": "Unathorized"}, 403



#This is our refresh token
@api.route("/refresh")
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return make_response(jsonify({"access_token": new_access_token}), 200)


# @api.route('/cartItem')
# class CartItemResource(Resource):
#     @jwt_required()
#     # @api.marshal_with(cart_model)
#     def post(self):
#         """Add sneaker to cart"""

#         print("hello world")

#         data = request.get_json()
#         print("data from Post", data)
#         new_shoe_cartItem = CartItem
#         addSneakerToCart = Cart(

#         )



# class CartByUserID(Resource):
#     @jwt_required()
#     def get(self):
#         try:
#             user_id = get_jwt_identity()
#             cart = Cart.query.filter_by(user_id=user_id).first()
#             if cart:
#                 return make_response(cart.to_dict(), 200)
#             else:
#                 return make_response(
#                     {"errors": "Cart Not Found"}, 404
#                 )
#         except (ValueError, AttributeError, TypeError) as e:
#             return make_response(
#                 {"errors": [str(e)]}, 400
#             )
#     @jwt_required()
#     def patch(self):
        
#         try:
#             # not sure if I need this...
#             user_id = get_jwt_identity()
#             cart = Cart.query.filter_by(user_id=user_id).first()
            
#             # cart = db.session.get(Cart, user_id)
#             if cart:
#                 data = json.loads(request.data)
#                 for attr in data:
#                     setattr(cart, attr, data[attr])
#                 db.session.add(cart)
#                 db.session.commit()
#                 return make_response(cart.to_dict(), 200)
#             else:
#                 return make_response(
#                     {"errors": "Update unsuccessful"}, 400
#                 )
#         except (ValueError, AttributeError, TypeError) as e:
#             db.session.rollback()
#             return make_response(
#                 {"errors": [str(e)]}, 400
#             )
#     @jwt_required()
#     def delete(self):
#         try:
#             # Get the current user's ID from the JWT token.. do I need this
#             user_id = get_jwt_identity()
#             cart = Cart.query.filter_by(user_id=user_id).first()
#             # cart = db.session.get(Cart, user_id)
#             if cart:
#                 db.session.delete(cart)
#                 db.session.commit()
#                 return make_response({}, 204)
#             else:
#                 return make_response(
#                     {"errors": "Delete unsuccessful"}, 400
#                 )
#         except (ValueError, AttributeError, TypeError) as e:
#             db.session.rollback()
#             return make_response(
#                 {"errors": [str(e)]}, 400
#             )
        
# api.add_resource(CartByUserID, '/cartItem')













        # Retrieve User_id from the access token
        # current_user = get_jwt_identity()
        # user = User.query.filter_by(username=current_user).first()

        #Check if the sneaker is in the user's collection
        # user_sneaker = UserSneaker.query.filter_by(userid=user.id, sneakerid=sneaker_id).first()
        # try:
        
        #     # Check if the user is logged in
        #     if not user:
        #         return {"error": "User not logged in"}, 401

        #     # Check if the sneaker is in the user's collection
        #     # user_sneaker = UserSneaker.query.filter_by(userid=user.id, sneakerid=sneaker_id).first()

        #     # if user_sneaker:
        #         # return {"error": "Sneaker not found in user's collection"}, 404
                
        #     # Check if the sneaker is already in the user's cart
               
        #     cart = Cart.query.filter_by(userid=user.id).first()
        #     print('cart1', cart)
        #     createCart = Cart(userid=user.id)
        #     db.session.add(createCart)
        #     db.seesion.commit()
        #     createCart.save()
            
        #     cart = Cart.query.filter_by(userid=userid).first()
        #     print('cart', cart)

        #     cart_item = CartItem.query.filter_by(cartid=cartid).first()
               
        #     print('cartItem', cart_item)
            
        #     # If the sneaker is already in the cart, increment the quantity
        #     cart_item.quantity += quantity
            
        #      # If the sneaker is not in the cart, create a new cart item
        #     cart_item = CartItem(cartid=cart.id, sneakerid=sneaker_id, quantity=quantity)
        #     db.session.add(cart_item)

        #     # Update the 'updated_at' timestamp in the Cart table
        #     cart.updated_at = datetime.utcnow()

        #     # Commit changes to the database
        #     db.session.commit()

        #     # Optionally, you can return a success message or redirect to the cart page
        #     return {"message": "Item added to the cart successfully"}, 200

        # except Exception as e:
        #     # Handle any exceptions that may occur during the process
        #     return {"error": str(e)}, 500

























@api.route("/sneakers")
class SneakersResource(Resource):
    # serializes model
    @api.marshal_list_with(sneaker_model)
    def get(self):
        """Get all sneakers"""
        
        sneakers = Sneaker.query.all()
        print('SNEAKERS', sneakers,'\n')

        return serialized_sneakers

    @api.marshal_with(sneaker_model)
    @api.expect(sneaker_model)
    @jwt_required()
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
    @jwt_required()
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
    @jwt_required()
    def delete(self, id):
        """Delete shoe by id"""

        sneaker_to_delete = Sneaker.query.get_or_404(id)

        sneaker_to_delete.delete()

        return sneaker_to_delete


# model (serializer)
@app.shell_context_processor
def make_shell_context():
    return {"db": db, "Sneaker": Sneaker, "User": User, "Cart":Cart, "UserSneaker":UserSneaker, "CartSneaker":CartSneaker}


# Members API Route-setup
# @api.route("/members")
# def members():
#     return {"members":  ["Member1", "Memeber2", "Member3" ]}


if __name__ == "__main__":
    app.run(debug=True)
