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

## User Profile Endpoint

### GET `/users/profile`

This endpoint is used to retrieve the profile information of the currently authenticated user.

---

### Description

The `/users/profile` endpoint returns the profile details of the authenticated user. This endpoint requires a valid JWT token in the Authorization header. It provides access to the user's personal information without exposing sensitive data like passwords.

---

### Request Method

```
GET /users/profile
```

---

### Headers

```
Authorization: Bearer <token>
```

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | String | Yes | Bearer token obtained from login or registration endpoint |

---

### Request Parameters

No request body is required. The user information is extracted from the JWT token.

---

### Example Request

```bash
curl -X GET http://localhost:5000/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### Response

#### Success Response (200 - OK)

**Status Code:** `200 OK`

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null,
  "__v": 0
}
```

#### Unauthorized Response (401 - Unauthorized)

**Status Code:** `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

#### Invalid Token Response (401 - Unauthorized)

**Status Code:** `401 Unauthorized`

```json
{
  "message": "Invalid token"
}
```

---

### Status Codes

| Code | Status | Description |
|------|--------|-------------|
| `200` | OK | User profile successfully retrieved |
| `401` | Unauthorized | Missing, invalid, or expired token |
| `500` | Internal Server Error | Server error during profile retrieval |

---

### Authentication Requirements

- A valid JWT token must be provided in the `Authorization` header with the format: `Bearer <token>`
- The token must not be expired
- The token must be signed with the `JWT_SECRET_KEY`

---

### Notes

- Password field is excluded from the response for security reasons.
- This endpoint requires authentication; unauthenticated requests will be rejected.
- The token can be obtained from the `/users/register` or `/users/login` endpoints.
- The endpoint uses middleware to verify and decode the JWT token.

---

## User Logout Endpoint

### POST `/users/logout`

This endpoint is used to log out the currently authenticated user and clear their session.

---

### Description

The `/users/logout` endpoint terminates the user's current session. While JWT tokens are stateless, this endpoint can be used to clear the token from cookies or to perform any server-side cleanup tasks. The client should discard the token after calling this endpoint.

---

### Request Method

```
POST /users/logout
```

---

### Headers

```
Authorization: Bearer <token>
```

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | String | Yes | Bearer token obtained from login or registration endpoint |

---

### Request Parameters

No request body is required.

---

### Example Request

```bash
curl -X POST http://localhost:5000/users/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### Response

#### Success Response (200 - OK)

**Status Code:** `200 OK`

```json
{
  "message": "Logged out successfully"
}
```

#### Unauthorized Response (401 - Unauthorized)

