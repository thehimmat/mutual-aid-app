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
│   │── /src
│   │   │── /components
│   │   │── /pages
│   │   │── /services
│   │   └── /utils
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
4. Deploy to Heroku:
```sh
git push heroku main
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
npm start
```

## Database Setup

1. Create a SQLite database file:
```touch db/inventory.db```

2. Initialize the database:
```php -f db/init.php```

Future Enhancements (Potential Features)
	•	Admin notifications for low stock.
	•	CSV upload support for bulk inventory updates.
	•	Role-based access control for multiple admins.

License

This project is open-source and available for community use.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Security

For security vulnerabilities, please contact [maintainer email].

## Support

For support questions, please open an issue in the GitHub repository.