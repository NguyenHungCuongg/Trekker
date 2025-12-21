-- Thêm cột booked_guests vào bảng tours
ALTER TABLE tours ADD COLUMN IF NOT EXISTS booked_guests INTEGER DEFAULT 0;

-- Thêm cột booked_rooms vào bảng room_types
ALTER TABLE room_types ADD COLUMN IF NOT EXISTS booked_rooms INTEGER DEFAULT 0;

-- Thêm cột room_type_id vào bảng bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS room_type_id INTEGER;

-- Thêm constraint để đảm bảo số lượng không âm
ALTER TABLE tours ADD CONSTRAINT check_booked_guests_non_negative CHECK (booked_guests >= 0);
ALTER TABLE room_types ADD CONSTRAINT check_booked_rooms_non_negative CHECK (booked_rooms >= 0);

