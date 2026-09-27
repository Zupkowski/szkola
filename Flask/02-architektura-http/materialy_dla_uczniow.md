# Lekcja 2 — Architektura klient–serwer i protokół HTTP

## Cele lekcji

Po tej lekcji:
- wyjaśniasz model klient–serwer i wskazujesz role obu stron,
- opisujesz cykl żądanie–odpowiedź HTTP,
- rozróżniasz metody HTTP (GET, POST, PUT, DELETE, PATCH) i dobierasz je do operacji,
- interpretujesz kody statusu HTTP (1xx–5xx),
- analizujesz rzeczywiste żądania i odpowiedzi HTTP w narzędziach deweloperskich przeglądarki.

---

## Część 1 — Architektura klient–serwer

### 1.1 Model klient–serwer

Każda aplikacja webowa działa w modelu **klient–serwer**:

```
Klient (przeglądarka, aplikacja mobilna, curl)
        |
        |  żądanie HTTP (request)
        ↓
Serwer (Flask, FastAPI, nginx, Apache…)
        |
        |  odpowiedź HTTP (response)
        ↓
Klient
```

**Klient** inicjuje komunikację — wysyła żądanie i czeka na odpowiedź.
**Serwer** nasłuchuje na żądania, przetwarza je i odsyła odpowiedź.

> Klient i serwer **nie muszą wiedzieć, jak zbudowana jest druga strona** — muszą tylko mówić tym samym językiem (protokołem HTTP). To fundament interoperacyjności internetu.

### 1.2 Co to jest protokół?

Protokół to zestaw reguł określających format i kolejność komunikatów. HTTP (HyperText Transfer Protocol) definiuje:
- jak wygląda żądanie (co klient musi wysłać),
- jak wygląda odpowiedź (co serwer musi odesłać),
- jakie operacje są możliwe (metody).

### 1.3 Stos protokołów (uproszczony)

```
Aplikacja     →  HTTP / HTTPS
Transport     →  TCP
Sieć          →  IP
Łącze         →  Ethernet / Wi-Fi
```

Na tym kursie interesuje nas warstwa aplikacji — HTTP. Niższe warstwy obsługuje system operacyjny.

---

## Część 2 — Cykl żądanie–odpowiedź

### 2.1 Anatomia żądania HTTP

Każde żądanie HTTP składa się z trzech elementów:

```
GET /produkty?kategoria=obuwie HTTP/1.1       ← linia żądania (metoda, ścieżka, wersja)
Host: sklep.example.com                        ← nagłówki
Accept: text/html
Accept-Language: pl
                                               ← pusta linia (obowiązkowa)
                                               ← ciało (body) — puste dla GET
```

**Linia żądania** zawiera:
- **metodę** (GET, POST, PUT…) — co chcesz zrobić,
- **ścieżkę** (`/produkty`) — z czym chcesz to zrobić,
- **wersję protokołu** (HTTP/1.1 lub HTTP/2).

**Nagłówki** to metadane — informują serwer o formacie danych, języku, autoryzacji itp.

**Ciało (body)** — opcjonalne; pojawia się przy POST/PUT, zawiera dane do wysłania (np. formularz, JSON).

### 2.2 Anatomia odpowiedzi HTTP

```
HTTP/1.1 200 OK                                ← linia statusu (wersja, kod, opis)
Content-Type: text/html; charset=utf-8         ← nagłówki
Content-Length: 1452
Date: Thu, 04 Sep 2025 10:00:00 GMT
                                               ← pusta linia
<html>                                         ← ciało odpowiedzi (HTML, JSON, plik…)
  <body>Lista produktów...</body>
</html>
```

### 2.3 Przykład pełnego cyklu — krok po kroku

Wpisujesz w przeglądarce `http://sklep.example.com/produkty`:

1. **DNS** — przeglądarka tłumaczy `sklep.example.com` na adres IP (np. `93.184.216.34`).
2. **TCP handshake** — nawiązanie połączenia z serwerem na porcie 80 (HTTP) lub 443 (HTTPS).
3. **Żądanie** — przeglądarka wysyła `GET /produkty HTTP/1.1`.
4. **Przetwarzanie** — serwer (np. Flask) odbiera żądanie, wykonuje logikę, pobiera dane z bazy.
5. **Odpowiedź** — serwer odsyła `200 OK` z treścią strony.
6. **Renderowanie** — przeglądarka parsuje HTML i wyświetla stronę.

