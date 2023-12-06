from flask import Flask, request
from flask_restx import Api,Resource, fields
from config import DevConfig
from models import Sneaker
from exts import db

#creating Flask instance
app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)

api=Api(app,doc='/docs')

# model serializer
sneaker_model=api.model(
    "Sneaker",
    {
        "id":fields.Integer(),
        "brand":fields.String(),
        "model":fields.String(),
        "size":fields.String(),
        "description":fields.String(),
        "price":fields.Float()
    }
)

@api.route('/hell0')
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}


@api.route('/sneakers')
class SneakersResource(Resource):
    # serializes model
    @api.marshal_list_with(sneaker_model)
    def get(self):
        """Get all sneakers"""
        sneakers = Sneaker.query.all()

        return sneakers
    @api.marshal_list_with(sneaker_model)
    def post(self):
        """ Create a new sneaker"""
        
        data = request.get_json()

        new_sneaker=Sneaker(
            brand=data.get('brand'),
            model=data.get('model'),
            size=data.get('size'),
            description=data.get('description'),
            price=data.get('price')
        )
        new_sneaker.save()

        return new_sneaker,201


@api.route('/sneaker/<int:id>')
class SneakerResource(Resource):
    
    @api.marshal_with(sneaker_model)
    def get(self, id):
        """ Get shoe by id"""
        sneaker=Sneaker.query.get_or_404(id)

        return sneaker
    
    @api.marshal_with(sneaker_model)   
    def put(self, id):
        """Update shoe by id"""
        
        sneaker_to_update = Sneaker.query.get_or_404(id)
        data = request.get_json()

        sneaker_to_update.update(data.get('brand'), data.get('model'), data.get('size'), data.get('description'), data.get('price'))

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


if __name__=="__main__":
    app.run(debug=True)
