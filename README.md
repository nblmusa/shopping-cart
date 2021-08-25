# Shopping Cart API

A basic RESTful shopping cart API

#### DESCRIPTION

- Simple REST API built in NestJS and MySQL.


![Alt text](files/scope-diagram.jpg?raw=true)

#### PREREQUISITES
- Docker / Docker Compose


#### TECHNOLOGIES
- Docker
- NestJS framework
- MySQL
- TypeORM
- Adminer


#### DEPENDENCIES

For the dependencies, refer to package.json for the full list

#### INSTALLATION GUIDE
```bash
$ ./init
```

And populate users into db:
```bash
$ ./scripts/populate-db.sh
```

#### PORTS USED
- API: 3000
- MySQL: 3306
- Adminer: 8080

#### TEST
```bash
$ docker exec -it shopping-cart-api yarn test
```

#### SWAGGER
Find the details of the API routes defined in Swagger accessible at http://localhost:3000/api/v1/docs

#### POSTMAN
Postman collection can be found in the postman directory of this repo.

#### API ROUTES

### [Auth Routes](#category-routes)
| Routes        | Description  | 
|:------------- |:-------------|
| [`POST /api/v1/auth/register`](#register-user)     | Create a new user |  
| [`GET /api/v1/auth/login`](#login-user)    |Login user|   
| [`GET /api/v1/auth/me`](#login-user)    |Get logged in user details|   

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
- Allow guest user to add to cart
- Implement runtime caching for models such as guest cart
- Add logs server
