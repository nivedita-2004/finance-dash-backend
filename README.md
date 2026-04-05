# Finance Data Processing and Access Control Backend

## Objective
This project is a backend system for a finance dashboard that supports:

- User and role management
- Financial record CRUD
- Role-based access control
- Dashboard summary APIs
- Validation and error handling

Built with:

- Node.js
- Express.js
- MySQL
- JWT Authentication

---

## Features

### 1. User and Role Management
- Register and login users
- Roles supported:
  - viewer
  - analyst
  - admin
- User status:
  - active
  - inactive

### 2. Financial Records
- Create records
- View records
- Update records
- Delete records
- Filter by:
  - type
  - category
  - date range

### 3. Dashboard Summary
- Total income
- Total expenses
- Net balance
- Category-wise totals
- Recent activity
- Monthly trends

### 4. Access Control
- Viewer: read-only access
- Analyst: read-only access + dashboard insights
- Admin: full access

### 5. Validation and Error Handling
- Input validation using express-validator
- Proper HTTP status codes
- Clear error messages

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- JWT
- bcryptjs

---

## Folder Structure

```bash
config/
controllers/
middleware/
queries/
routes/
validators/
utils/
app.js
server.js