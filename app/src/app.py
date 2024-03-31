from flask import Flask, jsonify, request
from flask_cors import CORS
from time import sleep
from libs.GeneticAlgorithms import GenAlg
import json

app = Flask(__name__, static_folder='./public/', static_url_path='/statics/')

# Permitir todas las solicitudes desde cualquier origen y cualquier método
cors = CORS(app, resources={r"/*": {"origins": "*"}},
            allow_headers="Content-Type")


@app.post('/make')
def index():
    
    a = json.loads(request.get_data())
    he = GenAlg()
    he.load(a)
    res = he.run()
    del he
    return jsonify(res)


if __name__ == '__main__':
    app.run(debug=True)
