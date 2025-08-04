
---

## 🔧 Courier Management System - Backend

### 🚀 Features

### 🔹 Role-Based Access Control
- Endpoint	Access	Description
  - POST /api/auth/register	Public	User registration
  - GET /api/admin/dashboard	Admin	All parcels view
  - PUT /api/agent/update-status	Agent	Status updates.

### 🔹 Core Modules
✅ Authentication

- JWT with 7-day expiry

- Bcrypt password hashing

### 🧠 Diagram
![Database Schema](./images/project_workflow.png)
*Fig 1. Project Workflow*

### ✅ Database Models

- Users: name, email, role (admin/agent/customer)

- Parcels: status, pickup/delivery addresses, timestamps

### 🛠 Tech Stack
- Runtime: Node.js 18+

- Framework: Express.js

- Database: MongoDB (Mongoose ODM)

- Auth: JWT + Bcrypt

- API Docs: Postman
---


## 🧪 Project Structure
```
backend/
├── controllers/
│   ├── authController.js        
│   ├── bookingController.js     
│   ├── adminController.js       
│   ├── agentController.js       
│   └── userController.js        
│
├── middleware/
│   ├── authMiddleware.js        
│   ├── errorMiddleware.js       
│
├── models/
│   ├── User.js                  
│   ├── Parcel.js                
│
├── routes/
│   ├── authRoutes.js            
│   ├── bookingRoutes.js         
│   ├── adminRoutes.js           
│   ├── agentRoutes.js
│   ├── userRoutes.js             
│
├── utils/
│   ├── analytics.js                  
│   ├── constants.js            
│
├── .env                        
├── index.js.js                   
├── package.json
└── README.md

```


---

## ⚙️ How to Run Backend Locally

### 1. Clone the Repository

```bash
git clone https://github.com/HaqueSiam/Courier-Booking.git
cd backend
```
### 2. Install dependencies

```bash
npm install
```

### 3. Set Up .env File

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/courier-booking
JWT_SECRET=mysecret
ADMIN_SECRET_KEY=adminSecret123
AGENT_SECRET_KEY=agentSecret123

```


### 4. Start the Backend

```bash
npm run dev
```

## Paylods For API Testing

### 1. Authentication

### User Registration
```
// POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "SecurePass123!",
  "role": "customer",
  "secretKey": "" // Only required for admin/agent
}

// Admin registration
{
  ...,
  "role": "admin",
  "secretKey": "your_admin_secret_key"
}
```
### User Login

```
// POST /api/auth/login
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```


### 2. Parcel Management

### Create Parcel (Customer)

```
// POST /api/bookings
{
  "parcelName": "MacBook Pro 16",
  "pickupAddress": "123 Main St, New York",
  "deliveryAddress": "456 Tech Park, San Francisco",
  "parcelType": "Fragile",
  "parcelSize": "Medium",
  "paymentType": "Prepaid"
}

```
### Update Parcel Status (Agent)

```
// PUT /api/agent/update-status
{
  "parcelId": "65a1b2c3d4e5f6g7h8i9j0k",
  "status": "In Transit",
  "location": "40.7128,-74.0060" // Optional coordinates
}
```

### 2. Parcel Management
### Assign Parcel to Agent

```
// POST /api/admin/assign-parcel
{
  "parcelId": "65a1b2c3d4e5f6g7h8i9j0k",
  "agentId": "65a1b2c3d4e5f6g7h8i9j0l"
}
```
### Bulk User Import (Admin)
```
// POST /api/admin/users/import
[{
  "name": "Sarah Smith",
  "email": "sarah@example.com",
  "role": "agent"
},
{
  "name": "Mike Johnson",
  "email": "mike@example.com",
  "role": "customer"
}]
```