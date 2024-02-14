
# Hawaii Imports

Hawaii Imports is an application for managing the aspects of an automobile dealership. It manages the inventory, automobile sales, and automobile services.

Team:

* Jeongjae Kim - Automobile Service
* Glenn Padilla - Automobile Sales

## Technologies Used

[![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://www.python.org/)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://www.javascript.com/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

## Getting Started

**Make sure you have Docker, Git, and Node.js 18.2 or above**

1. Fork this repository

2. Clone the forked repository onto your local computer:
git clone <<respository.url.here>>

3. Build and run the project using Docker with these commands:
```
docker volume create beta-data
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running

- View the project in the browser: http://localhost:3000/


## Design

Hawaii Imports is made up of 3 microservices which interact with one another.

- **Inventory**
- **Services**
- **Sales**

![Diagram of the Hawaii Imports App](hawaii_imports.png)

## Integration - How we put the "team" in "team"

Our Inventory and Sales domains work together with our Service domain to make everything here at **Hawaii Imports** possible.

How this all starts is at our inventory domain. We keep a record of automobiles on our lot that are available to buy. Our sales and service microservices obtain information from the inventory domain, using a **poller**, which talks to the inventory domain to keep track of which vehicles we have in our inventory so that the service and sales team always has up-to-date information.


## Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser

### Manufacturers:


| Action | Method | URL
| ----------- | ----------- | ----------- |
| List manufacturers | GET | http://localhost:8100/api/manufacturers/
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/ |
| Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/id/
| Update a specific manufacturer | PUT | http://localhost:8100/api/manufacturers/id/
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/id/


JSON body to send data:

Create and Update a manufacturer (SEND THIS JSON BODY):
- You cannot make two manufacturers with the same name
```
{
  "name": "Chrysler"
}
```
The return value of creating, viewing, updating a single manufacturer:
```
{
	"href": "/api/manufacturers/2/",
	"id": 2,
	"name": "Chrysler"
}
```
Getting a list of manufacturers return value:
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```

### Vehicle Models:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List vehicle models | GET | http://localhost:8100/api/models/
| Create a vehicle model | POST | http://localhost:8100/api/models/
| Get a specific vehicle model | GET | http://localhost:8100/api/models/id/
| Update a specific vehicle model | PUT | http://localhost:8100/api/models/id/
| Delete a specific vehicle model | DELETE | http://localhost:8100/api/models/id/

Create and update a vehicle model (SEND THIS JSON BODY):
```
{
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com"
  "manufacturer_id": 1
}
```

Updating a vehicle model can take the name and/or picture URL:
```
{
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com"
}
```
Return value of creating or updating a vehicle model:
- This returns the manufacturer's information as well
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```
Getting a List of Vehicle Models Return Value:
```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "image.yourpictureurl.com",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```

### Automobiles:
- The **'vin'** at the end of the detail urls represents the VIN for the specific automobile you want to access. This is not an integer ID. This is a string value so you can use numbers and/or letters.

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List automobiles | GET | http://localhost:8100/api/automobiles/
| Create an automobile | POST | http://localhost:8100/api/automobiles/
| Get a specific automobile | GET | http://localhost:8100/api/automobiles/vin/
| Update a specific automobile | PUT | http://localhost:8100/api/automobiles/vin/
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/vin/


Create an automobile (SEND THIS JSON BODY):
- You cannot make two automobiles with the same vin
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
Return Value of Creating an Automobile:
```
{
	"href": "/api/automobiles/1C3CC5FB2AN120174/",
	"id": 1,
	"color": "red",
	"year": 2012,
	"vin": "777",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "R8",
		"picture_url": "image.yourpictureurl.com",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Audi"
		}
	}
}
```
To get the details of a specific automobile, you can query by its VIN:
example url: http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

Return Value:
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "green",
  "year": 2011,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "image.yourpictureurl.com",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  }
}
```
You can update the color and/or year of an automobile (SEND THIS JSON BODY):
```
{
  "color": "red",
  "year": 2012
}
```
Getting a list of Automobile Return Value:
```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "image.yourpictureurl.com",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      }
    }
  ]
}
```
# Sales Microservice

On the backend, the sales microservice has 4 models: AutomobileVO, Customer, SalesPerson, and SalesRecord. SalesRecord is the model that interacts with the other three models. This model gets data from the three other models.

The AutomobileVO is a value object that gets data about the automobiles in the inventory using a poller. The sales poller automotically polls the inventory microservice for data, so the sales microservice is constantly getting the updated data.

The reason for integration between these two microservices is that when recording a new sale, you'll need to choose which car is being sold and that information lives inside of the inventory microservice.


## Accessing Endpoints to Send and View Data - Access through Insomnia:

### Customers:


| Action | Method | URL
| ----------- | ----------- | ----------- |
| List customers | GET | http://localhost:8090/api/customers/
| Create a customer | POST | http://localhost:8090/api/customers/
| Show a specific customer | GET | http://localhost:8090/api/customers/id/

