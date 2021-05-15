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

Registration end-point.
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

Login end-point
```
    Route: http://localhost:3000/user/login
    Request Type: POST
    Body:
        {
            "email":"john@test.com",
            "password":"john123"
        }
```

Get user list end-point. It requires the page number as the request parameter
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

Logout end-point
```
    Route: http://localhost:3000/user/logout/
    Request Type: GET
```
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8a14f1e8f5afc5ce8cad)