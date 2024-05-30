-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2024 at 05:46 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6
-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_cron_send_message`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT '',
  `birthday_date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `timezone` varchar(255) NOT NULL DEFAULT 'Asia/Jakarta',
  `latest_sent_at` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `birthday_date`, `created_at`, `updated_at`, `deleted_at`, `timezone`, `latest_sent_at`, `email`) VALUES
('67f9feda-d5e7-497d-82a3-599c00665aeb', 'Darwin', 'Phillipe', '1997-10-10 00:00:00', '2024-05-27 21:20:44.329154', '2024-05-27 21:33:02.279542', NULL, 'America/New_York', '2023', ''),
('798fcbdb-5118-49e8-9a11-948ac5080d50', 'Darwin', 'Phillipe', '1997-05-30 00:00:00', '1997-05-30 00:00:00.000000', '2024-05-30 12:59:01.945000', NULL, 'Asia/Jakarta', '2024', 'a@example.com'),
('a175e891-8c9e-45f5-87bc-e0fe3d7c680b', 'Zoe', 'Lickert', '1981-05-30 00:00:00', '1900-01-30 00:00:00.000000', '2024-05-30 12:57:00.117447', '2024-05-27 21:19:38.000000', '  Australia/Melbourne', '2023', 'b@example.com'),
('e42a485b-f08f-4806-95b8-23312f2a6eac', 'Aufal', 'Marom', '2002-05-30 00:00:00', '2024-05-28 21:34:31.250000', '2024-05-30 12:59:04.896000', NULL, 'Asia/Jakarta', '2024', 'aufalmarom23@gmail.com.com'),
('f78cfa45-0d18-43f8-b63b-b81479639eff', 'John', 'Smith', '1990-10-10 00:00:00', '2024-05-27 21:06:29.696547', '2024-05-27 21:33:07.314308', NULL, 'Australia/Canberra', '2023', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;