---

## Część 3 — Metody HTTP

### 3.1 Podstawowe metody

| Metoda | Zastosowanie | Ciało żądania | Bezpieczna? | Idempotentna? |
|---|---|---|---|---|
| **GET** | Pobiera zasób (odczyt) | Nie | Tak | Tak |
| **POST** | Tworzy nowy zasób | Tak | Nie | Nie |
| **PUT** | Zastępuje zasób w całości | Tak | Nie | Tak |
| **PATCH** | Modyfikuje część zasobu | Tak | Nie | Nie |
| **DELETE** | Usuwa zasób | Opcjonalnie | Nie | Tak |
| **HEAD** | Jak GET, ale bez ciała odpowiedzi | Nie | Tak | Tak |
| **OPTIONS** | Pytanie o dostępne metody | Nie | Tak | Tak |

**Bezpieczna** = nie zmienia stanu serwera (tylko odczytuje).
**Idempotentna** = wielokrotne wywołanie daje ten sam efekt co jednokrotne.

### 3.2 Mapowanie metod na operacje CRUD

| Operacja | Metoda HTTP | Przykład |
|---|---|---|
| Create | POST | `POST /produkty` — dodaj nowy produkt |
| Read | GET | `GET /produkty/42` — pobierz produkt o id=42 |
| Update | PUT / PATCH | `PUT /produkty/42` — zaktualizuj produkt |
| Delete | DELETE | `DELETE /produkty/42` — usuń produkt |

> **Uwaga:** Formularze HTML obsługują tylko GET i POST. PUT, PATCH i DELETE stosujemy w API — do ich testowania używamy Postmana lub curl.

### 3.3 Ćwiczenie — dobierz metodę

Dla każdej operacji wskaż poprawną metodę HTTP:

1. Wyświetlenie listy wszystkich artykułów na blogu.
2. Dodanie komentarza do artykułu.
3. Zmiana tytułu artykułu.
4. Usunięcie konta użytkownika.
5. Sprawdzenie, czy zasób istnieje (bez pobierania treści).

*(Odpowiedzi: GET, POST, PATCH lub PUT, DELETE, HEAD)*

---

## Część 4 — Kody statusu HTTP

### 4.1 Klasy kodów

| Klasa | Zakres | Znaczenie |
|---|---|---|
| **1xx** | 100–199 | Informacyjne — żądanie przyjęte, przetwarzanie trwa |
| **2xx** | 200–299 | Sukces — żądanie zrealizowane poprawnie |
| **3xx** | 300–399 | Przekierowanie — zasób jest pod innym adresem |
| **4xx** | 400–499 | Błąd klienta — nieprawidłowe żądanie |
| **5xx** | 500–599 | Błąd serwera — serwer nie mógł zrealizować żądania |

### 4.2 Najważniejsze kody — musisz znać na pamięć

| Kod | Nazwa | Kiedy |
|---|---|---|
| 200 | OK | Standardowy sukces (GET, PUT, PATCH) |
| 201 | Created | Pomyślnie utworzono zasób (POST) |
| 204 | No Content | Sukces, brak treści do zwrócenia (DELETE) |
| 301 | Moved Permanently | Stałe przekierowanie |
| 302 | Found | Tymczasowe przekierowanie |
| 400 | Bad Request | Błędne dane w żądaniu (walidacja nie przeszła) |
| 401 | Unauthorized | Brak uwierzytelnienia (nie wiesz, kim jesteś) |
| 403 | Forbidden | Brak uprawnień (wiem, kim jesteś, ale nie masz dostępu) |
| 404 | Not Found | Zasób nie istnieje |
| 405 | Method Not Allowed | Metoda niedozwolona dla tej ścieżki |
| 409 | Conflict | Konflikt stanu (np. duplikat e-mail przy rejestracji) |
| 422 | Unprocessable Entity | Dane poprawne składniowo, ale semantycznie błędne |
| 500 | Internal Server Error | Nieobsłużony wyjątek po stronie serwera |
| 503 | Service Unavailable | Serwer przeciążony lub w trybie maintenance |

### 4.3 Jak zapamiętać różnicę 401 vs 403?

- **401 Unauthorized** — „Kto jesteś? Zaloguj się."
- **403 Forbidden** — „Wiem, kto jesteś. Nie masz tu wstępu."

### 4.4 Ćwiczenie — dobierz kod statusu

