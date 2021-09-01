CREATE DATABASE hoursApp;
USE hoursApp;
CREATE Table authorization (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_mail VARCHAR (250) NOT NULL,
  hash VARCHAR (100) NOT NULL,
  salt VARCHAR (50) NOT NULL,
  token VARCHAR (1000)
);
ALTER TABLE
  table authorization
ADD
  user_name VARCHAR (250) NOT NULL [AFTER user_mail];
CREATE Table categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR (250) NOT NULL,
    authorization_id INT NOT NULL
  );
CREATE Table activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    time_stamp DATE NOT NULL,
    act_minutes INT NOT NULL,
    authorization_id INT NOT NULL
  );