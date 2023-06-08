from flask import Flask, request
from flask_cors import CORS
import pymongo

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient(
    "mongodb+srv://interview:interview@cluster0.14k3kof.mongodb.net/?retryWrites=true&w=majority"
)

db = client["elixir-interview-july-2022"]


def find_username(username: str, db) -> bool:
    try:
        user = db.users.find_one({"username": username})

        if user is not None:
            return True

        return False
    except:
        return False


def find_email(email: str, db) -> bool:
    try:
        email = db.users.find_one({"email": email})

        if email is not None:
            return True

        return False
    except:
        return False


def create_user(username: str, email: str, password: str, db) -> bool:
    try:
        db.users.insert_one(
            {"username": username, "email": email, "password": password}
        )
        return True
    except:
        return False


@app.route("/api/signup", methods=["POST"])
def signup():
    username = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")

    if find_username(username, db):
        return {"message": "The username already exists"}, 400

    if find_email(email, db):
        return {"message": "The email already exists"}, 400

    if create_user(username, email, password, db):
        return {"message": "User created"}, 200
    else:
        return {"message": "There was a problem creating the user"}, 500


@app.after_request
def add_header(response):
    response.headers["Cache-Control"] = "no-store"
    return response


if __name__ == "__main__":
    app.run(debug=True)
