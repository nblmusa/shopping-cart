# Shopping Cart API

A basic RESTful shopping cart API

#### DESCRIPTION

- Simple REST API built in NestJS and MySQL.

#### ASSUMPTIONS

- This project assumes that users are already registered, stored in the database and logged in. There are 2 users available, an admin and a customer.
The JWT can be found in the postman environtment config files or the following tokens can be used as a bearer authentication:
Admin:
```bash
# Admin:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNhMmIxMmE0LTE1MDQtNGEyMC1iYTIxLWZhYjBmZjEzZjNmOCIsImlhdCI6MTYyMjMxOTI2MSwiZXhwIjoxNjIyOTI0MDYxfQ.Is-w3T654uJmHJuXLV5MyAoe14F-hLAv9FhVr-D_6W0

# Customer:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRkMDlkYWY2LWYyNzYtNGQ0My1hNmE2LTNhZjg0NGIyOTZmZSIsImlhdCI6MTYyMjMxOTE5MiwiZXhwIjoxNjIyOTIzOTkyfQ.4HQH5lnrTISvJxzY2OjLo8j0FXocEO-heB2IntefptE
```

- Also, checking out cart and placing and order is not within the scope of this project.


#### PREREQUISITES
- Docker / Docker Compose


#### TECHNOLOGIES
- Docker
- NestJS framework
- MySQL
- TypeORM


#### DEPENDENCIES

For the dependencies, refer to package.json for the full list

#### INSTALLATION GUIDE
```bash
$ ./init
```

To populate test users into db:
```bash
$ ./scripts/populate-db.sh
```

#### TEST
```bash
# unit tests
$ docker exec -it shopping-cart-api yarn test

# test coverage
$ docker exec -it shopping-cart-api yarn test:cov
```

#### SWAGGER
Find the details of the API routes defined in Swagger accessible at http://localhost:3000/api/v1/docs

#### POSTMAN
Postman collection can be found in the postman directory of this repo.

#### API ROUTES

### [Product Category Routes](#category-routes)
| Routes        | Description  | 
|:------------- |:-------------|
| [`POST /api/v1/categories/`](#create-new-category)     | Create a new category |  
| [`GET /api/v1/categories/`](#get-all-category)    |Get list of all categories|   
| [`GET /api/v1/categories/:categoryId`](#get-category)| Get category details |    
| [`PATCH /api/v1/categories/:categoryId`](#update-category) | Update the details of a category |
| [`DELETE /api/v1/categories/:categoryId`](#delete-category) |Delete category |

### [Products Routes](#product-routes)
| Routes        | Description   | 
|:------------- |:-------------|
| [`POST /api/v1/products/`](#create-new-product)     | Create a new product |  
| [`GET /api/v1/products/`](#get-all-products)    |Get list of all products|   
| [`GET /api/v1/products/:productId`](#get-product-details)| Get details of a product |    
| [`PATCH /api/v1/products/:productId`](#update-product) | Update the details of a product |
| [`DELETE /api/v1/products/:productId`](#delete-product) |Delete a product |

### [Carts Routes](#carts-routes)
| Routes        | Description   | 
|:------------- |:-------------|
| [`POST /api/v1/cart/items`](#create-new-cart)     | Add product to cart |  
| [`GET /api/v1/cart/items`](#get-cart-items)    | List of cart items of a user |   
| [`PATCH /api/v1/cart/items/:productId`](#update-cart-items) | Update cart item |
| [`DELETE /api/v1/cart/items/:productid`](#remove-cart-item) | Remove items from cart |
| [`DELETE /api/v1/cart/items`](#clear-cart) | Remove all items from cart |


### Future Road map
- 
