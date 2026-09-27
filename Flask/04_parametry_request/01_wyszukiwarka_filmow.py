from flask import Flask, request

app = Flask(__name__)

# Przykładowa baza filmów — jak na Filmweb
MOVIES = [
    {"id": 1, "title": "Oppenheimer",  "genre": "dramat",  "year": 2023, "rating": 8.4},
    {"id": 2, "title": "Barbie",       "genre": "komedia", "year": 2023, "rating": 6.8},
    {"id": 3, "title": "Dune: Part 2", "genre": "sci-fi",  "year": 2024, "rating": 8.5},
    {"id": 4, "title": "Poor Things",  "genre": "dramat",  "year": 2023, "rating": 7.8},
    {"id": 5, "title": "Saltburn",     "genre": "thriller","year": 2023, "rating": 7.1},
    {"id": 6, "title": "Alien: Romulus","genre":"sci-fi",  "year": 2024, "rating": 7.3},
]

@app.route("/filmy")
def movie_list():
    genre = request.args.get("gatunek")
    year = request.args.get("rok", type=int)
    page = request.args.get("strona", 1, type=int)

    results = MOVIES

    if genre:
        results = [m for m in results if m["genre"] == genre]
    if year:
        results = [m for m in results if m["year"] == year]

    # prosta paginacja
    per_page = 2
    start = (page - 1) * per_page
    paginated = results[start:start + per_page]

    lines = [f'{m['title']} ({m["year"]}) - {m['genre']}, ocena: {m["rating"]}' for m in paginated]

    return '<br>'.join(lines) or 'Brak wyników'

@app.route("/szukaj")
def search():
    query = request.args.get("q", '').strip()

    if not query:
        return 'Wpisz frazę: /szukaj?q=tytul'

    results = [m for m in MOVIES if query.lower() in m['title'].lower()]

    if not results:
        return f'Brak wyników dla frazy: <strong>{query}</strong>'

    lines = [f'<li>{m['title']} ({m['year']})</li>' for m in results]
    return f'<p>Wyniki dla: <strong>{query}</strong></p><ul>{"".join(lines)}</ul>'

@app.route("/info")
def request_info():
    lines = [
        f'Metoda: {request.method}',
        f'Pełny URL: {request.url}',
        f'Ścieżka: {request.path}',
        f'Query string: {request.query_string.decode()}',
        f'Adres IP klienta: {request.remote_addr}',
        f'User-Agent: {request.headers.get("User-Agent")}',
        f'Akceptowane języki: {request.headers.get("Accept-Language")}',
    ]
    return '<br>'.join(lines)

@app.route("/sklep")
def shop():
    user_agent = request.headers.get("User-Agent", '')
    is_mobile = 'Mobile' in user_agent or 'Android' in user_agent

    if is_mobile:
        return '<p>Wersja mobilna sklepu</p>'
    return '<p>Wersja desktopowa sklepu</p>'

if __name__ == "__main__":
    app.run(debug=True)