# shopping-cart-api

A basic RESTful shopping cart API

#### DESCRIPTION

- Simple REST API built in NestJS and MySQL

#### PREREQUISITES
- Docker / Docker Compose

#### INSTALLATION GUIDE
```bash
$ ./init
```

#### TEST
```bash
# unit tests
$ docker exec -it nest yarn test

# test coverage
$ docker exec -it nest yarn test:cov
```

#### API ROUTES

Find the details of the API routes defined in Swagger accessible at http://localhost/api/docs

### [Product Category Routes](#category-routes)
| Routes        | Description  | 
|:------------- |:-------------|
| [`POST /categories/`](#create-new-category)     | Create a new category |  
| [`GET /categories/`](#get-all-category)    |Get list of all categories|   
| [`GET /categories/:categoryId`](#get-category)| Get category details |    
| [`PATCH /categories/:categoryId`](#update-category) | Update the details of a category |
| [`DELETE /categories/:categoryId`](#delete-category) |Delete category |

### [Products Routes](#product-routes)
| Routes        | Description   | 
|:------------- |:-------------|
| [`POST /products/`](#create-new-product)     | Create a new product |  
| [`GET /products/`](#get-all-products)    |Get list of all products|   
| [`GET /products/:productId`](#get-product-details)| Get details of a product |    
| [`PATCH /products/:productId`](#update-product) | Update the details of a product |
| [`DELETE /products/:productId`](#delete-product) |Delete a product |
