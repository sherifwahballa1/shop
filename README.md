# How to run
* Create the database using the following sql script `./shop.sql`  
* `npm install`  
* `npm start`  
The server should run on  `http://localost:3000`

## Endpoints
- `GET /api/products/${catId}?page=${pageNumber}` (list all products in a given category)  
**params**
    * `catId` : Category ID  (given category)
    * `page` : Used for pagination
    * `limit` : (optional with default 25 per request) 
- `PUT /api/products/${productId}` (toggle the given product)  
**params**
    * `productId` : (The product need to be toggled set/unset featured)

