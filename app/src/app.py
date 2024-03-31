from flask import Flask, jsonify, request
from flask_cors import CORS
from src.libs.GeneticAlgorithms import GenAlg
import json

app = Flask(__name__, static_folder='./public/', static_url_path='/statics/')

# Permitir todas las solicitudes desde cualquier origen y cualquier método
cors = CORS(app, resources={r"/*": {"origins": "*"}},
            allow_headers="Content-Type")


@app.route('/make', methods=['POST'])
def index():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No se proporcionaron datos JSON'}), 400

    he = GenAlg()
    he.load(data)
    res = he.run()
    del he
    return jsonify(res)


if __name__ == '__main__':
    app.run(port=8080)
