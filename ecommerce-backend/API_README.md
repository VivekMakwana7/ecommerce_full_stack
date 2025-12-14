# API Documentation

Base URL: `http://localhost:3000`

## 1. Authentication Module

### Sign Up
**Endpoint:** `POST /auth/signup`

**cURL Request:**
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "Test User",
    "number": "1234567890"
  }'
```

**Dummy Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "Test User",
  "number": "1234567890",
  "role": "user",
  "createdAt": "2024-03-20T10:00:00.000Z",
  "updatedAt": "2024-03-20T10:00:00.000Z"
}
```

### Login
**Endpoint:** `POST /auth/login`

**cURL Request:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Dummy Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzEwOTMwMDAwLCJleHAiOjE3MTA5MzM2MDB9.SIGNATURE_STRING",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Test User",
    "role": "user"
  }
}
```

---

## 2. Categories Module

### Create Category
**Endpoint:** `POST /categories`

**cURL Request:**
```bash
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Electronics",
    "description": "Electronic items and gadgets",
    "parentId": null
  }'
```

**Dummy Response:**
```json
{
  "id": 1,
  "name": "Electronics",
  "description": "Electronic items and gadgets",
  "parentId": null,
  "createdAt": "2024-03-20T10:00:00.000Z",
  "updatedAt": "2024-03-20T10:00:00.000Z"
}
```

### Get All Categories
**Endpoint:** `GET /categories`

**cURL Request:**
```bash
curl -X GET http://localhost:3000/categories
```

**Dummy Response:**
```json
[
  {
    "id": 1,
    "name": "Electronics",
    "description": "Electronic items and gadgets",
    "parentId": null,
    "children": [
      {
        "id": 2,
        "name": "Laptops",
        "description": "Gaming and office laptops",
        "parentId": 1
      }
    ]
  },
  {
    "id": 3,
    "name": "Clothing",
    "description": "Men and Women clothing",
    "parentId": null,
    "children": []
  }
]
```

### Search Categories
**Endpoint:** `GET /categories/search`

**cURL Request:**
```bash
curl -X GET "http://localhost:3000/categories/search?q=electronics"
```

**Dummy Response:**
```json
[
  {
    "id": 1,
    "name": "Electronics",
    "description": "Electronic items and gadgets",
    "parentId": null,
    "children": []
  }
]
```

### Get One Category
**Endpoint:** `GET /categories/:id`

**cURL Request:**
```bash
curl -X GET http://localhost:3000/categories/1
```

**Dummy Response:**
```json
{
  "id": 1,
  "name": "Electronics",
  "description": "Electronic items and gadgets",
  "parentId": null
}
```

### Update Category
**Endpoint:** `PATCH /categories/:id`

**cURL Request:**
```bash
curl -X PATCH http://localhost:3000/categories/1 \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated description for Electronics"
  }'
```

**Dummy Response:**
```json
{
  "id": 1,
  "name": "Electronics",
  "description": "Updated description for Electronics",
  "parentId": null,
  "updatedAt": "2024-03-20T11:00:00.000Z"
}
```

### Delete Category
**Endpoint:** `DELETE /categories/:id`

**cURL Request:**
```bash
curl -X DELETE http://localhost:3000/categories/1
```

**Dummy Response:**
```json
{
  "raw": [],
  "affected": 1
}
```

---

## 3. Users Module (Protected)

**Note:** These endpoints require authentication. Replace `<ACCESS_TOKEN>` with the token received from the Login API.

### Get All Users (Admin Only)
**Endpoint:** `GET /users`

**cURL Request:**
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

**Dummy Response:**
```json
[
  {
    "id": 1,
    "email": "admin@example.com",
    "name": "Admin User",
    "number": "9876543210",
    "role": "admin"
  },
  {
    "id": 2,
    "email": "user@example.com",
    "name": "Test User",
    "number": "1234567890",
    "role": "user"
  }
]
```

### Get One User (Admin or Self)
**Endpoint:** `GET /users/:id`

**cURL Request:**
```bash
curl -X GET http://localhost:3000/users/2 \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

**Dummy Response:**
```json
{
  "id": 2,
  "email": "user@example.com",
  "name": "Test User",
  "number": "1234567890",
  "role": "user",
  "createdAt": "2024-03-20T10:00:00.000Z"
}
```

### Update User (Admin or Self)
**Endpoint:** `PATCH /users/:id`

**cURL Request:**
```bash
curl -X PATCH http://localhost:3000/users/2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "name": "Updated User Name",
    "number": "1112223333"
  }'
```

**Dummy Response:**
```json
{
  "id": 2,
  "email": "user@example.com",
  "name": "Updated User Name",
  "number": "1112223333",
  "role": "user",
  "updatedAt": "2024-03-20T12:00:00.000Z"
}
```

### Delete User (Admin Only)
**Endpoint:** `DELETE /users/:id`

**cURL Request:**
```bash
curl -X DELETE http://localhost:3000/users/2 \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

**Dummy Response:**
```json
{
  "raw": [],
  "affected": 1
}
```

---

## 4. Products Module

### Create Product
**Endpoint:** `POST /products`

**cURL Request (Multipart):**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: multipart/form-data" \
  -F "name=Red T-Shirt" \
  -F "description=High quality cotton t-shirt" \
  -F "price=19.99" \
  -F "color=Red,Blue" \
  -F "size=L,XL" \
  -F "quantity=100" \
  -F "categoryId=1" \
  -F "subCategoryId=2" \
  -F "image=@/path/to/your/image.png"
```

