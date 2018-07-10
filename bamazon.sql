DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
 item_id INT NOT NULL,
 product_name VARCHAR(100) NOT NULL,
 department_name VARCHAR(100) NOT NULL,
 price DECIMAL(10,2) NOT NULL,
 stock_quantity INT NOT NULL,
 PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUES (1, "ZEST Bar Soap", "Personal Hygine", 34.00, 100);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUES (2, "Ipad Pro", "Electronics", 15334.00, 5);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUES (3, "Febreze Aromatizantes", "Home", 42.02, 35);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUES (4, "Nikon D3400 Kit", "Electronics", 9999.0, 2);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUES (5, "PLUMA ENERGEL PUNTO FINO MORADO", "Stationary", 75.00, 7);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUES (6, "Vanish Poder O2 ", "Home", 72.50, 20);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUES (7, "Crema dental Colgate máxima protección anticaries 150 ml", "Personal Hygine", 29.90, 75);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUES (8, "Huevo rojo San Juan 30 pzas", "Food", 46.50, 45);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUES (9, "Servilletas Kleenex class 200 pzas", "Home", 79.00, 30);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity) VALUES (10, "Leche Lala 100 reducida en grasa, sin lactosa 1 l", "Food", 21.50, 30);


CREATE TABLE departments (
 department_id INT NOT NULL,
 department_name VARCHAR(100) NOT NULL,
 over_head_costs DECIMAL(10,2) NOT NULL
);

ALTER TABLE products
ADD product_sales DECIMAL(10,2);