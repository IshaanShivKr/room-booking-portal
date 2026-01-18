<?php
require_once __DIR__ . '/../include/autoload.php';

class BookingController {
    private $bookingModel;

    public function __construct() {
        $this->bookingModel = new Booking();
    }

    public function requestBooking($userId, $roomId, $bookingDate, $startTime, $endTime, $purpose) {
        header('Content-Type: application/json');

        if (!$this->bookingModel->isRoomAvailable($roomId, $bookingDate, $startTime, $endTime)) {
            echo json_encode(['success' => false, 'message' => 'Room is not available at the requested time.']);
            return;
        }

        $success = $this->bookingModel->createBooking($userId, $roomId, $bookingDate, $startTime, $endTime, $purpose);

        if ($success) {
            echo json_encode(['success' => true, 'message' => 'Booking request submitted.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to create booking.']);
        }
    }

    public function viewUserBookings($userId) {
        header('Content-Type: application/json');
        $bookings = $this->bookingModel->getUserBookings($userId);
        echo json_encode($bookings);
    }

    public function viewAllBookings() {
        header('Content-Type: application/json');
        $bookings = $this->bookingModel->getAllBookings();
        echo json_encode($bookings);
    }

    public function changeBookingStatus($bookingId, $status) {
        header('Content-Type: application/json');

        if (!in_array($status, ['approved', 'rejected'])) {
            echo json_encode(['success' => false, 'message' => 'Invalid status']);
            return;
        }

        $success = $this->bookingModel->updateBookingStatus($bookingId, $status);

        if ($success) {
            echo json_encode(['success' => true, 'message' => 'Booking status updated']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update status']);
        }
    }
}