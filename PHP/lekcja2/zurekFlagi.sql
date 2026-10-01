-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Paź 01, 2026 at 12:36 PM
-- Wersja serwera: 12.0.2-MariaDB-log
-- Wersja PHP: 8.3.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zurekFlagi`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kraje`
--

CREATE TABLE `kraje` (
  `id` int(3) NOT NULL,
  `nazwa` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kraje`
--

INSERT INTO `kraje` (`id`, `nazwa`) VALUES
(1, 'Albania'),
(2, 'Algieria'),
(3, 'Australia'),
(4, 'Barbados'),
(5, 'Belgia'),
(6, 'Belize'),
(7, 'Bermudy'),
(8, 'Bhutan'),
(9, 'Boliwia');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `main`
--

CREATE TABLE `main` (
  `id` int(30) NOT NULL,
  `kraj_id` int(3) NOT NULL,
  `nominal` varchar(100) NOT NULL,
  `nr_kat` varchar(30) NOT NULL,
  `stop_id` int(2) NOT NULL,
  `rok` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `stopy`
--

CREATE TABLE `stopy` (
  `id` int(2) NOT NULL,
  `stop` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stopy`
--

INSERT INTO `stopy` (`id`, `stop`) VALUES
(1, 'aluminium'),
(2, 'aluminium-bronze'),
(3, 'bronze'),
(4, 'copper plated zinc'),
(5, 'copper-nickel'),
(6, 'gold'),
(7, 'nickel bonded steel'),
(8, 'nickel clad steel'),
(9, 'silver'),
(10, 'stainless steel'),
(11, 'zinc');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `kraje`
--
ALTER TABLE `kraje`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `main`
--
ALTER TABLE `main`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kraje` (`kraj_id`),
  ADD KEY `stopy` (`stop_id`);

--
-- Indeksy dla tabeli `stopy`
--
ALTER TABLE `stopy`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kraje`
--
ALTER TABLE `kraje`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `main`
--
ALTER TABLE `main`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stopy`
--
ALTER TABLE `stopy`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `main`
--
ALTER TABLE `main`
  ADD CONSTRAINT `kraje` FOREIGN KEY (`kraj_id`) REFERENCES `kraje` (`id`),
  ADD CONSTRAINT `stopy` FOREIGN KEY (`stop_id`) REFERENCES `stopy` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
