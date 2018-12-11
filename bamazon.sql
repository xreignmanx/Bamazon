DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(25) NULL,
  price INT (225),
  stock_quantity INT (250),
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("Flashlight", "hardware", 7, 125), ("Coat", "apparel", 40, 18), ("boots", "apparel", 28, 60),("beef jerky", "snacks", 3, 45), ("gum", "snacks", 2, 225),  ("shovel", "hardware", 12, 16), ("hammer", "hardware", 9, 27), ("bottle of water", "snacks", 1, 80),("hat", "apparel", 4, 22);


