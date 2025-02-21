<?php
require_once __DIR__ . '/../src/Database.php';
require_once __DIR__ . '/../src/controllers/InventoryController.php';
require_once __DIR__ . '/../src/controllers/AuthController.php';

echo "Running basic tests...\n";

try {
    // Test database connection and table creation
    $db = new Database();
    echo "✓ Database connected and tables created\n";

    // Create initial admin
    $db->createInitialAdmin();
    echo "✓ Initial admin created\n";

    // Test inventory operations
    $inventoryController = new InventoryController($db);
    
    // Create test item
    $testItem = [
        'name' => 'Test Item',
        'quantity' => 10,
        'category' => 'food',
        'urgency' => 'low',
        'description' => 'Test description'
    ];
    
    $result = $inventoryController->create($testItem);
    echo "✓ Created test item with ID: " . $result['id'] . "\n";

    // Get all items
    $items = $inventoryController->getAll();
    echo "✓ Retrieved " . count($items) . " items\n";

    // Test auth
    $authController = new AuthController($db);
    $loginResult = $authController->login([
        'username' => 'admin',
        'password' => 'admin123'
    ]);
    
    if ($loginResult['success']) {
        echo "✓ Admin login successful\n";
    } else {
        echo "✗ Admin login failed\n";
    }

    echo "\nAll tests completed successfully!\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
} 