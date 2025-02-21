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

    // PUT /api/inventory/{id}
    public function update($id, $data) {
        try {
            $allowedFields = ['name', 'quantity', 'category', 'urgency', 'description'];
            $updates = array_intersect_key($data, array_flip($allowedFields));
            
            if (empty($updates)) {
                return ['error' => 'No valid fields to update'];
            }
            
            $sql = "UPDATE inventory SET ";
            $setParts = [];
            $params = [];
            
            foreach ($updates as $field => $value) {
                $setParts[] = "$field = :$field";
                $params[":$field"] = $value;
            }
            
            $sql .= implode(', ', $setParts);
            $sql .= " WHERE id = :id";
            $params[':id'] = $id;
            
            $stmt = $this->db->prepare($sql);
            $success = $stmt->execute($params);
            
            if ($success) {
                return ['success' => true];
            } else {
                return ['error' => 'Failed to update item'];
            }
        } catch (PDOException $e) {
            error_log("Error updating inventory item: " . $e->getMessage());
            return ['error' => 'Database error occurred'];
        }
    }
} 