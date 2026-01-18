<?php
require_once __DIR__ . '/../include/autoload.php';

class RoomController {
    private $roomModel;

    public function __construct() {
        $this->roomModel = new Room();
    }

    public function listRooms() {
        $rooms = $this->roomModel->getAllRooms();
        header('Content-Type: application/json');
        echo json_encode($rooms);
    }

    public function viewRoom($id) {
        $room = $this->roomModel->getRoomByID($id);
        header('Content-Type: application/json');
        if ($room) {
            echo json_encode($room);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Room not found']);
        }
    }
}