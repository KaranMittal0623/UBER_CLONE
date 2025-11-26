# UBER Clone API Documentation

## User Registration Endpoint

### POST `/users/register`

This endpoint is used to register a new user in the UBER clone application.

---

### Description

The `/users/register` endpoint allows new users to create an account by providing their personal information and credentials. The endpoint validates the incoming data, hashes the password for security, and returns an authentication token upon successful registration.

---

### Request Method

```
POST /users/register
```

---

### Request Body

The request body should be sent as **JSON** with the following structure:

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

### Request Parameters

| Field | Type | Required | Validation | Description |
|-------|------|----------|-----------|-------------|
| `fullname.firstname` | String | Yes | Minimum 3 characters | First name of the user |
| `fullname.lastname` | String | No | Minimum 3 characters (if provided) | Last name of the user |
| `email` | String | Yes | Valid email format | Unique email address |
| `password` | String | Yes | Minimum 6 characters | User's password (will be hashed) |

---

### Example Request

```bash
curl -X POST http://localhost:5000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

---

### Response

#### Success Response (201 - Created)

**Status Code:** `201 Created`

```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Validation Error Response (400 - Bad Request)

**Status Code:** `400 Bad Request`

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

### Status Codes

| Code | Status | Description |
|------|--------|-------------|
| `201` | Created | User successfully registered, token generated |
| `400` | Bad Request | Validation error or missing required fields |
| `409` | Conflict | Email already exists in the database |
| `500` | Internal Server Error | Server error during registration |

---

### Validation Rules

1. **Email**
   - Must be a valid email format
   - Must be unique (no duplicate emails allowed)

2. **First Name (firstname)**
   - Minimum length: 3 characters
   - Required field

3. **Last Name (lastname)**
   - Minimum length: 3 characters (if provided)
   - Optional field

4. **Password**
   - Minimum length: 6 characters
   - Required field
   - Password is hashed using bcrypt before storage

---

### Authentication Token

Upon successful registration, the API returns a JWT (JSON Web Token) that can be used for subsequent authenticated requests. The token contains the user's ID and is signed with the `JWT_SECRET_KEY` environment variable.

---

### Notes

- Passwords are automatically hashed using bcrypt (10 rounds) before being stored in the database.
- The password field is excluded from user responses by default (using Mongoose's `select: false`).
- Email addresses must be unique across the system; duplicate registration attempts will fail.
- The returned token should be stored on the client-side and included in the Authorization header for subsequent authenticated requests.

---

## User Login Endpoint

### POST `/users/login`

This endpoint is used to authenticate an existing user and obtain an authentication token.

---

### Description

The `/users/login` endpoint allows registered users to log in to the application by providing their email and password credentials. The endpoint validates the credentials against the stored user data, compares the password using bcrypt, and returns an authentication token upon successful login.

---

### Request Method

```
POST /users/login
```

---

### Request Body

The request body should be sent as **JSON** with the following structure:

```json
{
  "email": "string",
  "password": "string"
}
```

### Request Parameters

| Field | Type | Required | Validation | Description |
|-------|------|----------|-----------|-------------|
| `email` | String | Yes | Valid email format | Registered user's email address |
| `password` | String | Yes | Minimum 6 characters | User's password |

---

### Example Request

```bash
curl -X POST http://localhost:5000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

---

### Response

#### Success Response (200 - OK)

**Status Code:** `200 OK`

```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Validation Error Response (400 - Bad Request)

**Status Code:** `400 Bad Request`

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### Invalid Credentials Response (401 - Unauthorized)

**Status Code:** `401 Unauthorized`

```json
{
  "message": "Invalid email or password"
}
```

#### User Not Found Response (404 - Not Found)

**Status Code:** `404 Not Found`

```json
{
  "message": "User not found"
}
```

---

### Status Codes

| Code | Status | Description |
|------|--------|-------------|
| `200` | OK | User successfully logged in, token generated |
| `400` | Bad Request | Validation error or missing required fields |
| `401` | Unauthorized | Invalid email or incorrect password |
| `404` | Not Found | User with provided email does not exist |
| `500` | Internal Server Error | Server error during login |

---

### Validation Rules

1. **Email**
   - Must be a valid email format
   - Required field

2. **Password**
   - Minimum length: 6 characters
   - Required field
   - Must match the stored hashed password

---

### Authentication Process

1. The endpoint receives the email and password from the request body.
2. The user is retrieved from the database using the provided email.
3. The provided password is compared against the stored hashed password using bcrypt.
4. If credentials are valid, a new JWT token is generated and returned.
5. If credentials are invalid, a 401 Unauthorized response is returned.

---

### Notes

- The password is never returned in the response (excluded via Mongoose's `select: false`).
- Password comparison is done securely using bcrypt to prevent timing attacks.
- The returned token should be stored on the client-side and included in the Authorization header for subsequent authenticated requests.
- Tokens are signed with the `JWT_SECRET_KEY` environment variable.
- Failed login attempts should be rate-limited on the client or server-side to prevent brute force attacks.

---
