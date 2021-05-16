## Implement API Authentication with JSON Web Tokens and Passport

### Prerequisites
* Node.js installed locally.
* MongoDB installed and running locally.
* HttPie user-friendly command-line HTTP client
### Introduction
Applications need a way to protect their resources and restrict access to these resources only by verified users.

JSON Web Token (JWT) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

This server side application demonstrates using nodejs, JWT, passport, express and mongodb to implement an authentication and authorization mechanism for REST API end points.

Here is a brief about the application features 

### DB migrations
* Add roles (user and admin) using the migration scripts.
* Add admin user using migration script

### User Registration and Login (Authentication)
* The user registers to the application and an user account is created with 'user' role.

Request
```javascript
http POST :3000/register email="test@test.com" password="password"
```
Response
```json
{
    "message": "Registration is successful",
    "user": {
        "__v": 0,
        "_id": "60a14bc6aa9e4a3cd2a57237",
        "email": "test@test.com",
        "password": "$2b$10$ftVSyTcKZtqWd8kH2zf5He/pVTHBLqG1up97IVOjYKWFJkHNT4fnK",
        "roles": [
            {
                "__v": 0,
                "_id": "60a13ab64935c430cd9c78c5",
                "description": "User Role",
                "name": "User"
            }
        ]
    }
}
```
* The registered user logs into the application and JWT token is generated.

Request
```javascript
http POST :3000/login email="test@test.com" password="password"
```

Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwYTE0YmM2YWE5ZTRhM2NkMmE1NzIzNyIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGVzIjpbIjYwYTEzYWI2NDkzNWM0MzBjZDljNzhjNSJdfSwiaWF0IjoxNjIxMTgzNzM0fQ.qZz1jlob9ZNVQbfFLmTfw_YG4kkvUbl2v2cyZZiBEe4"
}
```
* Secure user resource is accessed by the user by sending the JWT token.

Request
```javascript
http :3000/user/profile "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwYTE0YmM2YWE5ZTRhM2NkMmE1NzIzNyIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGVzIjpbIjYwYTEzYWI2NDkzNWM0MzBjZDljNzhjNSJdfSwiaWF0IjoxNjIxMTgzNzM0fQ.qZz1jlob9ZNVQbfFLmTfw_YG4kkvUbl2v2cyZZiBEe4"
```

Response
```json
{
    "message": "Secure Profile Information",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwYTE0YmM2YWE5ZTRhM2NkMmE1NzIzNyIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGVzIjpbIjYwYTEzYWI2NDkzNWM0MzBjZDljNzhjNSJdfSwiaWF0IjoxNjIxMTgzNzM0fQ.qZz1jlob9ZNVQbfFLmTfw_YG4kkvUbl2v2cyZZiBEe4",
    "user": {
        "__v": 0,
        "_id": "60a14bc6aa9e4a3cd2a57237",
        "email": "test@test.com",
        "password": "$2b$10$ftVSyTcKZtqWd8kH2zf5He/pVTHBLqG1up97IVOjYKWFJkHNT4fnK",
        "roles": [
            "60a13ab64935c430cd9c78c5"
        ]
    }
}
```
* The JWT token is verified and the user is allowed to access the secure resource.

### Data Validations
* Validations are put in place to ensure required fields are verified.

Request
```javascript
http POST :3000/login
http POST :3000/register
```

Response
```json
{
    "errors": [
        "\"email\" is required",
        "\"password\" is required"
    ]
}
```
* Business validations are in place to restrict registration multiple times with same email.

Request
```javascript
http POST :3000/register email="test@test.com" password="password"
```

Response
```json
{
    "errors": [
        "\"email\" is already registered"
    ]
}
```

### User Authorization
* Admin accounts are added to the application.
* The admin user logs into the application and JWT token is generated.

Request
```javascript
http POST :3000/login email="admin@testing.com" password="password"
```

Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwYTEzYWI2NDkzNWM0MzBjZDljNzhjNyIsImVtYWlsIjoiYWRtaW5AdGVzdGluZy5jb20iLCJyb2xlcyI6WyI2MGExM2FiNjQ5MzVjNDMwY2Q5Yzc4YzYiXX0sImlhdCI6MTYyMTE4NjYwOX0.Ve3ajiOVme02nuC00Wio_hJyxbDiRE-bqn28hNEHj-s"
}
```

* Secure admin resource is accessed by the admin by sending the JWT token.
* The JWT token is verified and the admin user is allowed to access the secure resource.

Request
```javascript
http :3000/admin/profile "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwYTEzYWI2NDkzNWM0MzBjZDljNzhjNyIsImVtYWlsIjoiYWRtaW5AdGVzdGluZy5jb20iLCJyb2xlcyI6WyI2MGExM2FiNjQ5MzVjNDMwY2Q5Yzc4YzYiXX0sImlhdCI6MTYyMTE4NjYwOX0.Ve3ajiOVme02nuC00Wio_hJyxbDiRE-bqn28hNEHj-s"
```

Response
```json
{
    "message": "Admin Profile Information",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwYTEzYWI2NDkzNWM0MzBjZDljNzhjNyIsImVtYWlsIjoiYWRtaW5AdGVzdGluZy5jb20iLCJyb2xlcyI6WyI2MGExM2FiNjQ5MzVjNDMwY2Q5Yzc4YzYiXX0sImlhdCI6MTYyMTE4NjYwOX0.Ve3ajiOVme02nuC00Wio_hJyxbDiRE-bqn28hNEHj-s",
    "user": {
        "__v": 0,
        "_id": "60a13ab64935c430cd9c78c7",
        "email": "admin@testing.com",
        "password": "$2b$10$oUPmuBPWYfjDLiqH56RavevZnMJZ06qh08pTn/L.jEsBTunECHA5O",
        "roles": [
            "60a13ab64935c430cd9c78c6"
        ]
    }
}
```
Request
```javascript
http :3000/user/isadmin "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwYTEzYWI2NDkzNWM0MzBjZDljNzhjNyIsImVtYWlsIjoiYWRtaW5AdGVzdGluZy5jb20iLCJyb2xlcyI6WyI2MGExM2FiNjQ5MzVjNDMwY2Q5Yzc4YzYiXX0sImlhdCI6MTYyMTE4NjYwOX0.Ve3ajiOVme02nuC00Wio_hJyxbDiRE-bqn28hNEHj-s"
```

Response
```json
{
    "admin": true,
    "message": "Admin Information"
}
```
