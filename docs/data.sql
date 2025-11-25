COPY locations (location_name, description, image)
FROM '/duong/dan/den/file/locations.csv'
DELIMITER ','
CSV
HEADER;

COPY destinations (destination_name,location_id,image)
FROM '/duong/dan/den/file/destinations.csv'
DELIMITER ','
CSV
HEADER;

COPY tours (location_id, name, duration, price, start_date, end_date, max_guests, description, rating, image)
FROM '/duong/dan/den/file/tours.csv'
DELIMITER ','
CSV
HEADER;

COPY accommodations (destination_id, name, description, rating, phone, email, address, image)
FROM '/duong/dan/den/file/accommodations.csv'
DELIMITER ','
CSV
HEADER;

COPY tour_destination (tour_id, destination_id)
FROM '/duong/dan/den/file/tour_destination.csv'
DELIMITER ','
CSV
HEADER;

COPY room_types (accommodation_id, name, capacity, quantity, price, discount_price, amenities, description, image)
FROM '/duong/dan/den/file/room_types.csv'
DELIMITER ','
CSV
HEADER;

TRUNCATE TABLE tours RESTART IDENTITY CASCADE;
TRUNCATE TABLE locations RESTART IDENTITY CASCADE;
TRUNCATE TABLE destinations RESTART IDENTITY CASCADE;
TRUNCATE TABLE accommodations RESTART IDENTITY CASCADE;
TRUNCATE TABLE tour_destination CASCADE;
TRUNCATE TABLE room_types RESTART IDENTITY CASCADE;

