<?php

class Booking extends Dbh {
    public function createBooking($userId, $roomId, $bookingDate, $startTime, $endTime, $purpose) {
        $sql = "INSERT INTO bookings (user_id, room_id, booking_date, start_time, end_time, purpose, status)
                VALUES (?, ?, ?, ?, ?, ?, 'pending')";
        $stmt = $this->connect()->prepare($sql);
        return $stmt->execute([$userId, $roomId, $bookingDate, $startTime, $endTime, $purpose]);
    }

    public function isRoomAvailable($roomId, $bookingDate, $startTime, $endTime) {
        $sql = "SELECT COUNT(*) AS count FROM bookings
                WHERE room_id = ?
                AND booking_date = ?
                AND (
                    (start_time < ? AND end_time > ?) OR
                    (start_time < ? AND end_time > ?) OR
                    (start_time >= ? AND end_time <= ?)
                )";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute([$roomId, $bookingDate, $endTime, $endTime, $startTime, $startTime, $startTime, $endTime]);
        $result = $stmt->fetch();
        return $result['count'] == 0;
    }

    public function getUserBookings($userId) {
        $sql = "SELECT b.*, r.room_number, r.type, r.building_id
                FROM bookings b
                JOIN rooms r ON b.room_id = r.id
                WHERE b.user_id = ?
                ORDER BY b.booking_date DESC, b.start_time DESC";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute([$userId]);
        return $stmt->fetchAll();
    }

    public function getAllBookings() {
        $sql = "SELECT b.*, r.room_number, r.type, r.building_id, u.name AS user_name
                FROM bookings b
                JOIN rooms r ON b.room_id = r.id
                JOIN users u ON b.user_id = u.id
                ORDER BY b.booking_date DESC, b.start_time DESC";
        $stmt = $this->connect()->query($sql);
        return $stmt->fetchAll();
    }

    public function updateBookingStatus($bookingId, $status) {
        $sql = "UPDATE bookings SET status = ? WHERE id = ?";
        $stmt = $this->connect()->prepare($sql);
        return $stmt->execute([$status, $bookingId]);
    }
}