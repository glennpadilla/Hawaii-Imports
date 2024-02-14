
# Student Rubric

## Specifications

[TOC]

## README

Step-by-step Instructions to Run the Project
Diagram of the Project
Explicitly Defined URLs and ports for each of the services
CRUD Route Documentation for each of the services
Identification of the Value Objects

## Inventory Microservice: Front End

### Manufacturer

- Should have a working form view
- Should have a working list view

### Vehicle Model

- Should have a working form view
- Should have a working list view

### Automobile

- Should have a working form view
- Should have a working list view
No JS console errors
Views refresh on state change

## Services Microservice: Front End

### Navigation

Should have a link to an Add a Technician Form View
Should have a link to an Add a Service Appointment Form View
Should have a link to Show a List of Appointments View
Should have a link to Show Service Appointments by VIN View(optional)

### Add a Technician Form

Should contain relevant inputs
  - Should contain an Employee Name input
  - Should contain an Employee ID input
On submit should create a new technician
No JS console errors
Verify state updates inside of Add a Service Appointment

### Add a Service Appointment Form

Should contain relevant inputs
  - Should contain a VIN input
  - Should contain the vehicle owner's name input
  - Should contain an input for the appointment date and time
  - Should contain an input to select a service technician
  - Should contain an input to add a reason for service appt
On submit should create a new service appointment
No JS console errors
Verify state updates inside of list of appointments/service appts by VIN

### Service Appointments List

 Should contain a list of the following information for each service appointment
 - VIN
 - Customer Name
 - Date and Time
 - Assigned Technician Name
 - Reason for Service
If the vehicle was purchased from the dealer's inventory, then should be a visual indicator of "VIP treatment"
Should have a button to complete/finish a service appointment
 - On click should "complete" the appointment and remove the appointment from the view
Should have a button to cancel a service appointment
 - On click should cancel the appointment and remove the appointment from the view
No JS console errors

### Show Service History by VIN(separate view or as part of service appointments list)

Should contain a VIN input
Should contain a submit button
 - On submit, should show the service history for that VIN(vehicle)
 - Information displayed should only include appointments for that VIN (ie. the filter works)
 - This information should be displayed without needing to refresh the page
Should (at minimum) contain a list of the following information for each service appointment
     - Customer Name
     - Date and Time
     - Assigned Technician Name
     - Reason for Service
No JS console errors

## Service Microservice: Back End

### Technicians Resource

GET request to API should respond with a list of technicians
GET request to API should respond with an appropriate status code
POST request to API should create a new technician resource
POST request to API should respond with an appropriate status code

### Appointments Resource

GET request to API should respond with a list of appointments
GET request to API should respond with an appropriate status code
POST request to API should create a new appointment
POST request to API should respond with an appropriate status code

### Polling Service

It should work and create the appropriate Value Objects for the service

## Sales Microservice: Front End

### Navigation

Should have a link to an Add Sales Person Form View
Should have a link to an Add a Customer Form View
Should have a link to a Create a Sale Record Form View
Should have a link to a List All Sales View
Should have a link to a List All Sales by Sales Person View (optional)
Add Sales Person Form View (5%)
Should contain relevant inputs
- should contain a name input
- should contain an employee number input
On submit, should create a new sales person
No JS console errors
Verify state updates inside Create a Sale Record View

### Add a Customer Form View (5%)

Should contain relevant inputs
- should contain a name input
- should contain an address input
- should contain a phone number input
On submit, should create a new potential customer
No JS console errors
Verify state updates inside Create a Sale Record View

### Create a Sale Record Form View (10%)

Should contain relevant inputs
- should contain a dropdown to select an unsold Automobile in inventory
- should contain a dropdown to select a Sales Person
- should contain a dropdown to select a Customer
- should contain a sale price input
On submit, should create a new sale record
No JS console errors
Verify state updates inside List All Sales View

### List All Sales View (5%)

Should contain the following information for each record
- Sales Person Name
- Employee Number
- Purchaser Name
- Automobile VIN
- Price of Sale
No JS Console Errors

### List Sales History by Sales Person (5%)

Should contain a dropdown to select a sales person by name or employee number?
On selection, should display a list of sales records for that sales person without refreshing
Should contain the following information for each record
- Sales Person Name
- Customer Name
- Automobile VIN
- Sale Price
No JS Console Errors

## Sales Microservice: Back End

### Sales Person Resource

GET request to API should respond with a list of sales people
GET request to API should respond with an appropriate status code
POST request to API should create a new sales person resource
POST request to API should respond with an appropriate status code

### Customer Resource

GET request to API should respond with a list of customers
GET request to API should respond with an appropriate status code
POST request to API should create a new customer resource
POST request to API should respond with an appropriate status code

### Sales Resource

GET request to API should respond with a list of sales
GET request to API should respond with an appropriate status code
POST request to API should create a new sales resource
POST request to API should respond with an appropriate status code

### Polling Service

It should work and create the appropriate Value Objects for the service
