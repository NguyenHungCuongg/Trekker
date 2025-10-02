-- Trekker Database
-- users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

-- locations table
CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE destinations (
    destination_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location_id INT REFERENCES locations(location_id) ON DELETE CASCADE
);

-- tours table
CREATE TABLE tours (
    tour_id SERIAL PRIMARY KEY,
    location_id INT REFERENCES locations(location_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration INT,
    price DOUBLE PRECISION,
    rating FLOAT CHECK (
        rating BETWEEN 0
        AND 5
    ),
    start_date DATE,
    end_date DATE,
    max_guests INT
);

CREATE TABLE tour_destination (
    tour_id INT REFERENCES tours(tour_id) ON DELETE CASCADE,
    destination_id INT REFERENCES destinations(destination_id) ON DELETE CASCADE,
    constraint pk_ord_des PRIMARY KEY (tour_id, destination_id)
)

-- accommodations table
CREATE TABLE accommodations (
    accommodation_id SERIAL PRIMARY KEY,
    location_id INT REFERENCES locations(location_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    rating FLOAT CHECK (
        rating BETWEEN 0
        AND 5
    ),
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT
);

-- accommodationImages table
CREATE TABLE accommodation_images (
    image_id SERIAL PRIMARY KEY,
    accommodation_id INT REFERENCES accommodations(accommodation_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

-- roomTypes table
CREATE TABLE room_types (
    room_type_id SERIAL PRIMARY KEY,
    accommodation_id INT REFERENCES accommodations(accommodation_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    capacity INT,
    price DOUBLE PRECISION,
    amenities TEXT,
    description TEXT
);

-- bookings table
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');

CREATE TYPE service_type AS ENUM ('tour', 'accommodation');

CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    service_type service_type NOT NULL,
    service_id INT NOT NULL,
    start_date DATE,
    end_date DATE,
    quantity INT,
    total_price DOUBLE PRECISION,
    status booking_status DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- payments table
CREATE TYPE payment_method AS ENUM ('credit_card', 'paypal', 'bank_transfer', 'cash');

CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed');

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(booking_id) ON DELETE CASCADE,
    amount DOUBLE PRECISION NOT NULL,
    method payment_method,
    status payment_status DEFAULT 'pending',
    paid_at TIMESTAMP
);

-- invoices table
CREATE TABLE invoices (
    invoice_id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(booking_id) ON DELETE CASCADE,
    total_amount DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    details TEXT
);

-- reviews table
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    service_type service_type NOT NULL,
    service_id INT NOT NULL,
    rating FLOAT CHECK (
        rating BETWEEN 0
        AND 5
    ),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_bookings_user_id ON bookings(user_id);

CREATE INDEX idx_payments_booking_id ON payments(booking_id);

CREATE INDEX idx_invoices_booking_id ON invoices(booking_id);

CREATE INDEX idx_reviews_user_id ON reviews(user_id);
