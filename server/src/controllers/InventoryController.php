<?php
class InventoryController {
    private $db;

    public function __construct($database) {
        $this->db = $database->getConnection();
    }

    // GET /api/inventory
    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM inventory ORDER BY created_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // POST /api/inventory
    public function create($data) {
        $stmt = $this->db->prepare("
            INSERT INTO inventory (name, quantity, category, urgency, description)
            VALUES (:name, :quantity, :category, :urgency, :description)
        ");

        $stmt->execute([
            ':name' => $data['name'],
            ':quantity' => $data['quantity'],
            ':category' => $data['category'],
            ':urgency' => $data['urgency'],
            ':description' => $data['description'] ?? ''
        ]);

        return ['id' => $this->db->lastInsertId()];
    }

    // DELETE /api/inventory/{id}
    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM inventory WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return ['success' => true];
    }
} 