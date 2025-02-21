<?php

class Database {
    private $db;

    public function __construct() {
        try {
            $this->db = new PDO('sqlite:' . __DIR__ . '/../../db/inventory.sqlite');
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->createTables();
        } catch(PDOException $e) {
            throw new Exception("Connection failed: " . $e->getMessage());
        }
    }

    private function createTables() {
        $this->db->exec("CREATE TABLE IF NOT EXISTS inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            category TEXT NOT NULL,
            urgency TEXT NOT NULL,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");

        $this->db->exec("CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
    }

    public function getConnection() {
        return $this->db;
    }

    public function createInitialAdmin() {
        try {
            $stmt = $this->db->prepare("SELECT COUNT(*) FROM admins");
            $stmt->execute();
            $count = $stmt->fetchColumn();

            if ($count === 0) {
                $stmt = $this->db->prepare("
                    INSERT INTO admins (username, password)
                    VALUES (:username, :password)
                ");

                $stmt->execute([
                    ':username' => 'admin',
                    ':password' => password_hash('admin123', PASSWORD_DEFAULT)
                ]);
            }
        } catch(PDOException $e) {
            throw new Exception("Failed to create initial admin: " . $e->getMessage());
        }
    }
} 