from flask import Flask, request
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Sneaker
from exts import db
from flask_migrate import Migrate

# creating Flask instance
app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)

migrate = Migrate(app, db)

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


@api.route("/hello")
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}


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
