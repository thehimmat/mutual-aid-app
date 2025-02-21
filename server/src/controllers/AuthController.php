<?php
class AuthController {
    private $db;

    public function __construct($database) {
        $this->db = $database->getConnection();
    }

    // POST /api/admin/login
    public function login($data) {
        if (!isset($data['username']) || !isset($data['password'])) {
            http_response_code(400);
            return ['error' => 'Username and password required'];
        }

        $stmt = $this->db->prepare("SELECT * FROM admins WHERE username = :username");
        $stmt->execute([':username' => $data['username']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($data['password'], $user['password'])) {
            // For now, just return success. We'll add JWT later
            return [
                'success' => true,
                'message' => 'Login successful',
                'token' => 'temporary-token' // Placeholder for JWT
            ];
        }

        http_response_code(401);
        return ['error' => 'Invalid credentials'];
    }

    // Temporary simple validation
    public function validateToken() {
        // For now, just return true
        // We'll implement proper JWT validation later
        return true;
    }
} 