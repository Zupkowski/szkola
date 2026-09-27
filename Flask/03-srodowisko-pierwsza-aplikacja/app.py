from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/witaj/<name>')
def greet(name):
    return f'Witaj {name}!!!'

@app.route('/produkt/<int:product_id>')
def product(product_id):
    return f'Produkt o ID: {product_id} (typ: {type(product_id).__name__})'

@app.route("/dodaj/<int:a>/<int:b>")
def add(a, b):
    return f"{a} + {b} = {a + b}"



if __name__ == '__main__':
    app.run(debug=True)