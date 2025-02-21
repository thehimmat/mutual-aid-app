# Mutual Aid Inventory App

## Overview

The **Mutual Aid Inventory App** is a simple tool designed to help a local mutual aid station track supplies. The app allows the public to view available supplies, while an admin can manage inventory through a secure login system. The goal is to make it easy for people to either contribute to the stock or access the resources they need.

## Features

### Public Inventory Page (No Login Required)
- View available supplies.
- Filter supplies by category or urgency.

### Admin Dashboard (Login Required)
- Secure admin login with JWT authentication.
- CRUD operations for inventory management (Add, Update, Delete supplies).

## Tech Stack

### Frontend
- **React** (JavaScript, AJAX for API requests)

### Backend
- **PHP** (Handles authentication and inventory management)
- **SQLite** (Lightweight, file-based database)

### Authentication
- **JWT (JSON Web Token)** for admin authentication.

### Hosting & Deployment
- **Heroku** (For PHP backend deployment)

## Project Structure
```
/mutual-aid-app
│── /client (React Frontend)
│   │── /components
│   │── /assets
│   │── /styles
│   │── App.jsx
│   │── main.jsx
│   └── package.json
│── /server (PHP Backend with SQLite)
│   │── /public
│   │── /src
│   │── /tests
│   └── composer.json
│── /db (SQLite Database)
│── README.md
```

## API Endpoints

### Public Endpoints
- `GET /inventory` → Fetch inventory list.

### Admin Endpoints (JWT Authentication Required)
- `POST /admin/login` → Authenticate admin and return JWT.
- `POST /inventory` → Add new supply item.
- `PUT /inventory/{id}` → Update existing supply item.
- `DELETE /inventory/{id}` → Remove supply item.

## Setup Instructions

### Quick Start
1. Clone and enter the repository:
```sh
git clone <repository-url>
cd mutual-aid-app
```

2. Set up backend:
```sh
cd server
composer install
cp .env.example .env
```

3. Set up frontend:
```sh
cd ../client
npm install
cp .env.example .env
```

4. Initialize database:
```sh
cd ..
mkdir -p db
touch db/inventory.sqlite
php -f db/init.php
```

5. Start both servers:
```sh
# Terminal 1 - Backend
cd server
php -S localhost:8000 -t public

# Terminal 2 - Frontend
cd client
npm run dev
```

6. Access the application:
- Frontend: http://localhost:5173
- API: http://localhost:8000/api

### Detailed Setup

### Prerequisites
- PHP 8.0 or higher
- Composer
- Node.js 16+ and npm
- SQLite3

### Backend (PHP & SQLite)
1. Install dependencies:
```sh
composer install
```
2. Copy `.env.example` to `.env` and configure:
```sh
cp .env.example .env
```
3. Start the PHP server:
```sh
php -S localhost:8000 -t public
```

### Frontend (React)
1. Install dependencies:
```sh
npm install
```
2. Copy `.env.example` to `.env` and configure API endpoint:
```sh
cp .env.example .env
```
3. Start the development server:
```sh
npm run dev
```

## Database Setup

1. Create SQLite database directory and file:
```sh
mkdir -p db
touch db/inventory.sqlite  # Changed from .db to match .env.example
```

2. Initialize the database:
```php -f db/init.php```

Future Enhancements (Potential Features)
	•	Admin notifications for low stock.
	•	CSV upload support for bulk inventory updates.
	•	Role-based access control for multiple admins.

License

This project is open-source and available for community use.

## Security

For security vulnerabilities, please contact himmat@khalsa.com

## Support

For support questions, please open an issue in the GitHub repository.

### Default Admin Access
After initialization, you can log in with these credentials:
- Username: admin
- Password: admin123

**Important**: Change these credentials before deploying to production.

### Current Implementation Notes
- The authentication system currently uses a simplified token system. Full JWT implementation is planned for the next release.
- The API endpoints are configured but some security middleware is pending implementation.