Dla każdej sytuacji wskaż właściwy kod:

1. Użytkownik poprosił o produkt, który nie istnieje w bazie.
2. Formularz rejestracji przesłany bez wymaganego pola `email`.
3. Użytkownik zalogowany, ale próbuje edytować artykuł innego autora.
4. Aplikacja Flaskowa zgłosiła wyjątek `ZeroDivisionError`.
5. Poprawne usunięcie rekordu z bazy danych.

*(Odpowiedzi: 404, 400, 403, 500, 204)*

---

## Część 5 — Praktyka: narzędzia deweloperskie przeglądarki

### 5.1 Otwieranie zakładki Network

1. Otwórz dowolną stronę (np. `python.org`).
2. Naciśnij `F12` (lub `Ctrl+Shift+I`) → zakładka **Network**.
3. Odśwież stronę (`F5`) i obserwuj listę żądań.

### 5.2 Co analizujemy

Kliknij na pierwsze żądanie na liście i przejrzyj zakładki:

- **Headers** — nagłówki żądania i odpowiedzi; znajdź `Status Code`, `Content-Type`, `Request Method`.
- **Preview / Response** — treść odpowiedzi serwera.
- **Timing** — ile czasu zajęły poszczególne fazy (DNS, połączenie, pobieranie).

### 5.3 Ćwiczenie praktyczne

Otwórz zakładkę Network i wejdź na stronę `httpbin.org/get`:

1. Jaka metoda HTTP została użyta?
2. Jaki kod statusu zwrócił serwer?
3. Jaki `Content-Type` ma odpowiedź?
4. Ile milisekund trwało pobranie odpowiedzi?
5. Znajdź w odpowiedzi swój adres IP.

### 5.4 Testowanie z curl (dla chętnych)

```bash
# Proste żądanie GET
curl -v https://httpbin.org/get

# Żądanie POST z danymi JSON
curl -X POST https://httpbin.org/post \
  -H "Content-Type: application/json" \
  -d '{"imie": "Anna", "wiek": 20}'

# Zobaczenie tylko kodu statusu
curl -o /dev/null -s -w "%{http_code}" https://httpbin.org/status/404
```

Flaga `-v` (verbose) pokazuje pełne żądanie i odpowiedź — dokładnie to, co widziałeś w DevTools.

---

## Podsumowanie lekcji

```
Klient  →  [metoda] [ścieżka] HTTP/1.1  →  Serwer
            nagłówki                       przetwarza
            ciało (opcjonalne)             ↓
                                        [kod statusu] HTTP/1.1  →  Klient
                                           nagłówki
                                           ciało odpowiedzi
```

**Trzy rzeczy, które musisz wiedzieć po tej lekcji:**

1. HTTP to protokół żądanie–odpowiedź; klient zawsze inicjuje.
2. Metoda HTTP mówi *co* chcesz zrobić; ścieżka mówi *z czym*.
3. Kod statusu 2xx = sukces, 4xx = błąd klienta, 5xx = błąd serwera.

---

## Pytania kontrolne

1. Czym różni się metoda GET od POST?
2. Co zwraca serwer, gdy zasób nie istnieje?
3. Jaki kod statusu oznacza, że nie jesteś zalogowany?
4. Czy metoda GET może mieć ciało (body)? *(Technicznie tak, ale konwencja tego zabrania.)*
5. Co to znaczy, że metoda jest idempotentna?

---

## Zadanie domowe

Wejdź na trzy różne strony internetowe (np. sklep, portal informacyjny, serwis społecznościowy), otwórz DevTools → Network i dla każdej strony zapisz w notatniku:

- adres URL pierwszego żądania,
- metodę HTTP,
- kod statusu odpowiedzi,
- `Content-Type` odpowiedzi.

Wyniki przynieś na następną lekcję (lub wklej w komentarz do commitu w repozytorium).

---

## Materiały dodatkowe

- [MDN Web Docs — HTTP](https://developer.mozilla.org/pl/docs/Web/HTTP) — najpełniejsza dokumentacja HTTP po polsku
- [httpbin.org](https://httpbin.org) — serwis do testowania żądań HTTP
- [HTTP Status Dogs](https://httpstatusdogs.com) — kody statusu z humorem (pomaga zapamiętać)
- RFC 9110 — oficjalna specyfikacja HTTP/1.1 (dla bardzo ciekawskich)
