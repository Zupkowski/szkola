-- ZADANIE 1

CREATE TABLE klienci (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imie VARCHAR(30) NOT NULL,
    nazwisko VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    utworzono DATE DEFAULT(CURRENT_DATE()),
    UNIQUE(email)
)

CREATE TABLE zamowienia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    klient_id INT NOT NULL,
    data_zamowienia DATE DEFAULT(CURDATE()),
    biezaca_kwota DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (klient_id) REFERENCES klienci(id) ON DELETE CASCADE
)

-- ZADANIE 2

INSERT INTO klienci (imie, nazwisko, email) 
VALUES
    ('Jan', 'Kowalski', 'jan@example.com'),
    ('Anna', 'Nowak', 'anna@example.com'),
    ('Piotr', 'Wiśniewski', 'piotr@example.com')

INSERT INTO zamowienia (klient_id, biezaca_kwota) 
VALUES
    ('1', '150.00'),
    ('1', '89.99'),
    ('2', '320.50')

INSERT INTO zamowienia (klient_id, biezaca_kwota) 
VALUES
    ('999', '999.99')

-- Błąd w zapytaniu (1452): Cannot add or update a child row: a foreign key constraint fails (`student_stylskizurek_jakub_23915`.`zamowienia`, CONSTRAINT `zamowienia_ibfk_1` FOREIGN KEY (`klient_id`) REFERENCES `klienci` (`id`) ON DELETE CASCADE)

SELECT imie, nazwisko, zamowienia.id as nr_zamowienia, zamowienia.data_zamowienia, zamowienia.biezaca_kwota FROM klienci
INNER JOIN zamowienia ON klienci.id = zamowienia.klient_id
ORDER BY biezaca_kwota DESC

-- inner join zwraca tylko te wiersze, w których warunek złączenia jest spełniony w obu tabelach - w tabeli zamowienia nie ma zamowienia odpowiadajacego id Piotra Wisniewskiego

-- ZADANIE 3

SELECT imie, nazwisko, email FROM klienci
LEFT JOIN on klienci.id = zamowienia.klient_id
WHERE zamowienia.kliend_id IS NULL

-- ZADANIE 4

SELECT imie, nazwisko, email FROM klienci
LEFT JOIN zamowienia ON klienci.id = zamowienia.klient_id
WHERE zamowienia.klient_id IS NULL

-- ZADANIE 5

SELECT imie, nazwisko, COUNT(zamowienia.id) as liczba_zamowien, SUM(zamowienia.biezaca_kwota) as laczna_kwota FROM klienci
LEFT JOIN zamowienia ON klienci.id = zamowienia.klient_id
GROUP BY klienci.id, klienci.imie, klienci.nazwisko\

-- ZADANIE 6

SELECT COUNT(*) FROM zamowienia; -- zwraca 3
DELETE FROM klienci WHERE email = 'jan@example.com';
SELECT COUNT(*) FROM zamowienia; -- zwraca 1
-- usuwanie kaskadowe po usunieciu z tablicy nadrzednej (klienci) usuwa wszystkie powiazane rekordy z tablicy podrzednej (zamowienia)

-- ZADANIE DODATKOWE

ALTER TABLE klienci
    ADD COLUMN status VARCHAR(20) DEFAULT 'aktywny'

UPDATE klienci
LEFT JOIN zamowienia ON klienci.id = zamowienia.klient_id
SET klienci.status = 'nieaktywny'
WHERE zamowienia.klient_id IS NULL;