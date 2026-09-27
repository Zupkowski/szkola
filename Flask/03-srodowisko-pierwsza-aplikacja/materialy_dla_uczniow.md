# Lekcja 3 — Środowisko pracy programisty i pierwsza aplikacja Flask

## Cele lekcji

Po tej lekcji:
- tworzysz izolowane środowisko wirtualne Pythona (`venv`) i rozumiesz, po co ono istnieje,
- instalujesz pakiety przez `pip` i zarządzasz plikiem `requirements.txt`,
- tworzysz i uruchamiasz minimalną aplikację Flask,
- definiujesz trasy (`route`) i widoki (`view function`),
- rozumiesz, co dzieje się „pod maską" gdy przeglądarka wysyła żądanie do Flaska.

---

## Część 1 — Po co środowisko wirtualne?

### Problem bez venv

Wyobraź sobie, że masz dwa projekty:
- Projekt A wymaga `Flask==2.3`
- Projekt B wymaga `Flask==3.1`

Jeśli instalujesz pakiety globalnie, **oba projekty dzielą tę samą wersję** — jeden zawsze będzie działał źle.

### Rozwiązanie: `venv`

`venv` tworzy **izolowany katalog** z własną kopią Pythona i własnym zestawem pakietów. Każdy projekt ma swoje środowisko — zmiany w jednym nie wpływają na drugi.

```
system Python          projekt_A/venv/        projekt_B/venv/
────────────────       ──────────────────     ──────────────────
python 3.11            python 3.11            python 3.11
pip (globalny)         Flask 2.3              Flask 3.1
                       SQLAlchemy 2.0         requests 2.31
```

---

## Część 2 — Konfiguracja środowiska

### 2.1 Tworzenie projektu — krok po kroku

