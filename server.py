from flask import Flask, request
from flask_cors import CORS
import pymongo

app = Flask(__name__)
CORS(app)

@app.route('/api/signup', methods=['POST'])
def signup():
    client = pymongo.MongoClient("mongodb+srv://interview:interview@cluster0.14k3kof.mongodb.net/?retryWrites=true&w=majority")
    db = client['elixir-interview-july-2022']
    all_users = [user for user in db.users.find()]

    return {'success': True, 'request': request.form, 'users': len(all_users)}, 200

@app.after_request
def add_header(response):
    response.headers['Cache-Control'] = 'no-store'
    return response
