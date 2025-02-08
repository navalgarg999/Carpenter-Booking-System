-- Table 1: Carpenters
CREATE TABLE carpenters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Table 2: Slots
CREATE TABLE slots (
    id SERIAL PRIMARY KEY,
    carpenter_id INT REFERENCES carpenters(id) ON DELETE CASCADE,
    slot_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE
);

-- Table 3: Bookings
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    carpenter_id INT REFERENCES carpenters(id) ON DELETE CASCADE,
    slot_id INT REFERENCES slots(id) ON DELETE CASCADE,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('confirmed', 'cancelled')) DEFAULT 'confirmed',
    booked_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO carpenters (name) VALUES 
('John Carpenter'),
('Mike Wood'),
('Sarah Timber'),
('Emma Nails'),
('David Hammer');


-- Insert Available Slots for Each Carpenter
-- Each carpenter has 1-hour slots from 9 AM to 6 PM.
-- This will add 9 slots per carpenter from 9 AM to 6 PM.
DO $$ 
DECLARE 
    c RECORD;
    t TIME := '09:00:00';
BEGIN
    FOR c IN SELECT id FROM carpenters LOOP
        WHILE t < '18:00:00' LOOP
            INSERT INTO slots (carpenter_id, slot_time, is_available) 
            VALUES (c.id, t, TRUE);
            t := t + INTERVAL '1 hour';
        END LOOP;
        t := '09:00:00'; -- Reset time for the next carpenter
    END LOOP;
END $$;

select * from slots
-- FETCH Available Slots
SELECT s.id, c.name AS carpenter, s.slot_time 
FROM slots s
JOIN carpenters c ON s.carpenter_id = c.id
WHERE s.is_available = TRUE
ORDER BY s.slot_time;


-- BOOK a Slot
INSERT INTO bookings (carpenter_id, slot_id, user_name, user_email) 
VALUES (1, 5, 'Alice Johnson', 'alice@example.com');
UPDATE slots SET is_available = FALSE WHERE id = 5;
select * from bookings
-- Cancel a Slot
DELETE FROM bookings WHERE id = 2;
UPDATE slots SET is_available = TRUE WHERE id = 5;