Wykonaj każde polecenie w terminalu (VS Code: `Ctrl+` `` ` ``):

```bash
# 1. Utwórz katalog projektu i wejdź do niego
mkdir moja_aplikacja
cd moja_aplikacja

# 2. Utwórz środowisko wirtualne
python -m venv venv

# 3. Aktywuj środowisko
# macOS / Linux:
source venv/bin/activate
# Windows (PowerShell):
venv\Scripts\Activate.ps1
# Windows (cmd):
venv\Scripts\activate.bat

# 4. Sprawdź, że jesteś w środowisku (powinien pojawić się prefiks "(venv)")
python --version
pip --version
```

> Po aktywacji widzisz `(venv)` na początku wiersza terminala — to sygnał, że środowisko jest aktywne i instalujesz pakiety tylko do tego projektu.

### 2.2 Instalacja Flask

```bash
# Instalacja Flaska (zawsze gdy venv jest aktywny)
pip install flask

# Sprawdź zainstalowane pakiety
pip list

# Zapisz zależności do pliku
pip freeze > requirements.txt
```

Otwórz `requirements.txt` — zobaczysz Flask i wszystkie jego zależności z dokładnymi wersjami. Ten plik trafi do repozytorium Git, dzięki czemu każdy może odtworzyć to samo środowisko:

```bash
# Odtworzenie środowiska na innym komputerze
pip install -r requirements.txt
```

### 2.3 Struktura projektu na tę lekcję

```
moja_aplikacja/
├── venv/               ← środowisko wirtualne (NIE trafia do Git!)
├── app.py              ← kod aplikacji
└── requirements.txt    ← lista zależności (trafia do Git)
```

> Dodaj `venv/` do pliku `.gitignore`, żeby nie wrzucać środowiska do repozytorium:
> ```bash
> echo "venv/" > .gitignore
> ```

---

## Część 3 — Pierwsza aplikacja Flask

### 3.1 Minimalna aplikacja — `app.py`

```python
from flask import Flask

app = Flask(__name__)


@app.route("/")
def index():
    return "Witaj, świecie!"


if __name__ == "__main__":
    app.run(debug=True)
```

Uruchom w terminalu:

```bash
python app.py
```

Otwórz przeglądarkę pod adresem `http://127.0.0.1:5000` — powinieneś zobaczyć tekst `Witaj, świecie!`.

### 3.2 Co tu się dzieje? — analiza linijka po linijce

```python
from flask import Flask
```
Importujesz klasę `Flask` z pakietu `flask`.

```python
app = Flask(__name__)
```
Tworzysz instancję aplikacji. `__name__` to nazwa bieżącego modułu — Flask używa go do lokalizowania zasobów (szablonów, plików statycznych).

```python
@app.route("/")
```
**Dekorator** — mówi Flaskowi: „gdy klient wyśle żądanie GET na ścieżkę `/`, wywołaj poniższą funkcję".

```python
def index():
    return "Witaj, świecie!"
```
**Funkcja widoku (view function)** — przetwarza żądanie i zwraca odpowiedź. Zwrócony string Flask automatycznie pakuje w odpowiedź HTTP z kodem 200 i `Content-Type: text/html`.

```python
if __name__ == "__main__":
    app.run(debug=True)
```
Uruchamia wbudowany serwer deweloperski. `debug=True` włącza:
- automatyczny restart po zmianie kodu,
- interaktywny debugger w przeglądarce przy wyjątkach.

> **Uwaga:** Serwer deweloperski (`debug=True`) służy tylko do pracy lokalnej. Nigdy nie wdrażaj go na produkcję.

### 3.3 Trasy z parametrami

Ścieżka URL może zawierać zmienne ujęte w nawiasy ostre:

```python
@app.route("/witaj/<name>")
def greet(name):
    return f"Cześć, {name}!"
```

Wejdź na `http://127.0.0.1:5000/witaj/Anna` — zobaczysz `Cześć, Anna!`.

Flask automatycznie przekazuje wartość z URL jako argument funkcji.

### 3.4 Typy konwerterów w trasach

Domyślnie parametr URL to string. Możesz wymusić konkretny typ:

```python
@app.route("/produkt/<int:product_id>")
def product_details(product_id):
    return f"Produkt o ID: {product_id} (typ: {type(product_id).__name__})"


@app.route("/cena/<float:value>")
def show_price(value):
    return f"Cena: {value:.2f} zł"
```

| Konwerter | Przykład | Dopasowuje |
|---|---|---|
| `string` | `<string:name>` | Dowolny tekst bez `/` (domyślny) |
| `int` | `<int:id>` | Liczba całkowita |
| `float` | `<float:price>` | Liczba zmiennoprzecinkowa |
| `path` | `<path:filepath>` | Tekst ze znakami `/` |

### 3.5 Kilka tras w jednej aplikacji

```python
from flask import Flask

app = Flask(__name__)


@app.route("/")
def index():
    return "<h1>Strona główna</h1><a href='/o-nas'>O nas</a>"


@app.route("/o-nas")
def about():
    return "<h1>O nas</h1><p>Tworzymy aplikacje webowe w Pythonie.</p>"


@app.route("/kontakt")
def contact():
    return "<h1>Kontakt</h1><p>Email: kontakt@example.com</p>"


@app.route("/uzytkownik/<int:user_id>")
def user_profile(user_id):
    return f"<h1>Profil użytkownika #{user_id}</h1>"


if __name__ == "__main__":
    app.run(debug=True)
```

### 3.6 Jak Flask dopasowuje trasy?

Gdy przeglądarka wysyła `GET /uzytkownik/42`, Flask:

1. Przegląda rejestr tras (routing table).
2. Dopasowuje ścieżkę `/uzytkownik/42` do wzorca `/uzytkownik/<int:user_id>`.
3. Konwertuje `"42"` → `42` (int).
4. Wywołuje `user_profile(user_id=42)`.
5. Pakuje zwrócony string w odpowiedź HTTP 200.

Jeśli żadna trasa nie pasuje → Flask zwraca `404 Not Found`.

---

## Część 4 — Ćwiczenia praktyczne

### Ćwiczenie 1 — Kalkulator w URL

Utwórz aplikację z trasą `/dodaj/<int:a>/<int:b>`, która zwraca sumę dwóch liczb.

```
GET /dodaj/5/3  →  "5 + 3 = 8"
```

**Rozwiązanie:**
```python
@app.route("/dodaj/<int:a>/<int:b>")
def add(a, b):
    return f"{a} + {b} = {a + b}"
```

---

### Ćwiczenie 2 — BMI

Utwórz trasę `/bmi/<float:waga>/<float:wzrost>` (waga w kg, wzrost w metrach), która oblicza i zwraca BMI z jedną cyfrą po przecinku oraz słowną interpretację.

```
GET /bmi/70/1.75  →  "BMI: 22.9 — waga prawidłowa"
```

**Rozwiązanie:**
```python
@app.route("/bmi/<float:weight>/<float:height>")
def bmi(weight, height):
    result = weight / (height ** 2)
    if result < 18.5:
        label = "niedowaga"
    elif result < 25:
        label = "waga prawidłowa"
    elif result < 30:
        label = "nadwaga"
    else:
        label = "otyłość"
    return f"BMI: {result:.1f} — {label}"
```

---

### Ćwiczenie 3 — Mini strona (dla chętnych)

Rozbuduj aplikację o cztery strony połączone linkami:
- `/` — strona główna z linkami do pozostałych
- `/projekty` — lista 3 fikcyjnych projektów
- `/projekty/<int:id>` — szczegóły projektu o danym ID
- `/kontakt` — strona z formularzem (na razie statyczny HTML)

---

## Podsumowanie lekcji

| Pojęcie | Znaczenie |
|---|---|
| `venv` | Izolowane środowisko Pythona dla jednego projektu |
| `pip install` | Instaluje pakiet do aktywnego środowiska |
| `requirements.txt` | Lista zależności projektu z wersjami |
| `Flask(__name__)` | Tworzy instancję aplikacji |
| `@app.route("/sciezka")` | Rejestruje trasę — mapuje URL na funkcję widoku |
| Funkcja widoku | Przetwarza żądanie i zwraca odpowiedź |
| `<int:id>` | Parametr URL z konwersją typu |
| `debug=True` | Tryb deweloperski — autorestart i debugger |

---

## Pytania kontrolne

1. Po co tworzy się środowisko wirtualne zamiast instalować pakiety globalnie?
2. Jak aktywujesz środowisko wirtualne w systemie Windows?
3. Co robi dekorator `@app.route`?
4. Czym jest funkcja widoku?
5. Co zwróci Flask, gdy żądany URL nie pasuje do żadnej trasy?
6. Dlaczego nie wrzucamy katalogu `venv/` do repozytorium Git?

---

## Zadanie domowe

Stwórz aplikację Flask `kalkulator.py` z trasami:

| Trasa | Działanie |
|---|---|
| `/` | Strona główna z listą dostępnych operacji (jako linki) |
| `/dodaj/<int:a>/<int:b>` | Suma a i b |
| `/odejmij/<int:a>/<int:b>` | Różnica a i b |
| `/pomnoz/<int:a>/<int:b>` | Iloczyn a i b |
| `/podziel/<float:a>/<float:b>` | Iloraz a i b (obsłuż dzielenie przez zero — zwróć odpowiedni komunikat) |

Wrzuć kod na GitHub. Upewnij się, że w repozytorium jest `requirements.txt` i `.gitignore` z `venv/`.

---

## Materiały dodatkowe

- [Dokumentacja Flask — Quickstart](https://flask.palletsprojects.com/en/latest/quickstart/)
- [Dokumentacja Python — venv](https://docs.python.org/3/library/venv.html)
- [pip — User Guide](https://pip.pypa.io/en/stable/user_guide/)
