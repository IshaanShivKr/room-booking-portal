<?php
class Room extends Dbh {
    public function getAllRooms() {
        $sql = "SELECT * FROM rooms";
        $stmt = $this->connect()->query($sql);
        return $stmt->fetchAll();
    }

    public function getRoomByID($id) {
        $sql = "SELECT * FROM rooms WHERE id = ?";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
}