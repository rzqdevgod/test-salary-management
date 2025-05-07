# Salary Management System

A full-stack application for managing user salary details with admin capabilities.

## Tech Stack

- **Backend**: Laravel 10.x
- **Frontend**: Next.js 14
- **Database**: MySQL
- **Styling**: Tailwind CSS

## Project Structure

```
salary-management/
├── backend/           # Laravel API
└── frontend/         # Next.js Application
```

## Features

- User salary submission with unique email validation
- Admin panel for salary management
- Commission management
- Salary conversion between local currency and Euros
- Responsive design for all devices

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Copy .env.example to .env and configure your database:
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Run migrations:
   ```bash
   php artisan migrate
   ```

6. Start the server:
   ```bash
   php artisan serve
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env.local file and configure API URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/salary` - Submit/Update salary details
- `GET /api/salary` - Get all salary records (Admin only)
- `PUT /api/salary/{id}` - Update salary details (Admin only)
- `GET /api/salary/{id}` - Get specific salary record

## Environment Variables

### Backend (.env)
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=salary_management
DB_USERNAME=root
DB_PASSWORD=
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
``` 