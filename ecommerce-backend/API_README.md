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
