-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Авг 23 2022 г., 14:42
-- Версия сервера: 10.3.16-MariaDB
-- Версия PHP: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `library`
--

DELIMITER $$
--
-- Процедуры
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertAuthor` (IN `A` TEXT CHARSET utf8, IN `B` TEXT CHARSET utf8, IN `C` TEXT CHARSET utf8)  NO SQL
INSERT INTO authors (surname, name, lastname)
	VALUES (A, B, C)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertBook` (IN `A` BIGINT(20), IN `B` VARCHAR(40) CHARSET utf8, IN `C` BIGINT(20), IN `D` BIGINT(20), IN `E` SMALLINT(10), IN `F` CHAR(20) CHARSET utf8)  NO SQL
INSERT INTO books (author, title, genre, publish_house, price, picture)
VALUES (A, B, C, D, E, F)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `authors`
--

CREATE TABLE `authors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `surname` text COLLATE utf8_bin NOT NULL,
  `name` text COLLATE utf8_bin NOT NULL,
  `lastname` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `authors`
--

INSERT INTO `authors` (`id`, `surname`, `name`, `lastname`) VALUES
(1, 'Достоевский', 'Фёдор', 'Михайлович'),
(2, 'Пушкин', 'Александр', 'Сергеевич'),
(3, 'Ахматова', 'Анна', 'Андреевна'),
(4, 'Толстой', 'Лев', 'Николаевич'),
(5, 'Булгаков', 'Михаил', 'Афанасьевич'),
(6, 'Гоголь', 'Николай ', 'Васильевич'),
(7, 'Есенин ', 'Сергей', 'Александрович');

-- --------------------------------------------------------

--
-- Структура таблицы `books`
--

CREATE TABLE `books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_author` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `id_genre` bigint(20) UNSIGNED DEFAULT NULL,
  `id_house` bigint(20) UNSIGNED DEFAULT NULL,
  `in_library` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `books`
--

INSERT INTO `books` (`id`, `id_author`, `title`, `id_genre`, `id_house`, `in_library`) VALUES
(101, 2, 'Борис Годунов', 1, 2, 1),
(102, 2, 'Каменный гость', 2, 2, 1),
(103, 2, 'Пир во время чумы', 2, 1, 1),
(104, 1, 'Преступление и наказание', 3, 1, 1),
(105, 1, 'Игрок', 3, 1, 1),
(106, 1, 'Бесы', 3, 1, 1),
(107, 1, 'Белые ночи', 3, 1, 1),
(108, 3, 'Реквием', 4, 2, 0),
(109, 3, 'Стихотворения', 4, 2, 0),
(110, 4, 'Война и мир', 3, 1, 1),
(111, 4, 'Хаджи Мурат', 3, 1, 1),
(112, 4, 'Анна Каренина', 3, 2, 1),
(113, 5, 'Мастер и Маргарита', 3, 1, 1),
(114, 5, 'Иван Васильевич', 3, 1, 1),
(115, 5, 'Белая гвардия', 3, 2, 0),
(116, 6, 'Шинель', 5, 2, 1),
(117, 6, 'Вий', 5, 1, 0),
(118, 6, 'Нос', 5, 2, 1),
(119, 6, 'Ревизор', 6, 1, 1),
(120, 2, 'Скупой рыцарь', 2, 1, 1),
(121, 2, 'Капитанская дочка', 3, 1, 1),
(122, 2, 'Сборник стихотворений', 4, 1, 0),
(123, 5, 'Собачье сердце', 5, 2, 1),
(124, 7, 'Сборник', 4, 1, 1),
(125, 1, 'Идиот', 3, 2, 0),
(126, 1, 'Двойник', 5, 2, 0),
(127, 1, 'Записки из подполья', 5, 1, 1),
(128, 7, 'Стихотворения', 4, 2, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `genres`
--

CREATE TABLE `genres` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `genre` varchar(20) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `genres`
--

INSERT INTO `genres` (`id`, `genre`) VALUES
(6, 'комедия'),
(5, 'повесть'),
(1, 'поэма'),
(3, 'роман'),
(4, 'стихи'),
(2, 'трагедия');

-- --------------------------------------------------------

--
-- Структура таблицы `publish_houses`
--

CREATE TABLE `publish_houses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nameHouse` varchar(50) COLLATE utf8_bin NOT NULL,
  `city` char(20) COLLATE utf8_bin NOT NULL,
  `address` varchar(40) COLLATE utf8_bin NOT NULL,
  `phone` char(30) COLLATE utf8_bin NOT NULL,
  `email` char(30) COLLATE utf8_bin NOT NULL,
  `manager` char(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `publish_houses`
--

INSERT INTO `publish_houses` (`id`, `nameHouse`, `city`, `address`, `phone`, `email`, `manager`) VALUES
(1, 'АСТ', 'Санкт-Петербург', 'ул. Дождливая, д 5', '890-467-36-90', 'ast@mail.ru', 'Майков Пётр Степанович'),
(2, 'Бонни', 'Москва', 'ул. Светлая, д. 15', '567-33-13', 'bonny@gmail.com', 'Птенчик');

-- --------------------------------------------------------

--
-- Структура таблицы `readers`
--

CREATE TABLE `readers` (
  `id` int(11) NOT NULL,
  `surname` char(40) COLLATE utf8_bin DEFAULT NULL,
  `name` char(20) COLLATE utf8_bin DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `address` char(50) COLLATE utf8_bin DEFAULT NULL,
  `phone` char(20) COLLATE utf8_bin DEFAULT NULL,
  `email` char(20) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `readers`
--

INSERT INTO `readers` (`id`, `surname`, `name`, `birthday`, `address`, `phone`, `email`) VALUES
(1, 'Пупкин', 'Василь', '1999-11-30', 'Парковая, 10', '25-16-17', 'Vas@yandex.ru'),
(2, 'Птенчик', 'Виолетт', '2000-03-08', 'Парковая, 5', '133-25-13', 'Violett@gmail.com'),
(3, 'Ivanova', 'Irina', '1985-05-12', 'Ясная, 15', '55555555', 'irishkaofis@yandex.r'),
(4, 'Комарик', 'Петя', '1990-03-05', 'Садовая, 3', '123-55-79', 'komar@yandex.ru'),
(5, 'Шариков', 'Степан', '1975-12-25', 'Садовая, 11', '125-55-62', 'stepan@gmail.com'),
(6, 'Зайкина', 'Надежда', '1965-01-31', 'Парковая, 15', '322-12-13', 'zaika@yandex.ru'),
(7, 'Светикова', 'Тамара', '1970-01-01', 'Пролетарий, 10', '145-45-45', 'svetikova@yandex.ru'),
(8, 'Солнышко', 'Ясное', '2000-07-05', 'Солнечная, 3', '123-456-789', 'irishkaofis@yandex.r'),
(9, 'Потёмкин', 'Тёма', '1980-05-01', 'Парковая, 25', '321-32-33', 'tima@yandex.ru'),
(10, 'Phillis', 'Moor', '1990-09-01', 'Manhetten', '13-15-19', 'irishkaofis@yandex.r'),
(11, 'Сахарок', 'Саша', '1970-09-01', 'Садовая, 15', '125-55-79', 'irishkaofis@yandex.r'),
(12, 'Ivanoff', 'Irina', '1985-05-12', 'Парковая, 5', '79-15-13', 'irishkaofis@yandex.r'),
(13, 'Веселова', 'Надежда', '1980-05-05', 'Ясная, 25', '128-33-15', 'veselova@yandex.ru');

-- --------------------------------------------------------

--
-- Структура таблицы `taking`
--

CREATE TABLE `taking` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date_take` date NOT NULL,
  `id_reader` int(11) NOT NULL,
  `id_book` bigint(20) UNSIGNED NOT NULL,
  `date_give` date NOT NULL,
  `given` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `taking`
