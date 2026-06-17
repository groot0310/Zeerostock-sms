# Zeerostock — Student Management System

A full-stack Student Management System built as part of the Full Stack Developer assignment for Zeerostock. Supports student CRUD operations, marks management, paginated listings, and a React frontend integrated with the backend APIs.

---

## Tech Stack

**Backend**
- Node.js + Express.js — REST API
- MySQL — relational database
- Prisma ORM — schema modeling, migrations, and queries
- dotenv — environment configuration
- cors — cross-origin request handling

**Frontend**
- React.js (Vite)
- React Router DOM — client-side routing
- Axios — API communication
- Tailwind CSS — styling

**Tooling**
- Postman — API testing and collection
- Git/GitHub — version control

---

## Project Structure

```
zeerostock-sms/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Business logic for students & marks
│   │   ├── routes/            # Express route definitions
│   │   ├── middleware/        # Centralized error handling
│   │   ├── lib/                # Prisma client instance
│   │   └── index.js           # App entry point
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── migrations/        # Auto-generated SQL migration files
│   └── .env                   # Environment variables (not committed)
│
├── frontend/
│   ├── src/
│   │   ├── api/                # Axios instance
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/              # Route-level pages
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
```

---

## Database Schema

Two normalized tables with a one-to-many relationship.

**`students`**

| Column | Type | Constraint |
|---|---|---|
| id | INT | Primary Key, Auto Increment |
| name | VARCHAR | Not Null |
| email | VARCHAR | Unique, Not Null |
| phone | VARCHAR | Nullable |
| dateOfBirth | DATETIME | Nullable |
| address | VARCHAR | Nullable |
| createdAt | DATETIME | Default: now() |
| updatedAt | DATETIME | Auto-updated |

**`marks`**

| Column | Type | Constraint |
|---|---|---|
| id | INT | Primary Key, Auto Increment |
| subject | VARCHAR | Not Null |
| score | FLOAT | Not Null |
| grade | VARCHAR | Nullable |
| studentId | INT | Foreign Key → students.id (Cascade Delete) |
| createdAt | DATETIME | Default: now() |
| updatedAt | DATETIME | Auto-updated |

**Design rationale:** Student information and marks are separated into two tables instead of one, since a student can have multiple marks across different subjects. Storing this in a single table would duplicate student details for every subject and violate normalization principles. A foreign key (`studentId`) links marks to their student, with `onDelete: Cascade` ensuring marks are automatically removed if a student record is deleted, keeping the database consistent without orphaned rows.

The full schema is defined in `backend/prisma/schema.prisma`, and the generated SQL migration files are available in `backend/prisma/migrations/`.

---

## API Endpoints

### Students

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/students` | Create a new student |
| GET | `/api/students?page=1&limit=10` | Get paginated list of students |
| GET | `/api/students/:id` | Get a single student with their marks |
| PUT | `/api/students/:id` | Update student information |
| DELETE | `/api/students/:id` | Delete a student (and their marks) |

### Marks

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/marks` | Add a mark for a student |
| PUT | `/api/marks/:id` | Update a mark |
| DELETE | `/api/marks/:id` | Delete a mark |

### Pagination Response Format

```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "total": 25,
    "currentPage": 1,
    "totalPages": 3,
    "limit": 10
  }
}
```

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MySQL installed and running locally
- npm

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/zeerostock-student-management.git
cd zeerostock-student-management
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/zeerostock_sms"
PORT=5000
```

Create the database in MySQL:

```sql
CREATE DATABASE zeerostock_sms;
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the backend server:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Testing APIs

Import the Postman collection from `/postman/zeerostock-sms.postman_collection.json` to test all endpoints directly.

---

## Architecture Overview

The application follows a standard three-layer architecture:

**Frontend (React)** → communicates via REST calls (Axios) → **Backend (Express)** → uses Prisma ORM → **Database (MySQL)**

The backend follows an MVC-inspired structure: routes define endpoints, controllers contain business logic, and Prisma handles all database interaction. This keeps logic decoupled from routing and makes it straightforward to extend (for example, adding authentication or new resource types later).

The frontend is organized by responsibility: `pages/` for route-level views, `components/` for reusable UI pieces (forms, tables, pagination, dialogs), and a single `api/axios.js` instance so the base URL only needs to be configured in one place.

Pagination is handled server-side using `page` and `limit` query parameters, returning both data and metadata (total records, current page, total pages) so the frontend never has to calculate pagination logic itself.

---

## Assumptions Made

- A student's email is treated as a unique identifier — duplicate emails are rejected at the API level.
- Marks are stored per subject per student, with no constraint preventing multiple entries for the same subject (a student could be re-evaluated in a subject).
- `grade` is stored as a free-text field rather than computed automatically from `score`, since grading scales can vary by institution.
- Deleting a student cascades and removes all associated marks, since marks have no meaning without a linked student.
- Authentication/authorization was intentionally left out of scope, as the assignment focuses on CRUD, schema design, pagination, and integration rather than access control.
- MySQL was used in place of PostgreSQL (mentioned in the assignment) due to existing local tooling (SQL Workbench); the schema design and normalization principles remain identical and Prisma made this swap straightforward without changing application logic.

---

## Author

Built as part of the Full Stack Developer Assignment for Zeerostock.
