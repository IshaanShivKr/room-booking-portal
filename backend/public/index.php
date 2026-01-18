<?php

require_once __DIR__ . "/../include/autoload.php";
require_once __DIR__ . "/../controllers/RoomController.php";

$roomController = new RoomController();

$action = $_GET['action'] ?? 'list';
$id = $_GET['id'] ?? null;

switch ($action) {
    case 'list':
        $roomController->listRooms();
        break;

    case 'view':
        if ($id) {
            $roomController->viewRoom($id);
        } else {
            echo json_encode(['error' => 'No room ID specified']);
        }
        break;

    default:
        echo json_encode(['error' => 'Invalid action']);
}
