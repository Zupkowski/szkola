# Lekcja 4 — Zmienne w URL, parametry zapytań i obiekt request

## Cele lekcji

Po tej lekcji:
- rozróżniasz zmienne w ścieżce URL od parametrów zapytania (query string),
- odczytujesz parametry zapytania przez `request.args`,
- dostarczasz wartości domyślne dla opcjonalnych parametrów,
- odczytujesz nagłówki żądania i adres IP klienta z obiektu `request`,
- budujesz realistyczne widoki z filtrami i paginacją.

---

## Część 1 — Dwa sposoby przekazywania danych w URL

Zanim napiszemy kod, zrozummy różnicę na przykładach ze znanych serwisów.

### Zmienne w ścieżce — identyfikują konkretny zasób

```
youtube.com/watch?v=dQw4w9WgXcQ   ← zmienna identyfikuje konkretny film
allegro.pl/oferta/12345678         ← ID oferty jako część ścieżki
filmweb.pl/film/Inception-2010-... ← slug (przyjazna nazwa) zamiast ID
```

Zmienna w ścieżce odpowiada na pytanie: **„co to konkretnie jest?"**

### Parametry zapytania — filtrują lub konfigurują widok

```
allegro.pl/listing?string=buty&order=p  ← szukaj "buty", sortuj po cenie
filmweb.pl/films?genre=thriller&page=2  ← filmy, gatunek thriller, strona 2
youtube.com/results?search_query=flask  ← wyniki wyszukiwania
```

Parametry zapytania odpowiadają na pytanie: **„jak chcesz to zobaczyć?"**

### Zasada doboru

| Użyj zmiennej w ścieżce gdy... | Użyj parametru zapytania gdy... |
|---|---|
| Identyfikujesz konkretny zasób | Filtrujesz, sortujesz lub stronicujesz listę |
| Adres bez tego parametru nie ma sensu | Parametr jest opcjonalny |
| Chcesz, żeby Google indeksował każdy zasób | Nie chcesz indeksowania każdej kombinacji filtrów |

---

## Część 2 — Parametry zapytania i `request.args`

### 2.1 Skąd Flask wie o parametrach?

Gdy przeglądarka wysyła:
```
GET /szukaj?miasto=Kraków&pogoda=słoneczna HTTP/1.1
```

Flask rozkłada URL na:
- ścieżka: `/szukaj`
- query string: `miasto=Kraków&pogoda=słoneczna`

i udostępnia je przez `request.args` — słownik tylko do odczytu.

### 2.2 Wyszukiwarka filmów — przykład

Wyobraź sobie, że budujesz serwis podobny do Filmweb. Użytkownik wchodzi na:
```
/filmy?gatunek=thriller&rok=2023&strona=2
```

```python
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
```

Przetestuj w przeglądarce:
```
/filmy                          → wszystkie filmy, strona 1
/filmy?gatunek=dramat           → tylko dramaty
/filmy?rok=2023                 → filmy z 2023
/filmy?gatunek=dramat&rok=2023  → dramaty z 2023
/filmy?strona=2                 → druga strona wyników
```

### 2.3 `request.args.get()` — trzy formy

```python
# Forma 1 — zwraca None jeśli parametr nie istnieje
city = request.args.get("miasto")

# Forma 2 — zwraca wartość domyślną jeśli parametr nie istnieje
page = request.args.get("strona", 1)

# Forma 3 — konwertuje typ i zwraca wartość domyślną
page = request.args.get("strona", 1, type=int)
#                                  ↑          ↑
#                              domyślna    konwersja — jeśli konwersja
#                              wartość     się nie uda, też zwraca domyślną
```

> `type=int` chroni Cię przed błędem gdy użytkownik wpisze `/filmy?strona=abc` — Flask zamiast rzucić wyjątek, po prostu zwróci wartość domyślną.

### 2.4 Wyszukiwarka z frazą — jak Google

```python
@app.route("/szukaj")
def search():
    query = request.args.get("q", "").strip()

    if not query:
        return "Wpisz frazę: /szukaj?q=flask"

    results = [m for m in MOVIES if query.lower() in m["title"].lower()]

    if not results:
        return f"Brak wyników dla frazy: <strong>{query}</strong>"

    lines = [f"<li>{m['title']} ({m['year']})</li>" for m in results]
    return f"<p>Wyniki dla: <strong>{query}</strong></p><ul>{''.join(lines)}</ul>"
```

```
/szukaj?q=dune     → Dune: Part 2
/szukaj?q=bar      → Barbie
/szukaj            → komunikat "wpisz frazę"
```

---

## Część 3 — Obiekt `request` — co jeszcze potrafi

`request` to więcej niż tylko parametry URL. Przechowuje **całe żądanie HTTP**.

### 3.1 Najważniejsze atrybuty

```python
@app.route("/info")
def request_info():
    lines = [
        f"Metoda: {request.method}",
        f"Pełny URL: {request.url}",
        f"Ścieżka: {request.path}",
        f"Query string: {request.query_string.decode()}",
        f"Adres IP klienta: {request.remote_addr}",
        f"User-Agent: {request.headers.get('User-Agent')}",
        f"Akceptowane języki: {request.headers.get('Accept-Language')}",
    ]
    return "<br>".join(lines)
```

Wejdź na `/info` i przeczytaj, co Flask widzi w Twoim żądaniu.

### 3.2 Skąd pochodzi użytkownik? — nagłówek Referer

Na prawdziwych stronach używa się nagłówka `Referer` (tak, z błędem ortograficznym — to historyczna literówka w standardzie HTTP), żeby wiedzieć, z jakiej strony użytkownik trafił na naszą:

```python
@app.route("/artykul/<int:article_id>")
def article(article_id):
    referer = request.headers.get("Referer", "bezpośrednie wejście")
    return (
        f"<h2>Artykuł #{article_id}</h2>"
        f"<p>Trafiłeś tu z: {referer}</p>"
    )
```

### 3.3 Wykrywanie urządzenia mobilnego

```python
@app.route("/sklep")
def shop():
    user_agent = request.headers.get("User-Agent", "")
    is_mobile = "Mobile" in user_agent or "Android" in user_agent

    if is_mobile:
        return "<p>Wersja mobilna sklepu 📱</p>"
    return "<p>Wersja desktopowa sklepu 🖥️</p>"
```

> W prawdziwych aplikacjach do tego używa się biblioteki `user-agents` lub CSS media queries — ale zasada jest ta sama.

### 3.4 Pełna tabela atrybutów `request`

| Atrybut | Typ | Co zwraca |
|---|---|---|
| `request.method` | `str` | Metoda HTTP: `"GET"`, `"POST"`, … |
| `request.url` | `str` | Pełny URL z query stringiem |
| `request.path` | `str` | Tylko ścieżka, bez domeny i query stringa |
| `request.args` | `ImmutableMultiDict` | Parametry z query stringa |
| `request.form` | `ImmutableMultiDict` | Dane z formularza POST |
| `request.json` | `dict` lub `None` | Ciało żądania sparsowane jako JSON |
| `request.headers` | `EnvironHeaders` | Nagłówki HTTP żądania |
| `request.cookies` | `dict` | Ciasteczka wysłane przez przeglądarkę |
| `request.remote_addr` | `str` | Adres IP klienta |
| `request.files` | `ImmutableMultiDict` | Pliki wysłane w formularzu |

---

## Część 4 — Ćwiczenia praktyczne

### Ćwiczenie 1 — Menu restauracji z filtrem

Zbuduj listę dań z możliwością filtrowania po kategorii i cenie maksymalnej.

```
/menu                         → wszystkie dania
/menu?kategoria=pizza         → tylko pizze
/menu?max_cena=25             → dania do 25 zł
/menu?kategoria=pizza&max_cena=30
```

**Dane do wykorzystania:**
```python
MENU = [
    {"name": "Margherita",     "category": "pizza",  "price": 28},
    {"name": "Pepperoni",      "category": "pizza",  "price": 34},
    {"name": "Tiramisu",       "category": "deser",  "price": 18},
    {"name": "Spaghetti",      "category": "makaron","price": 32},
    {"name": "Cheesecake",     "category": "deser",  "price": 16},
    {"name": "Quattro Formaggi","category": "pizza", "price": 38},
]
```

**Rozwiązanie:** — patrz `przyklady/02_menu_restauracji.py`

---

### Ćwiczenie 2 — Kalkulator walutowy

Zbuduj prosty przelicznik walut:
```
/przelicz?kwota=100&z=PLN&na=EUR  → "100 PLN = 23.26 EUR"
/przelicz?kwota=50&z=USD&na=PLN  → "50 USD = 197.50 PLN"
/przelicz                         → instrukcja użycia
```

Kursy walut (uproszczone, na stałe w kodzie):
```python
RATES_TO_PLN = {"PLN": 1.0, "EUR": 4.30, "USD": 3.95, "GBP": 5.10, "CHF": 4.45}
```

---

## Podsumowanie lekcji

```
URL:  /filmy?gatunek=thriller&strona=2
       ↑                               
     ścieżka    parametry zapytania (query string)
                    ↓
              request.args.get("gatunek")   → "thriller"
              request.args.get("strona", 1, type=int) → 2
```

| Potrzebujesz... | Użyj... |
|---|---|
| Parametru obowiązkowego, identyfikującego zasób | Zmiennej w ścieżce `/<int:id>` |
| Parametru opcjonalnego z wartością domyślną | `request.args.get("klucz", domyślna)` |
| Parametru z automatyczną konwersją typu | `request.args.get("klucz", 1, type=int)` |
| Nagłówka HTTP żądania | `request.headers.get("Nazwa-Nagłówka")` |
| Adresu IP klienta | `request.remote_addr` |

---

## Pytania kontrolne

1. Jaka jest różnica między `/produkty/42` a `/produkty?id=42`? Kiedy użyjesz każdego?
2. Co zwróci `request.args.get("strona", 1, type=int)`, gdy URL to `/lista?strona=abc`?
3. Dlaczego `request.args` jest tylko do odczytu (immutable)?
4. Jak sprawdzić w Flasku, jakiej metody HTTP użył klient?
5. Gdzie Flask przechowuje dane z formularza POST? *(podpowiedź: nie w `request.args`)*

---

## Zadanie domowe

Zbuduj aplikację `ksiegarnia.py` — mini katalog książek z następującymi trasami:

| Trasa | Opis |
|---|---|
| `/ksiazki` | Lista wszystkich książek; opcjonalne filtry: `?gatunek=`, `?autor=`, `?max_cena=` |
| `/ksiazki/<int:book_id>` | Szczegóły jednej książki (tytuł, autor, cena, opis) |
| `/szukaj?q=` | Wyszukiwanie po tytule i autorze |
| `/debug` | Widok wyświetlający metodę, pełny URL, IP i User-Agent (przydatne podczas pracy) |

Książki zdefiniuj jako listę słowników bezpośrednio w kodzie (min. 6 pozycji, różne gatunki).

---

## Materiały dodatkowe

- [Flask docs — Request object](https://flask.palletsprojects.com/en/latest/api/#flask.Request)
- [Flask docs — URL routing](https://flask.palletsprojects.com/en/latest/quickstart/#url-building)
- [MDN — Query string](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#query)
