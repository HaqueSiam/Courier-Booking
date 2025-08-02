## 📌 Key Features

### 🏠 Dashboard (Home Page)
- Displays all packages updated in the last 24 hours.
- Uses a real-time polling mechanism to refresh package data every 5 seconds.
- Highlights "stuck" packages (not updated for more than 30 minutes) with a red background and alert.
- Users can click a row to view full event history of a package in a modal-style timeline.

### 🔍 Search & Filter
- Search bar allows filtering packages by `package_id` keyword.
- Filter dropdown supports:
  - **ACTIVE** – shows only in-progress packages (not DELIVERED/CANCELLED).
  - **ALL** – shows all packages regardless of status.

### 🚚 Courier Status Update Form
- Accessible from `/courier` route.
- Allows couriers to update package status.
- Auto-generates `timestamp` on submission (no manual input).
- Accepts only valid status transitions:
  - `PICKED_UP → IN_TRANSIT → OUT_FOR_DELIVERY → DELIVERED`
  - `EXCEPTION` and `CANCELLED` are interchangeable.
- Includes a secure **secret key** input which is verified on the backend (not passed via headers).
- All inputs automatically trim whitespace.

### 🧑‍💼 Dispatcher Package Creation Form
- Accessible from `/dispatcher` route.
- Creates a new package with:
  - Default status `CREATED`
  - Coordinates (`lat`, `lon`), optional `note`, and `eta`
- Prevents creation of packages that already exist with `CREATED`, `DELIVERED`, or `CANCELLED` statuses.
- Includes secret key authentication for secure usage.

### ⚠️ Stuck Alerts
- If a package has not been updated in the last **30 minutes**, an alert appears above the dashboard.
- Alert includes dismiss (`×`) button for UX friendliness.

### 🎨 Aesthetic & Responsive Design
- Tailwind CSS-based clean, modern design.
- Distinct visual elements (colored status indicators, spacing, hover effects).
- Responsive layout that works well on desktop and mobile.
- Consistent branding with heading: **"Aamira Package Tracker"**




## 🧪 Project Structure
```
COURIER-TRAKER/
├── public/
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── CourierForm.jsx
│ │ ├── DispatcherForm.jsx
│ │ └── PackageDetail.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Courier.jsx
│ │ └── Dispatcher.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── index.html
├── .env
└── vite.config.js

```

---

## ⚙️ How to Run Frontend Locally

### 1. Clone the Repository

```bash
git clone https://github.com/HaqueSiam/Package-Tracker-Frontend.git
cd Package-Tracker-Frontend
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





















