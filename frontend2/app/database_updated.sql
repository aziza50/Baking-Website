/* USERS TABLE
will be talking to supabase via api 
https://supabase.com/docs/guides/auth/managing-user-data
 */

/* REFERENCES auth.users ON DELETE CASCADE removed for now since no supabase setup*/
CREATE TABLE users( 
id BINARY(16) NOT NULL, 
display_name VARCHAR(50) NOT NULL, 
email VARCHAR(255) NOT NULL UNIQUE, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
PRIMARY KEY (id) 
)

INSERT INTO users VALUES (UUID_TO_BIN(UUID()), 'John Doe', 'john.doe@yahoo.com', NULL);
INSERT INTO users VALUES (UUID_TO_BIN(UUID()), 'Jane Smith', 'jane.smith@virginia.edu', NULL);
INSERT INTO users VALUES (UUID_TO_BIN(UUID()), 'Billy Bob', 'billy.bob@gmail.com', NULL);
INSERT INTO users VALUES (UUID_TO_BIN(UUID()), 'Alice Smith', 'alice.smith@gmail.com', NULL);

/*When retrieving user information by passing in user id into the query"*/
SELECT * FROM user 
WHERE id = UUID_TO_BIN(?)

/* Need to set up a trigger to update user.profiiles every time a user signs up*/
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
BEGIN
INSERT INTO user.profiles (id, display_name, email)
VALUES (NEW.id, NEW.email, NEW.email);
END;

/* Additional info table->Assumption (we hold up to one phone number for each user)*/
/* SET allows for multi-valued attributes but stores values as bitmask*/
CREATE TABLE additional_info( 
id INT AUTO_INCREMENT, 
user_id BINARY(16) NOT NULL, 
allergies SET('nuts', 'dairy', 'gluten', 'soy', 'eggs') DEFAULT NULL,
phone_number VARCHAR(20), 
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) 


/*Sample values using UUID_TO_BIN(UUID()) temporarily for just populating vals*/
INSERT INTO additional_info (user_id, allergies, phone_number) 
VALUES (
    (SELECT id FROM users WHERE email = 'jane.smith@virginia.edu'), 
    'dairy', 
    '222-456-7890'
);

INSERT INTO additional_info (user_id, allergies, phone_number) 
VALUES (
    (SELECT id FROM users WHERE email = 'john.doe@yahoo.com'), 
    'gluten,soy', 
    '111-456-7890'
);

INSERT INTO additional_info (user_id, allergies, phone_number) 
VALUES (
    (SELECT id FROM users WHERE email ='billy.bob@gmail.com'), 
    'eggs,nuts', 
    '333-456-7890'
);

INSERT INTO additional_info (user_id, allergies, phone_number) 
VALUES (
    (SELECT id FROM users WHERE email = 'alice.smith@gmail.com'), 
    NULL, 
    '444-456-7890'
);

INSERT INTO additional_info (user_id, allergies, phone_number) 
VALUES (
    (SELECT id FROM users WHERE email = ?), 
    ?, 
    ?
);

SELECT * FROM additional_info
WHERE user_id = UUID_TO_BIN(?)


/*Toppings and Modifications are tied solely to the menu items, so some menu
items may not offer certain toppings or modifications!*/
/* Toppings table */
/*ENUM allows for only single values*/
CREATE TABLE topping( 
id INT AUTO_INCREMENT, 
menu_id INT NOT NULL, 
name ENUM('fruits', 'macarons', 'flowers', 'ribbons') NOT NULL, 
description VARCHAR(255), 
price DECIMAL(5,2) NOT NULL, 
PRIMARY KEY (id),
FOREIGN KEY (menu_id) REFERENCES menu_item(id) ON DELETE CASCADE
);

INSERT INTO topping VALUES (NULL, 1, "fruits", "Fresh berries such as blueberries, rasberries, and/or blackberries.", 10.00)
INSERT INTO topping VALUES (NULL, 2, "macarons", "Mini macarons. Flavor depends on the cake", 10.00)
INSERT INTO topping VALUES (NULL, 2, "flowers", "Fresh flowers for decoration", 15.00)
INSERT INTO topping VALUES (NULL, 3, "ribbons", "Colorful ribbons for decoration", 3.00)

/*Retriving all toppings for particular menu item */
SELECT * FROM topping
WHERE menu_id = ? 


