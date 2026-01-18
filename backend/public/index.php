<?php

require_once __DIR__ . "/../include/autoload.php";
require_once __DIR__ . "/../controllers/BookingController.php";

$bookingController = new BookingController();
$action = $_GET['action'] ?? null;

switch ($action) {

    case 'requestBooking':
        if (!isset($_GET['user_id'], $_GET['room_id'], $_GET['booking_date'], $_GET['start_time'], $_GET['end_time'], $_GET['purpose'])) {
            echo json_encode(['success' => false, 'message' => 'Missing parameters']);
            break;
        }
        $bookingController->requestBooking(
            $_GET['user_id'],
            $_GET['room_id'],
            $_GET['booking_date'],
            $_GET['start_time'],
            $_GET['end_time'],
            $_GET['purpose']
        );
        break;

    case 'userBookings':
        if (!isset($_GET['user_id'])) {
            echo json_encode(['success' => false, 'message' => 'Missing user_id']);
            break;
        }
        $bookingController->viewUserBookings($_GET['user_id']);
        break;

    case 'allBookings':
        $bookingController->viewAllBookings();
        break;

    case 'changeStatus':
        if (!isset($_GET['booking_id'], $_GET['status'])) {
            echo json_encode(['success' => false, 'message' => 'Missing booking_id or status']);
            break;
        }
        $bookingController->changeBookingStatus($_GET['booking_id'], $_GET['status']);
        break;

    default:
        echo json_encode(['error' => 'Invalid action']);
}
