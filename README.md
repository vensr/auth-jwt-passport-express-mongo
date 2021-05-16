## Implement API Authentication with JSON Web Tokens and Passport

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
* The registered user logs into the application and JWT token is generated.
* Secure user resource is accessed by the user by sending the JWT token.
* The JWT token is verified and the user is allowed to access the secure resource.

### Data Validations
* Validations are put in place to ensure required data is verified.
* Business validations are in place to restrict registration multiple times with same email.

### User Authorization
* Admin accounts are added to the application.
* The admin user logs into the application and JWT token is generated.
* Secure admin resource is accessed by the admin by sending the JWT token.
* The JWT token is verified and the admin user is allowed to access the secure resource.

### Prerequisites
* Node.js installed locally.
* MongoDB installed and running locally.