**Status Code:** `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

---

### Status Codes

| Code | Status | Description |
|------|--------|-------------|
| `200` | OK | User successfully logged out |
| `401` | Unauthorized | Missing, invalid, or expired token |
| `500` | Internal Server Error | Server error during logout |

---

### Authentication Requirements

- A valid JWT token must be provided in the `Authorization` header with the format: `Bearer <token>`
- The token must not be expired

---

### Logout Process

1. The endpoint receives the request with the authentication token.
2. The token is verified and decoded.
3. Any server-side session cleanup is performed (if applicable).
4. A success response is returned.
5. The client should discard the token on the client-side.

---

### Notes

- JWT tokens are stateless; the server does not maintain a blacklist of logged-out tokens.
- After logout, the client should remove the token from local storage or session storage.
- The client should also clear any cookies that contain authentication tokens.
- Even after logout, if the token is still valid (not expired), it could theoretically be reused unless token blacklisting is implemented.
- For implementing token blacklisting, consider maintaining a logout token list on the server or using token expiration strategies.
- This endpoint requires authentication; unauthenticated requests will be rejected.

---

## Captain Registration Endpoint

### POST `/captains/register`

This endpoint is used to register a new captain (driver) in the UBER clone application.

---

### Description

The `/captains/register` endpoint allows new drivers to create a captain account by providing their personal information, credentials, and vehicle details. The endpoint validates the incoming data, checks for duplicate email registrations, hashes the password for security, and returns an authentication token upon successful registration.

---

### Request Method

```
POST /captains/register
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
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}
```

### Request Parameters

| Field | Type | Required | Validation | Description |
|-------|------|----------|-----------|-------------|
| `fullname.firstname` | String | Yes | Minimum 3 characters | First name of the captain |
| `fullname.lastname` | String | No | Minimum 3 characters (if provided) | Last name of the captain |
| `email` | String | Yes | Valid email format, Unique | Captain's email address |
| `password` | String | Yes | Minimum 6 characters | Captain's password (will be hashed) |
| `vehicle.color` | String | Yes | Minimum 3 characters | Color of the vehicle |
| `vehicle.plate` | String | Yes | Minimum 3 characters | License plate of the vehicle |
| `vehicle.capacity` | Number | Yes | Minimum 1, Maximum 8 | Seating capacity of the vehicle |
| `vehicle.vehicleType` | String | Yes | One of: 'car', 'motorcycle', 'auto' | Type of vehicle |

---

### Example Request

```bash
curl -X POST http://localhost:5000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Raj",
      "lastname": "Kumar"
    },
    "email": "raj.kumar@example.com",
    "password": "securepass123",
    "vehicle": {
      "color": "Black",
      "plate": "MH01AB1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

---

### Response

#### Success Response (201 - Created)

**Status Code:** `201 Created`

```json
{
  "captain": {
    "_id": "607f1f77bcf86cd799439012",
    "fullname": {
      "firstname": "Raj",
      "lastname": "Kumar"
    },
    "email": "raj.kumar@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "MH01AB1234",
      "capacity": 4,
      "typeVehicle": "car"
    },
    "status": "inactive",
    "location": {
      "latitude": null,
      "longitude": null
    },
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
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Please enter a valid firstname",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Please enter a valid color",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Please enter a valid plate",
      "param": "vehicle.plate",
      "location": "body"
    },
    {
      "msg": "Please enter a valid capacity",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

#### Duplicate Captain Response (400 - Bad Request)

**Status Code:** `400 Bad Request`

```json
{
  "message": "Captain already exist"
}
```

---

### Status Codes

| Code | Status | Description |
|------|--------|-------------|
| `201` | Created | Captain successfully registered, token generated |
| `400` | Bad Request | Validation error, missing required fields, or captain already exists |
| `500` | Internal Server Error | Server error during registration |

---

### Validation Rules

1. **Email**
   - Must be a valid email format
   - Must be unique (no duplicate emails allowed)
   - Required field

2. **First Name (firstname)**
   - Minimum length: 3 characters
   - Required field

3. **Last Name (lastname)**
   - Minimum length: 3 characters (if provided)
   - Optional field

4. **Password**
   - Minimum length: 6 characters (6 characters minimum during validation)
   - Minimum length: 8 characters (in model schema)
   - Required field
   - Password is hashed using bcrypt before storage

5. **Vehicle Color**
   - Minimum length: 3 characters
   - Required field

6. **Vehicle Plate**
   - Minimum length: 3 characters
   - Required field

7. **Vehicle Capacity**
   - Minimum: 1 person
   - Maximum: 8 people
   - Must be an integer
   - Required field

8. **Vehicle Type**
   - Must be one of: 'car', 'motorcycle', 'auto'
   - Required field

---

### Authentication Token

Upon successful registration, the API returns a JWT (JSON Web Token) that can be used for subsequent authenticated requests. The token contains the captain's ID and is signed with the `JWT_SECRET_KEY` environment variable. The token expires in 1 day.

---

### Captain Status

- New captains are registered with status `inactive`
- Captains can update their status to `active` when they are ready to accept rides
- Only `active` captains can accept ride requests

---

### Location

- Captains have a location field with `latitude` and `longitude`
- Location is initially `null` and should be updated through a separate endpoint as the captain comes online

---

### Notes

- Passwords are automatically hashed using bcrypt (10 rounds) before being stored in the database.
- The password field is excluded from user responses by default (using Mongoose's `select: false`).
- Email addresses must be unique across the system; duplicate registration attempts will fail.
- The returned token should be stored on the client-side and included in the Authorization header for subsequent authenticated requests.
- Captain tokens expire after 1 day (24 hours) and must be refreshed for continued authentication.
- Vehicle type is restricted to 'car', 'motorcycle', or 'auto' to maintain consistency in the platform.
- Capacity is limited to a maximum of 8 people to ensure safe transportation standards.

---

## Captain Login Endpoint

### POST `/captains/login`

This endpoint is used to authenticate an existing captain (driver) and obtain an authentication token.

---

### Description

The `/captains/login` endpoint allows registered captains to log in to the application by providing their email and password credentials. The endpoint validates the credentials against the stored captain data, compares the password using bcrypt, and returns an authentication token upon successful login.

---

### Request Method

```
POST /captains/login
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
| `email` | String | Yes | Valid email format | Registered captain's email address |
| `password` | String | Yes | Minimum 6 characters | Captain's password |

---

### Example Request

```bash
curl -X POST http://localhost:5000/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "raj.kumar@example.com",
    "password": "securepass123"
  }'
```

---

### Response

#### Success Response (200 - OK)

**Status Code:** `200 OK`

```json
{
  "captain": {
    "_id": "607f1f77bcf86cd799439012",
    "fullname": {
      "firstname": "Raj",
      "lastname": "Kumar"
    },
    "email": "raj.kumar@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "MH01AB1234",
      "capacity": 4,
      "typeVehicle": "car"
    },
    "status": "inactive",
    "location": {
      "latitude": null,
      "longitude": null
    },
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
      "msg": "Please enter a valid email",
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

#### Captain Not Found Response (404 - Not Found)

**Status Code:** `404 Not Found`

```json
{
  "message": "Captain not found"
}
```

---

### Status Codes

| Code | Status | Description |
|------|--------|-------------|
| `200` | OK | Captain successfully logged in, token generated |
| `400` | Bad Request | Validation error or missing required fields |
| `401` | Unauthorized | Invalid email or incorrect password |
| `404` | Not Found | Captain with provided email does not exist |
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
2. The captain is retrieved from the database using the provided email.
3. The provided password is compared against the stored hashed password using bcrypt.
4. If credentials are valid, a new JWT token is generated and returned.
5. If credentials are invalid, a 401 Unauthorized response is returned.

---

### Notes

- The password is never returned in the response (excluded via Mongoose's `select: false`).
- Password comparison is done securely using bcrypt to prevent timing attacks.
- The returned token should be stored on the client-side and included in the Authorization header for subsequent authenticated requests.
- Tokens are signed with the `JWT_SECRET_KEY` environment variable and expire after 1 day.
- Failed login attempts should be rate-limited on the client or server-side to prevent brute force attacks.

---

## Captain Profile Endpoint

### GET `/captains/profile`

This endpoint is used to retrieve the profile information of the currently authenticated captain.

---

### Description

The `/captains/profile` endpoint returns the profile details of the authenticated captain. This endpoint requires a valid JWT token in the Authorization header. It provides access to the captain's personal information, vehicle details, and current status without exposing sensitive data like passwords.

---

### Request Method

```
GET /captains/profile
```

---

### Headers

```
Authorization: Bearer <token>
```

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | String | Yes | Bearer token obtained from login or registration endpoint |

---

### Request Parameters

No request body is required. The captain information is extracted from the JWT token.

---

### Example Request

```bash
curl -X GET http://localhost:5000/captains/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### Response

#### Success Response (200 - OK)

**Status Code:** `200 OK`

```json
{
  "_id": "607f1f77bcf86cd799439012",
  "fullname": {
    "firstname": "Raj",
    "lastname": "Kumar"
  },
  "email": "raj.kumar@example.com",
  "vehicle": {
    "color": "Black",
    "plate": "MH01AB1234",
    "capacity": 4,
    "typeVehicle": "car"
  },
  "status": "inactive",
  "location": {
    "latitude": null,
    "longitude": null
  },
  "socketId": null,
  "__v": 0
}
```

#### Unauthorized Response (401 - Unauthorized)

**Status Code:** `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

#### Invalid Token Response (401 - Unauthorized)

**Status Code:** `401 Unauthorized`

```json
{
  "message": "Invalid token"
}
```

---

### Status Codes

| Code | Status | Description |
|------|--------|-------------|
| `200` | OK | Captain profile successfully retrieved |
| `401` | Unauthorized | Missing, invalid, or expired token |
| `500` | Internal Server Error | Server error during profile retrieval |

---

### Authentication Requirements

- A valid JWT token must be provided in the `Authorization` header with the format: `Bearer <token>`
- The token must not be expired
- The token must be signed with the `JWT_SECRET_KEY`

---

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `_id` | String | Captain's unique identifier |
| `fullname` | Object | Captain's first and last name |
| `email` | String | Captain's email address |
| `vehicle` | Object | Vehicle details including color, plate, capacity, and type |
| `status` | String | Current status (active or inactive) |
| `location` | Object | Captain's current location (latitude and longitude) |
| `socketId` | String | Socket connection ID (if connected) |

---

### Notes

- Password field is excluded from the response for security reasons.
- This endpoint requires authentication; unauthenticated requests will be rejected.
- The token can be obtained from the `/captains/register` or `/captains/login` endpoints.
- The endpoint uses middleware to verify and decode the JWT token.
- The response includes the captain's vehicle information and current status.
- Location information may be null if the captain has not updated their location yet.

---

## Captain Logout Endpoint

### POST `/captains/logout`

This endpoint is used to log out the currently authenticated captain and clear their session.

---

### Description

The `/captains/logout` endpoint terminates the captain's current session. While JWT tokens are stateless, this endpoint can be used to clear the token from cookies or to perform any server-side cleanup tasks. The client should discard the token after calling this endpoint.

---

### Request Method

```
POST /captains/logout
```

---

### Headers

```
Authorization: Bearer <token>
```

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | String | Yes | Bearer token obtained from login or registration endpoint |

---

### Request Parameters

No request body is required.

---

### Example Request

```bash
curl -X POST http://localhost:5000/captains/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### Response

#### Success Response (200 - OK)

**Status Code:** `200 OK`

```json
{
  "message": "Logged out successfully"
}
```

#### Unauthorized Response (401 - Unauthorized)

**Status Code:** `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

---

### Status Codes

| Code | Status | Description |
|------|--------|-------------|
| `200` | OK | Captain successfully logged out |
| `401` | Unauthorized | Missing, invalid, or expired token |
| `500` | Internal Server Error | Server error during logout |

---

### Authentication Requirements

- A valid JWT token must be provided in the `Authorization` header with the format: `Bearer <token>`
- The token must not be expired

---

### Logout Process

1. The endpoint receives the request with the authentication token.
2. The token is verified and decoded.
3. Any server-side session cleanup is performed (if applicable).
4. If the captain is online, they are marked as offline.
5. A success response is returned.
6. The client should discard the token on the client-side.

---

### Notes

- JWT tokens are stateless; the server does not maintain a blacklist of logged-out tokens.
- After logout, the client should remove the token from local storage or session storage.
- The client should also clear any cookies that contain authentication tokens.
- Even after logout, if the token is still valid (not expired), it could theoretically be reused unless token blacklisting is implemented.
- For implementing token blacklisting, consider maintaining a logout token list on the server or using token expiration strategies.
- This endpoint requires authentication; unauthenticated requests will be rejected.
- The captain's status may be automatically set to offline upon logout if a status update mechanism is implemented.

---
