from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='./public/', static_url_path='/statics/')

# Ruta para enviar el archivo index.html
@app.get('/')
def index():
    return send_from_directory('views','index.html')