/* Modifications table */
/*Change: no need for description as it's kinda obvious lol*/
CREATE TABLE modification( 
id INT AUTO_INCREMENT, 
menu_id INT, 
categories SET('Add an inscription', 'Make it Vegan', 'Make it Gluten-Free') NOT NULL, 
price DECIMAL(5,2) NOT NULL, 
PRIMARY KEY (id),
FOREIGN KEY (menu_id) REFERENCES menu_item(id) ON DELETE CASCADE
);

INSERT INTO modification VALUES (NULL, 1, 'Add an inscription', 5.00)
INSERT INTO modification VALUES (NULL, 1, 'Make it Vegan', 20.00)
INSERT INTO modification VALUES (NULL, 2, 'Make it Gluten-Free', 20.00)
INSERT INTO modification VALUES (NULL, 3, 'Make it Gluten-Free', 20.00)


/*Retriving all modifications for particular menu item */
SELECT * FROM modification
WHERE menu_id = ? 

/*Menu item Table*/
/*Change: 3NF resulted in too much data overlap to the point that 
querying would've been very inefficient and take too many join operations to
get cake description and price and ingredient information

Change: just keep one table way too much overlap that it would be 
better to just have one centralized table 

Change: base removed from party_item as it wasn't relevant and not sure
why added in the first place, also

Removed size and shape and filling because separate tables handle those attributes*/
CREATE TABLE menu_item ( 
id INT AUTO_INCREMENT,
name VARCHAR(100) NOT NULL, 
image_url VARCHAR(255),
description TEXT NOT NULL,
type VARCHAR(100) NOT NULL, 
category ENUM('cake', 'party_item') NOT NULL, 
crust_flavor VARCHAR(100) NOT NULL, 
PRIMARY KEY (id) 
); 

/*Sample values for menu item table*/

/* Cake Samples*/

INSERT INTO menu_item VALUES (NULL, "Honey Cake", NULL, "A delicious honey-flavored cake", 'signature cake', 'cake',  'honey crust');
INSERT INTO menu_item VALUES (NULL, "Napoleon Cake", NULL, "A classic Napoleon cake with layers of pastry and cream", 'signature cake', 'cake', 'crispy vanilla crust');
INSERT INTO menu_item VALUES (NULL, "Pavlova Roll", NULL, "A light and airy pavlova roll", 'signature cake', 'cake', 'meringue crust');
INSERT INTO menu_item VALUES (NULL, "Red Velvet Cake", NULL, "A rich red velvet cake with cream cheese frosting", 'specialty cake', 'cake', 'vanilla sponge cake');
INSERT INTO menu_item VALUES (NULL, "Classic Carrot Cake", NULL, "A traditional carrot cake with walnuts and cream cheese frosting", 'specialty cake', 'cake', 'vanilla sponge cake');
INSERT INTO menu_item VALUES (NULL, "Ferrero Rocher Cake", NULL, "A decadent Ferrero Rocher-inspired cake", 'specialty cake', 'cake', 'chocolate sponge cake');
INSERT INTO menu_item VALUES (NULL, "Peanut Butter Chocolate", NULL, "A delicious peanut butter chocolate cake", 'specialty cake', 'cake', 'chocolate sponge cake');
INSERT INTO menu_item VALUES (NULL, "Cheesecake", NULL, "A classic cheesecake with a graham cracker crust", 'signature cake', 'cake', 'graham cracker crust');
INSERT INTO menu_item VALUES (NULL, "Apple Pie", NULL, "A traditional apple pie with a butter crust", 'pie', 'cake', 'butter crust');
INSERT INTO menu_item VALUES (NULL, "Vanilla Cake", NULL, "A classic vanilla cake", 'specialty cake', 'cake', 'vanilla sponge cake');
INSERT INTO menu_item VALUES (NULL, "Snickers Chocolate Cake", NULL, "A chocolate cake with Snickers pieces", 'specialty cake', 'cake', 'chocolate sponge cake');
INSERT INTO menu_item VALUES (NULL, "Honey Number Cake", NULL, "A honey-flavored cake with a number design", 'signature cake', 'cake', 'honey crust');


