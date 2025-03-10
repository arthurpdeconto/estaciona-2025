create database estaciona;
use estaciona;

CREATE TABLE IF NOT EXISTS cars (
  id INT PRIMARY KEY AUTO_INCREMENT,
  model VARCHAR(255) NOT NULL,
  license_plate VARCHAR(20) NOT NULL UNIQUE,
  entry_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  exit_time DATETIME,
  status ENUM('parked', 'exited') DEFAULT 'parked'
);