create database if not exists `shop`;
use `shop`;

-- drop database shop;

create table if not exists `categories` (
 `cat_id` int NOT NULL AUTO_INCREMENT,
 `cat_name` varchar(45),
 `parent_id` int NOT NULL,
 PRIMARY KEY (`cat_id`),
 FOREIGN KEY (`parent_id`) REFERENCES `categories`(`cat_id`)
);

create table if not exists `products` (
 `prod_id` int NOT NULL AUTO_INCREMENT,
 `cat_id` int,
 `prod_name` varchar(45),
 `image_url` varchar(255),
 PRIMARY KEY (`prod_id`),
 FOREIGN KEY (`cat_id`) REFERENCES `categories`(`cat_id`)
);

create table if not exists `providers` (
 `provider_id` int NOT NULL AUTO_INCREMENT,
 `provider_name` varchar(45),
 PRIMARY KEY (`provider_id`)
);

create table if not exists `product_providers` (
 `products_id` int NOT NULL,
 `provider_id` int NOT NULL,
 `price` double,
 `available` boolean,
 PRIMARY KEY (`provider_id`, `products_id`),
 FOREIGN KEY (`products_id`) REFERENCES `products`(`prod_id`),
 FOREIGN KEY (`provider_id`) REFERENCES `providers`(`provider_id`)
);