/* Party Item Samples */
INSERT INTO menu_item VALUES (NULL, "Cupcakes", NULL, "You can't go wrong with these delightful cupcakes. Light and fluffy and perfect for any occasion.", 'cupcake', 'party_item', 'vanilla sponge cake');
INSERT INTO menu_item VALUES (NULL, "Macarons", NULL, "Delicate French cookies", 'macaron', 'party_item', 'almond flour crust');
INSERT INTO menu_item VALUES (NULL, "Cream Puffs", NULL, "Light and airy pastries filled with cream", 'cream puff', 'party_item', 'fluffy pastry crust');
INSERT INTO menu_item VALUES (NULL, "Mini Honey Cakes", NULL, "Small honey-flavored cakes", 'cake', 'party_item', 'honey crust');
INSERT INTO menu_item VALUES (NULL, "Mini Pavlovas", NULL, "Small meringue-based cakes", 'cake', 'party_item', 'meringue crust');
INSERT INTO menu_item VALUES (NULL, "Party Sugar Cookies", NULL, "Delicious sugar cookies for parties with lots of design options", 'cookie', 'party_item', 'sugar cookie crust');


/*Insert Cake Variants */
INSERT INTO menu_variant VALUES (NULL, 1, 'round', '8-inch', 'sour cream', 'mascarpone & cream cheese', 10, NULL, 10, TRUE, 16 ,80.00)
INSERT INTO menu_variant VALUES (NULL, 1, 'round', '10-inch', 'sour cream', 'mascarpone & cream cheese', 10, NULL, 15, TRUE, 16,  100.00)
INSERT INTO menu_variant VALUES (NULL, 2, 'round', '8-inch', 'mascarpone cream & cream cheese', 'custard', 10, NULL, 15, TRUE,16,  90.00)
INSERT INTO menu_variant VALUES (NULL, 2, 'round', '10-inch', 'mascarpone cream & cream cheese', 'custard', 10, NULL, 5, TRUE,16,  110.00)
INSERT INTO menu_variant VALUES (NULL, 3, 'roll', '12-inch', 'mascarpone cream & cream cheese', 'mascarpone & cream cheese & pistachio cream', 10, NULL, 5, TRUE, 16, 110.00)
INSERT INTO menu_variant VALUES (NULL, 3, 'roll', '12-inch', 'mascarpone cream & cream cheese', 'mascarpone & cream cheese', 10, NULL, 5, TRUE, 16, 110.00)
INSERT INTO menu_variant VALUES (NULL, 4, 'round', '10-inch', 'mascarpone cream & cream cheese', 'mascarpone & cream cheese', 10, NULL, 5, TRUE, 16, 110.00)
INSERT INTO menu_variant VALUES (NULL, 5, 'round', '10-inch', 'mascarpone cream & cream cheese', 'mascarpone & cream cheese', 10, NULL, 5, TRUE, 16, 110.00)
INSERT INTO menu_variant VALUES (NULL, 6, 'round', '10-inch', 'mascarpone cream & cream cheese', 'mascarpone & cream cheese', 10, NULL, 5, TRUE, 16, 110.00)
INSERT INTO menu_variant VALUES (NULL, 7, 'round', '10-inch', 'mascarpone cream & cream cheese', 'mascarpone & cream cheese', 10, NULL, 5, TRUE, 16, 110.00)
INSERT INTO menu_variant VALUES (NULL, 8, 'round', '10-inch', 'mascarpone cream & cream cheese', 'mascarpone & cream cheese', 10, NULL, 5, TRUE, 16, 110.00)
INSERT INTO menu_variant VALUES (NULL, 9, 'round', '10-inch', 'mascarpone cream & cream cheese', 'mascarpone & cream cheese', 10, NULL, 5, TRUE, 16, 110.00)
INSERT INTO menu_variant VALUES (NULL, 10, 'round', '10-inch', 'mascarpone cream & cream cheese', 'mascarpone & cream cheese', 10, NULL, 5, TRUE,  110.00)
INSERT INTO menu_variant VALUES (NULL, 11, 'round', '10-inch', 'mascarpone cream & cream cheese', 'Strawberry', 10, NULL, 5, TRUE, 16, 110.00)
INSERT INTO menu_variant VALUES (NULL, 11, 'round', '10-inch', 'mascarpone cream & cream cheese', 'Raspberry', 10, NULL, 5, TRUE, 16, 110.00)
INSERT INTO menu_variant VALUES (NULL, 11, 'round', '10-inch', 'mascarpone cream & cream cheese', 'Nutella', 10, NULL, 5, TRUE, 16,  110.00)
INSERT INTO menu_variant VALUES (NULL, 11, 'round', '10-inch', 'mascarpone cream & cream cheese', 'Lemon', 10, NULL, 5, TRUE, 16,  110.00)
INSERT INTO menu_variant VALUES (NULL, 12, 'round', '10-inch', 'mascarpone cream & cream cheese', 'mascarpone & cream cheese', 10, NULL, 5, TRUE, 16,  110.00)
INSERT INTO menu_variant VALUES (NULL, 13, 'round', '10-inch', 'mascarpone cream & cream cheese', 'mascarpone & cream cheese', 10, NULL, 5, TRUE, 16,  110.00)
INSERT INTO menu_variant VALUES (NULL, 14, 'round', '10-inch', 'mascarpone cream & cream cheese', 'mascarpone & cream cheese', 10, NULL, 5, TRUE, 16,  110.00)
INSERT INTO menu_variant VALUES (NULL, 15, 'round', '10-inch', 'mascarpone cream & cream cheese', 'mascarpone & cream cheese', 10, NULL, 5, TRUE, 16,  110.00)
INSERT INTO menu_variant VALUES (NULL, 16, 'round', '10-inch', 'mascarpone cream & cream cheese', 'mascarpone & cream cheese', 10, NULL, 5, TRUE, 16,  110.00)


