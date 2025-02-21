Mutual Aid Inventory App - Plan

Tech Stack:
	•	Frontend: React (JavaScript, AJAX)
	•	Backend: PHP with SQLite
	•	Hosting: Heroku (for PHP server)
	•	Database: SQLite (file-based DB) - manual setupFeatures
	1.	Public Inventory Page (No Login Required)
	•	View available supplies.
	•	Filter by category/urgency.
	2.	Admin Dashboard (Login Required)
	•	Admin login (session-based authentication).
	•	CRUD operations for inventory (Add, Update, Delete).Development Plan

1. Backend (PHP + SQLite)
	•	Set up PHP server (index.php).
	•	Create SQLite database and connect via PDO.
	•	Build API endpoints:
	•	GET /inventory → Fetch inventory.
	•	POST /admin/login → Authenticate admin and return a JWT
	•	POST /inventory → Add item (requires a JWT).
	•	PUT /inventory/{id} → Update item (requires a JWT).
	•	DELETE /inventory/{id} → Remove item (requires a JWT).

2. Frontend (React)
	•	Fetch inventory using AJAX (fetch()).
	•	Admin login form with session handling.
	•	Simple UI for CRUD operations.

3. Deploy to Heroku
	•	Use Heroku PHP buildpack.
	•	Set up SQLite database in Heroku.
	•	Configure environment variables (if needed).