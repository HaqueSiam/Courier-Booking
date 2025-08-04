## 🚀 Courier Management System - Functionality Overview

### 🏠 Authentication & Authorization
- User Registration:

  - Role-based signup (Customer/Agent/Admin with secret keys)

  - Form validation with error handling

- User Login:

  - JWT token storage in localStorage

  - Automatic redirect based on role (Admin→Dashboard, Agent→Parcel Update)

- Protected Routes:

  - Role-based access control (e.g., only Admins can access /assign-parcel)

### 📦 Customer Features
- Parcel Booking:

  - Multi-step form with parcel details (type, size, addresses)

  - Real-time form validation

- Booking Dashboard:

  - View all personal parcels with status tracking

  - Filter by status (Pending/In Transit/Delivered)

### 👔 Admin Features
- Dashboard

  - Real-time metrics (total parcels/delivery rates)

  - Agent performance analytics

  - Exportable reports (CSV/PDF)

- Parcel Assignment

  - Drag-drop assignment interface

  - Agent workload balancing

  - Assignment history tracking

- User Management

  - Bulk user import/export

  - Role modification with approval logs

  - Activity audit trails

### 🛵 Agent Features
- Parcel Status Updates

  - GPS location capture

  - Photo proof upload

  - Status change reasons (Delay/Damage/etc.)

- Task Management

  - Daily route optimization

  - Priority parcel highlighting

  - Offline mode support

### 🔄 Shared Functionalities
- Real-time Updates

  - WebSocket notifications for status changes

  - Auto-refresh without page reload

- Responsive Design

  - Mobile-first interface for agents

  - Desktop-optimized admin views

### 🛠 Tech Stack
- Framework: React 18

- State Management: Context API + Hooks

- Routing: React Router 6

- HTTP Client: Axios

- Styling: Tailwind CSS + Material-UI

- Build Tool: Vite


## 🧪 Project Structure
```
frontend/
├── public/
│   └── home.jpg               
├── src/
│   ├── assets/                   
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Sidebar.jsx
│   │   └── RoleBasedRoutes.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── CustomerDashboard.jsx
│   │   │   └── AgentDashboard.jsx
│   │   ├── BookParcel.jsx
│   │   ├── AssignParcel.jsx
│   │   ├── Users.jsx
│   │   ├── UpdateParcel.jsx
│   │   ├── NotFound.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── routes.jsx
│   └── index.css
├── index.html
├── vercel.json
├── vite.config.js
├── package.json
├── package-lock-json


```

---

## ⚙️ How to Run Frontend Locally

### 1. Clone the Repository

```bash
git clone https://github.com/HaqueSiam/Courier-Booking.git
cd frontend
```
### 2. Install dependencies

```bash
npm install
```

### 3. Set Up .env File

```
VITE_API_URL=http://localhost:5000
```


### 4. Start the Frontend

```
npm run dev
```





