/*Inser Party Item Variants*/

INSERT INTO menu_variant VALUES (NULL, )



/*Querying menu items by category*/
SELECT * FROM menu_item
WHERE category = 'cake'

SELECT * FROM menu_item
WHERE category = 'party_item'

/*Querying menu items by type*/
SELECT * FROM menu_item
WHERE type = ?

/*Sorting Items by price*/
SELECT * FROM menu_item
ORDER BY price ASC

/*Retrieving a menu item by id*/
SELECT * FROM menu_item
WHERE menu_id = ?


/*Retriving price of a menu item depending on chosen product variant*/
SELECT price FROM menu_variant
WHERE menu_id = ? AND shape = ? AND size = ? AND filling = ?


/*Change: Added a menu item variant table to handle cases where the bakery
has different variants of the same menu item (shape+size)*/

CREATE TABLE menu_variant(
id INT AUTO_INCREMENT,
menu_id INT,
shape ENUM('round', 'digit', 'rectangle', 'heart', 'n/a') DEFAULT 'n/a',
size ENUM('4-inch', '6-inch', '8-inch', '10-inch', 'unit') NOT NULL,
cream VARCHAR(100) DEFAULT NULL, 
filling VARCHAR(100) DEFAULT NULL,
layers INT DEFAULT NULL CHECK (layers > 0 AND layers <= 20), 
count INT DEFAULT 1 CHECK (count > 0 AND count <= 100), 
quantity INT NOT NULL DEFAULT 0,
availability BOOLEAN AS (quantity > 0) VIRTUAL, 
feeds INT DEFAULT NULL CHECK (feeds > 0),
price DECIMAL(5,2) NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (menu_id) REFERENCES menu_item(id) ON DELETE CASCADE
);


/*Table Ingredient that stores ingredients for each menu item*/
CREATE TABLE ingredient(
    id INT AUTO_INCREMENT,
    ingredient_name VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);



INSERT INTO ingredient VALUES (NULL, "honey");
INSERT INTO ingredient VALUES (NULL, "flour");
INSERT INTO ingredient VALUES (NULL, "eggs");
INSERT INTO ingredient VALUES (NULL, "sour cream");
INSERT INTO ingredient VALUES (NULL, "mascarpone cream");
INSERT INTO ingredient VALUES (NULL, "cream cheese");
INSERT INTO ingredient VALUES (NULL, "butter");
INSERT INTO ingredient VALUES (NULL, "gluten-free flour");
INSERT INTO ingredient VALUES (NULL, "vegan butter");
INSERT INTO ingredient VALUES (NULL, "vegan cream");
INSERT INTO ingredient VALUES (NULL, "vegan sour cream");
INSERT INTO ingredient VALUES (NULL, "vanilla extract");
INSERT INTO ingredient VALUES (NULL, "cocoa powder");
INSERT INTO ingredient VALUES (NULL, "graham crackers");
INSERT INTO ingredient VALUES (NULL, "baking powder");
INSERT INTO ingredient VALUES (NULL, "baking soda");
INSERT INTO ingredient VALUES (NULL, "salt");
INSERT INTO ingredient VALUES (NULL, "sugar");
INSERT INTO ingredient VALUES (NULL, "cinnamon");
INSERT INTO ingredient VALUES (NULL, "nutmeg");
INSERT INTO ingredient VALUES (NULL, "allspice");
INSERT INTO ingredient VALUES (NULL, "cloves");
INSERT INTO ingredient VALUES (NULL, "milk");
INSERT INTO ingredient VALUES (NULL, "heavy cream");
INSERT INTO ingredient VALUES (NULL, "condensed milk");
INSERT INTO ingredient VALUES (NULL, "lemon juice");
INSERT INTO ingredient VALUES (NULL, "melting chocolate chips");