--

INSERT INTO `taking` (`id`, `date_take`, `id_reader`, `id_book`, `date_give`, `given`) VALUES
(1, '2022-08-22', 2, 119, '2022-08-25', '2022-08-23'),
(2, '2022-08-22', 2, 124, '2022-08-24', '0000-00-00'),
(3, '2022-08-22', 6, 125, '2022-08-25', '2022-08-23'),
(4, '2022-08-22', 6, 108, '2022-08-24', '2022-08-23'),
(5, '2022-08-22', 6, 109, '2022-08-25', '0000-00-00'),
(6, '2022-08-22', 4, 101, '2022-08-26', '2022-08-22'),
(7, '2022-08-22', 1, 101, '2022-08-25', '2022-08-22'),
(8, '2022-08-22', 1, 122, '0000-00-00', '0000-00-00'),
(9, '2022-08-22', 2, 113, '2022-08-25', '2022-08-22'),
(10, '2022-08-22', 9, 117, '2022-08-25', '0000-00-00'),
(11, '2022-08-23', 13, 125, '2022-08-26', '2022-08-23'),
(12, '2022-08-23', 4, 125, '2022-08-25', '2022-08-23'),
(13, '2022-08-23', 8, 125, '2022-08-25', '0000-00-00'),
(14, '2022-08-23', 10, 108, '2022-08-26', '0000-00-00'),
(15, '2022-08-23', 6, 126, '2022-08-26', '0000-00-00'),
(16, '2022-08-23', 3, 115, '2022-08-25', '0000-00-00'),
(17, '2022-08-23', 5, 128, '2022-08-26', '0000-00-00');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author` (`id_author`),
  ADD KEY `genre` (`id_genre`),
  ADD KEY `publish_house` (`id_house`);

--
-- Индексы таблицы `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`genre`);

--
-- Индексы таблицы `publish_houses`
--
ALTER TABLE `publish_houses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `one_name` (`nameHouse`);

--
-- Индексы таблицы `readers`
--
ALTER TABLE `readers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `taking`
--
ALTER TABLE `taking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_reader` (`id_reader`),
  ADD KEY `id_book` (`id_book`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `authors`
--
ALTER TABLE `authors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT для таблицы `genres`
--
ALTER TABLE `genres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `publish_houses`
--
ALTER TABLE `publish_houses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `readers`
--
ALTER TABLE `readers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `taking`
--
ALTER TABLE `taking`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`id_author`) REFERENCES `authors` (`id`),
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`id_genre`) REFERENCES `genres` (`id`),
  ADD CONSTRAINT `books_ibfk_3` FOREIGN KEY (`id_house`) REFERENCES `publish_houses` (`id`),
  ADD CONSTRAINT `books_ibfk_4` FOREIGN KEY (`id`) REFERENCES `descriptions` (`id_book`);

--
-- Ограничения внешнего ключа таблицы `taking`
--
ALTER TABLE `taking`
  ADD CONSTRAINT `taking_ibfk_1` FOREIGN KEY (`id_reader`) REFERENCES `readers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
