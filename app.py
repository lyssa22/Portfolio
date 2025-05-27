from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('templates', 'index.html')

@app.route('/data/<path:filename>')
def data(filename):
    return send_from_directory('data', filename)

@app.route('/styles/<path:filename>')
def styling(filename):
    return send_from_directory('styles', filename)

@app.route('/fetch/<path:filename>')
def fetch(filename):
    return send_from_directory('fetch', filename)

@app.route('/images/<path:filename>')
def image(filename):
    return send_from_directory('images', filename)

if __name__ == '__main__':
    app.run(debug=True)

