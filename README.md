## Antarctica-Test-API


### Description
----
This is a REST API developed using Node.js. Following are the functionalities available:

* Registration
* Login
* JWT Auth
* Get User List
* Logout 


### Requirements
----
* Node.js

### Documentation
----

#### Install Dependencies
```
npm install
```

#### Run
```
npm start
```

#### Routes
```
  Route: http://localhost:3000/user/register
    Request Type: POST
    Body:
        {
            "fname": "John",
            "lname": "Doe",
            "email": "john@test.com",
            "password": "john123",
            "orgName": "Pubix"
        }
```
```
    Route: http://localhost:3000/user/login
    Request Type: POST
    Body:
        {
            "email":"john@test.com",
            "password":"john123"
        }
```
```
    Route: http://localhost:3000/user/search/1
    Request Type: POST
    Body:
    {
        "fname": "",
        "lname": "",
        "empid": ""
    }
```
```
    Route: http://localhost:3000/user/logout/
    Request Type: GET
```
