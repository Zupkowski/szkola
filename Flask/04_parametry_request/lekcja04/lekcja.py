from flask import Flask, request

app = Flask(__name__)

MOVIES = [
    {"id": 1, "title": "Oppenheimer", "genre": "dramat", "year": 2023, "rating": 8.4},
    {"id": 2, "title": "Barbie",      "genre": "komedia", "year": 2023, "rating": 6.8},
    {"id": 3, "title": "Dune: Part 2","genre": "sci-fi",  "year": 2024, "rating": 8.5},
    {"id": 4, "title": "Poor Things", "genre": "dramat",  "year": 2023, "rating": 7.8},
    {"id": 5, "title": "Saltburn",    "genre": "thriller","year": 2023, "rating": 7.1},
]


@app.route("/filmy")
def movie_list():
    genre = request.args.get("gatunek")       # None jeśli brak parametru
    year  = request.args.get("rok", type=int) # None + konwersja do int
    page  = request.args.get("strona", 1, type=int)  # domyślnie strona 1

    results = MOVIES

    if genre:
        results = [m for m in results if m["genre"] == genre]
    if year:
        results = [m for m in results if m["year"] == year]

    # prosta paginacja — 2 filmy na stronę
    per_page = 2
    start = (page - 1) * per_page
    paginated = results[start : start + per_page]

    lines = [f"{m['title']} ({m['year']}) — {m['genre']}, ocena: {m['rating']}"
             for m in paginated]
    return "<br>".join(lines) or "Brak wyników."

if __name__ == "__main__":
    app.run(debug=True)