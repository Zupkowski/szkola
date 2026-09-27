from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "<h1>Strona główna</h1>"

@app.route("/dodaj/<int:a>/<int:b>")
def dodaj(a,b):
    return f"{a}+{b} = {a+b}"
@app.route("/odejmij/<int:a>/<int:b>")
def odejmij(a,b):
    return f"{a}-{b} = {a-b}"
@app.route("/pomnoz/<int:a>/<int:b>")
def pomnoz(a,b):
    return f"{a}*{b} = {a*b}"
@app.route("/podziel/<int:a>/<int:b>")
def podziel(a,b):
    if b == 0:
        return "NIE MOŻNA DZIELIĆ PRZEZ ZERO"
    else:
        return f"{a}/{b} = {a/b}"

if __name__ == '__main__':
    app.run(debug=True)