/*Many to many relationship between menu items and ingredients */
CREATE TABLE menu_item_ingredient(
    menu_item_id INT,
    ingredient_id INT,
    PRIMARY KEY (menu_item_id, ingredient_id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_item(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(id) ON DELETE CASCADE
);




/* Retrieve ingredients for a specific menu item */
SELECT ingredient_name FROM ingredient WHERE menu_id = ?

/*Change: needed to keep track of the modifications and toppings selected for each menu item */
CREATE TABLE item_selection( 
id INT AUTO_INCREMENT, 
modification_id INT,
topping_id INT,
custom_instructions TEXT DEFAULT NULL,
price DECIMAL(5,2) NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (modification_id) REFERENCES modification(id) ON DELETE CASCADE,
FOREIGN KEY (topping_id) REFERENCES topping(id) ON DELETE CASCADE,
FOREIGN KEY (id) REFERENCES menu_item(menu_id) ON DELETE CASCADE
) 

/*Retrieving item selection details by item id*/
SELECT * FROM item_selection
WHERE id = ?


/*Calculating price of a menu item depending on chosen toppings and modifications*/
SELECT SUM(price) FROM item_selection
INNER JOIN modification ON item_selection.modification_id = modification.id
INNER JOIN topping ON item_selection.topping_id = topping.id
WHERE item_selection.id = ?

/*Change: Renamed order table to cart because the order
has not been transactioned yet so kinda confusing*/
CREATE TABLE cart(
id INT AUTO_INCREMENT,
user_id BINARY(16) UNIQUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

/*Adding an item to the cart*/
INSERT INTO cart VALUES (NULL, ?)

/*Deleting an item from the cart*/
DELETE FROM cart

/*Updating an item in the cart*/
UPDATE cart
SET item = ?

/*Create a table holds to portray that the cart holds certain menu items and the quantity of each menu item in the cart for a specific cart id*/
CREATE TABLE holds( 
id INT AUTO_INCREMENT,
cart_id INT NOT NULL,
menu_id INT NOT NULL,
menu_variant_id INT NOT NULL,
topping_id INT DEFAULT NULL,
modification_id INT DEFAULT NULL,
quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE, 
FOREIGN KEY (menu_variant_id) REFERENCES menu_variant(id) ON DELETE CASCADE,
FOREIGN KEY (topping_id) REFERENCES topping(id) ON DELETE CASCADE,
FOREIGN KEY (modification_id) REFERENCES modification(id) ON DELETE CASCADE,
PRIMARY KEY (id)
);


/*Trigger function to update the quantity of menu items in the cart
and the availability of menu items when an item is added to the cart*/
CREATE TRIGGER update_cart_quantity_availability
AFTER INSERT ON cart
FOR EACH ROW
BEGIN
UPDATE menu_item
SET quantity = quantity - 1
WHERE menu_id = (SELECT menu_id FROM menu_variant WHERE id = NEW.item);
END;

/*Trigger function to update the total price of the cart when an item is added to the cart*/

CREATE TRIGGER update_cart_total_price
AFTER INSERT ON cart
FOR EACH ROW
BEGIN
UPDATE cart
SET total_price = total_price + (SELECT price from menu_variant WHERE id = NEW.item)
WHERE id = NEW.id;
END;

/*Create a makes_order table to keep track of the order id that is tied to the user
and the date that order was made*/
CREATE TABLE makes_order( 
cart_id INT NOT NULL,
user_id BINARY(16) NOT NULL UNIQUE,
date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE, 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, 
PRIMARY KEY (cart_id, user_id) 
);