To create a Customer (SEND THIS JSON BODY):
```
{
	"name": "John Johns",
	"address": "1212 Ocean Street",
	"phone_number": 9804357878
}
```
Return Value of Creating a Customer:
```
{
	"id: "1",
	"name": "John Johns",
	"address": "1212 Ocean Street",
	"phone_number": 9804357878
}
```
Return value of Listing all Customers:
```
{
	"customers": [
		{
			"id",
			"name": "Martha Stewart",
			"address": "1313 Baker Street",
			"phone_number": "980720890"
		},
		{
			"id",
			"name": "John Johns",
			"address": "1212 Ocean Street",
			"phone_number": "9804357878"
		}
	]
}
```
### Salespeople:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List salespeople | GET | http://localhost:8090/api/salespeople/
| Salesperson details | GET | http://localhost:8090/api/salesperson/id/
| Create a salesperson | POST | http://localhost:8090/api/salespeople/
| Delete a salesperson | DELETE | http://localhost:8090/api/salesperson/id/


To create a salesperson (SEND THIS JSON BODY):
```
{
	"name": "Jane Doe",
	"employee_number": 1
}
```
Return Value of creating a salesperson:
```
{
	"id": 1,
	"name": "Liz",
	"employee_number": 1
}
```
List all salespeople Return Value:
```
{
	"salespeople": [
		{
			"id": 1,
			"name": "Jane Doe",
			"employee_number": 1
		}
	]
}
```
### Salesrecords:
- the id value to show a salesperson's salesrecord is the **"id" value tied to a salesperson.**

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all salesrecords | GET | http://localhost:8090/api/salesrecords/
| Create a new sale | POST | http://localhost:8090/api/salesrecords/
| Show salesperson's salesrecords | GET | http://localhost:8090/api/salesrecords/id/
List all Salesrecords Return Value:
```
{
	"sales": [
		{
			"id": 1,
			"price": 111000,
			"vin": {
				"vin": "111"
			},
			"salesperson": {
				"id": 1,
				"name": "Liz",
				"employee_number": 1
			},
			"customer": {
				"name": "Martha Stewart",
				"address": "1313 Baker Street",
				"phone_number": "980720890"
			}
		}
	]
}
```
Create a New Sale (SEND THIS JSON BODY):
```
{
	"salesperson": "Liz",
	"customer": "John Johns",
	"vin": "888",
	"price": 40000
}
```
Return Value of Creating a New Sale:
```
{
	"id": 4,
	"price": 40000,
	"vin": {
		"vin": "888"
	},
	"salesperson": {
		"id": 1,
		"name": "Liz",
		"employee_number": 1
	},
	"customer": {
		"id",
		"name": "John Johns",
		"address": "1212 Ocean Street",
		"phone_number": "9804357878"
	}
}
```
Show a Salesperson's Salesrecord Return Value:
```
{
	"id": 1,
	"price": 111000,
	"vin": {
		"vin": "111"
	},
	"salesperson": {
		"id": 1,
		"name": "Liz",
		"employee_number": 1
	},
	"customer": {
		"id",
		"name": "Martha Stewart",
		"address": "1313 Baker Street",
		"phone_number": "9...
    }
}
```



# Services Microservice:

On the backend, the Service microservice has three models: AutomobileVO, Technicians, and Appointments. The Appointments is the model that interacts with the other two models. This model gets data from the two other models.

The AutomobileVO is a value object that gets data about the automobiles in the inventory using a poller. The poller is used by the Appointments for data to verify whether the customer is a VIP or not. That is, if a Service Customer's car is proved that it was in the Inventory with the exact VIN and was sold from one of the Salespeople, the Service Customer is a VIP.

The VIN functions not only as a unique ID of each car, but also a identifier of VIP Customer in Service Microservice.


## Accessing Endpoints to Send and View Data - Access through Insomnia:

### Technician:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List technicians | GET | http://localhost:8080/api/technicians/
| Create a technician | POST | http://localhost:8080/api/technicians/
| Delete a technician | DELETE | http://localhost:8080/api/technicians/id/


To create a technician (SEND THIS JSON BODY):
```
{
	"first_name": "Michael",
	"last_name": "Scott",
	"employee_id": 1
}
```
Return Value of creating a technician:
```
{
	"id": 1,
	"first_name": "Michael",
	"last_name": "Scott",
	"employee_id": 1
}
```
List all technicians Return Value:
```
{
	"technicians": [
		{
			"id": 1,
			"first_name": "Michael",
	        "last_name": "Scott",
	        "employee_id": 1
		}
	]
}
```

### Appointments:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all appointments | GET | http://localhost:8080/api/appointments/
| Create an appointment | POST | http://localhost:8080/api/appointments/
| Delete an appointment | DELETE | http://localhost:8080/api/appointment/id/
| Cancel an appointment | PUT | http://localhost:8080/api/appointment/id/cancel/
| Finish an appointment | PUT | http://localhost:8080/api/appointment/id/finish/

Create a New Appointment (SEND THIS JSON BODY):
```
{
	"date_time": "2024-08-01T00:00:00+00:00",
	"reason": "Engine Light on",
	"status": "FINISHED",
	"vin": "2HNYD18936H520501",
	"customer": "Dwight Schurute",
	"technician": "Michael Scott"
}
```
Return Value of Creating a New Appointment:
```
{
	"id": 1,
	"vin": {
		"vin": "2HNYD18936H520501"
	},
    "is_vip": "YES"
	"customer": {
		"name": "Dwight Schurute",
	}
    "date": "08/01/2024",
    "time": "00:00",
	"technician": "Michael Scott"
	"reason": "Engine Light on",
}
```
List all Appointments Return Value:
```
{
	"id": 1,
	"vin": "2HNYD18936H520501",
    "is_vip": "YES"
	"customer": "Dwight Schurute",
    "date": "08/01/2024",
    "time": "00:00",
	"technician": "Michael Scott"
	"reason": "Engine Light on",
}
```