**Dummy Response:**
```json
{
  "name": "Red T-Shirt",
  "description": "High quality cotton t-shirt",
  "price": 19.99,
  "color": ["Red", "Blue"],
  "size": ["L", "XL"],
  "quantity": 100,
  "image": "http://localhost:3000/uploads/image-1710940000000-123.png",
  "category": {
    "id": 1,
    "name": "Men"
  },
  "subCategory": {
    "id": 2,
    "name": "T-Shirts"
  },
  "id": 1
}
```

### Get All Products
**Endpoint:** `GET /products`

**cURL Request:**
```bash
curl -X GET http://localhost:3000/products
```

**Dummy Response:**
```json
[
  {
    "id": 1,
    "name": "Red T-Shirt",
    "description": "High quality cotton t-shirt",
    "price": "19.99",
    "color": ["Red", "Blue"],
    "size": ["L", "XL"],
    "quantity": 100,
    "image": "http://localhost:3000/uploads/image-1710940000000-123.png",
    "category": { "id": 1, "name": "Men" },
    "subCategory": { "id": 2, "name": "T-Shirts" }
  }
]
```

### Get One Product
**Endpoint:** `GET /products/:id`

**cURL Request:**
```bash
curl -X GET http://localhost:3000/products/1
```

### Update Product
**Endpoint:** `PATCH /products/:id`

**cURL Request:**
```bash
curl -X PATCH http://localhost:3000/products/1 \
  -H "Content-Type: multipart/form-data" \
  -F "price=24.99" \
  -F "quantity=50"
```

### Delete Product
**Endpoint:** `DELETE /products/:id`

**cURL Request:**
```bash
curl -X DELETE http://localhost:3000/products/1
```

---

## 5. Orders Module (Protected)

**Note:** These endpoints require authentication. Replace `<ACCESS_TOKEN>` with the token received from the Login API.

### Create Order
**Endpoint:** `POST /orders`

**cURL Request:**
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "shippingAddress": "123 Main St, New York, NY 10001",
    "items": [
      {
        "productId": 1,
        "quantity": 2,
        "size": "L",
        "color": "Red"
      },
      {
        "productId": 2,
        "quantity": 1,
        "size": "M",
        "color": "Blue"
      }
    ]
  }'
```

**Dummy Response:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  },
  "shippingAddress": "123 Main St, New York, NY 10001",
  "status": "PENDING",
  "transactionId": null,
  "totalAmount": 59.97,
  "orderItems": [
    {
      "product": {
        "id": 1,
        "name": "Red T-Shirt",
        "price": 19.99,
        "quantity": 98
      },
      "quantity": 2,
      "price": 19.99,
      "size": "L",
      "color": "Red",
      "id": 1
    },
    {
      "product": {
        "id": 2,
        "name": "Blue Jeans",
        "price": 19.99,
        "quantity": 49
      },
      "quantity": 1,
      "price": 19.99,
      "size": "M",
      "color": "Blue",
      "id": 2
    }
  ],
  "id": 1,
  "createdAt": "2024-03-20T14:00:00.000Z",
  "updatedAt": "2024-03-20T14:00:00.000Z"
}
```

### Get All Orders
**Endpoint:** `GET /orders`

**cURL Request:**
```bash
curl -X GET http://localhost:3000/orders \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

**Dummy Response:**
```json
[
  {
    "id": 1,
    "totalAmount": "59.97",
    "status": "PENDING",
    "transactionId": null,
    "shippingAddress": "123 Main St, New York, NY 10001",
    "createdAt": "2024-03-20T14:00:00.000Z",
    "updatedAt": "2024-03-20T14:00:00.000Z",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "Test User"
    },
    "orderItems": [
      {
        "id": 1,
        "quantity": 2,
        "price": "19.99",
        "size": "L",
        "color": "Red",
        "product": {
          "id": 1,
          "name": "Red T-Shirt",
          "image": "http://localhost:3000/uploads/image.png"
        }
      }
    ]
  }
]
```

### Get One Order
**Endpoint:** `GET /orders/:id`

**cURL Request:**
```bash
curl -X GET http://localhost:3000/orders/1 \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

**Dummy Response:**
```json
{
  "id": 1,
  "totalAmount": "59.97",
  "status": "PENDING",
  "transactionId": null,
  "shippingAddress": "123 Main St, New York, NY 10001",
  "createdAt": "2024-03-20T14:00:00.000Z",
  "updatedAt": "2024-03-20T14:00:00.000Z",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Test User"
  },
  "orderItems": [
    {
      "id": 1,
      "quantity": 2,
      "price": "19.99",
      "size": "L",
      "color": "Red",
      "product": {
        "id": 1,
        "name": "Red T-Shirt",
        "description": "High quality cotton t-shirt",
        "image": "http://localhost:3000/uploads/image.png"
      }
    },
    {
      "id": 2,
      "quantity": 1,
      "price": "19.99",
      "size": "M",
      "color": "Blue",
      "product": {
        "id": 2,
        "name": "Blue Jeans",
        "description": "Comfortable denim jeans",
        "image": "http://localhost:3000/uploads/image2.png"
      }
    }
  ]
}
```

### Update Payment Status
**Endpoint:** `POST /orders/payment`

**cURL Request (Success):**
```bash
curl -X POST http://localhost:3000/orders/payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "orderId": 1,
    "transactionId": "txn_123456789",
    "status": "success"
  }'
```

**cURL Request (Failure):**
```bash
curl -X POST http://localhost:3000/orders/payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "orderId": 1,
    "transactionId": "txn_failed_123",
    "status": "failure"
  }'
```
