from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
import json

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'newU'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/users'

mongo = PyMongo(app)

@app.route('/star', methods=['GET'])
def get_all_stars():
  star = mongo.db.names
  output = []
  for s in star.find():
    output.append({'name' : s['name'],'email':s['email'],'id':s['id']})
  return jsonify( output)

@app.route('/star', methods=['POST'])
def add_star():
  mongo.db.names.drop()
  star = mongo.db.names
  output = []
  for s in request.json:
    name = s['name']
    email = s['email']
    user_id = s['id']
    star_id = star.insert({'name': name, 'email': email, 'id': user_id})
    new_star = star.find_one({'_id': star_id })
    output.append({'name' : new_star['name'], 'email' : new_star['email'], 'id':new_star['id']})
  return jsonify({'result' : output})

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80,debug=True)
