<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once __DIR__ . '/../src/config.php';
require_once __DIR__ . '/../src/Database.php';
require_once __DIR__ . '/../src/controllers/InventoryController.php';
require_once __DIR__ . '/../src/controllers/AuthController.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Handle preflight requests
if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $db = new Database();
    $inventoryController = new InventoryController($db);
    $authController = new AuthController($db);

    if ($uri === '/api/inventory') {
        switch ($method) {
            case 'GET':
                echo json_encode($inventoryController->getAll());
                break;
            case 'POST':
                $data = json_decode(file_get_contents('php://input'), true);
                echo json_encode($inventoryController->create($data));
                break;
            default:
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
        }
    } elseif (preg_match('/\/api\/inventory\/(\d+)/', $uri, $matches)) {
        $id = $matches[1];
        if ($method === 'PUT') {
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode($inventoryController->update($id, $data));
        } elseif ($method === 'DELETE') {
            echo json_encode($inventoryController->delete($id));
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
    } elseif ($uri === '/api/admin/login') {
        if ($method === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode($authController->login($data));
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
} 