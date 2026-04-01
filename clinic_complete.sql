-- ============================================
-- CLINIC MANAGEMENT SYSTEM - SQL QUERIES
-- ============================================

-- ============================================
-- 1. DATABASE CREATION
-- ============================================

DROP DATABASE IF EXISTS clinic_db;
CREATE DATABASE clinic_db;
USE clinic_db;

-- ============================================
-- 2. TABLE CREATION
-- ============================================

-- Users Table (for authentication)
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Doctors Table
CREATE TABLE doctors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_specialization (specialization),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Patients Table
CREATE TABLE patients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    age INT,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Appointments Table
CREATE TABLE appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    date VARCHAR(20) NOT NULL,
    time VARCHAR(20) NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    INDEX idx_patient (patient_id),
    INDEX idx_doctor (doctor_id),
    INDEX idx_date (date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 3. SAMPLE DATA INSERTION
-- ============================================

-- Insert Admin and User accounts
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@clinic.com', 'admin123', 'ADMIN'),
('john_doe', 'john@example.com', 'user123', 'USER'),
('jane_smith', 'jane@example.com', 'user123', 'USER');

-- Insert Doctors
INSERT INTO doctors (name, specialization, email, phone) VALUES
('Dr. Sarah Johnson', 'Cardiologist', 'sarah.johnson@clinic.com', '+1-555-0101'),
('Dr. Michael Chen', 'Neurologist', 'michael.chen@clinic.com', '+1-555-0102'),
('Dr. Emily Williams', 'Pediatrician', 'emily.williams@clinic.com', '+1-555-0103'),
('Dr. David Brown', 'Orthopedic', 'david.brown@clinic.com', '+1-555-0104'),
('Dr. Lisa Anderson', 'Dermatologist', 'lisa.anderson@clinic.com', '+1-555-0105'),
('Dr. Robert Taylor', 'General Physician', 'robert.taylor@clinic.com', '+1-555-0106');

-- Insert Patients
INSERT INTO patients (name, email, phone, age, address) VALUES
('Alice Cooper', 'alice.cooper@email.com', '+1-555-1001', 32, '123 Main St, New York, NY'),
('Bob Martin', 'bob.martin@email.com', '+1-555-1002', 45, '456 Oak Ave, Los Angeles, CA'),
('Carol White', 'carol.white@email.com', '+1-555-1003', 28, '789 Pine Rd, Chicago, IL'),
('Daniel Green', 'daniel.green@email.com', '+1-555-1004', 55, '321 Elm St, Houston, TX'),
('Eva Black', 'eva.black@email.com', '+1-555-1005', 38, '654 Maple Dr, Phoenix, AZ'),
('Frank Miller', 'frank.miller@email.com', '+1-555-1006', 42, '987 Cedar Ln, Philadelphia, PA'),
('Grace Lee', 'grace.lee@email.com', '+1-555-1007', 29, '147 Birch Ct, San Antonio, TX'),
('Henry Davis', 'henry.davis@email.com', '+1-555-1008', 51, '258 Spruce Way, San Diego, CA');

-- Insert Appointments
INSERT INTO appointments (patient_id, doctor_id, date, time, status, notes) VALUES
(1, 1, '2024-02-15', '09:00', 'CONFIRMED', 'Regular checkup'),
(2, 2, '2024-02-15', '10:30', 'CONFIRMED', 'Follow-up consultation'),
(3, 3, '2024-02-16', '11:00', 'PENDING', 'Child vaccination'),
(4, 4, '2024-02-16', '14:00', 'CONFIRMED', 'Knee pain assessment'),
(5, 5, '2024-02-17', '09:30', 'PENDING', 'Skin rash examination'),
(6, 6, '2024-02-17', '15:00', 'CONFIRMED', 'General health checkup'),
(7, 1, '2024-02-18', '10:00', 'PENDING', 'Heart monitoring'),
(8, 2, '2024-02-18', '13:30', 'CANCELLED', 'Patient cancelled'),
(1, 3, '2024-02-19', '11:30', 'COMPLETED', 'Completed successfully'),
(2, 4, '2024-02-19', '16:00', 'COMPLETED', 'Treatment completed');

-- ============================================
-- 4. COMMON QUERIES
-- ============================================

-- Get all doctors with their specializations
SELECT id, name, specialization, email, phone 
FROM doctors 
ORDER BY name;

-- Get all patients
SELECT id, name, email, phone, age, address 
FROM patients 
ORDER BY name;

-- Get all appointments with patient and doctor details
SELECT 
    a.id,
    p.name AS patient_name,
    d.name AS doctor_name,
    d.specialization,
    a.date,
    a.time,
    a.status,
    a.notes
FROM appointments a
JOIN patients p ON a.patient_id = p.id
JOIN doctors d ON a.doctor_id = d.id
ORDER BY a.date DESC, a.time;

-- Get appointments for a specific patient (patient_id = 1)
SELECT 
    a.id,
    d.name AS doctor_name,
    d.specialization,
    a.date,
    a.time,
    a.status,
    a.notes
FROM appointments a
JOIN doctors d ON a.doctor_id = d.id
WHERE a.patient_id = 1
ORDER BY a.date DESC;

-- Get appointments for a specific doctor (doctor_id = 1)
SELECT 
    a.id,
    p.name AS patient_name,
    p.email,
    p.phone,
    a.date,
    a.time,
    a.status,
    a.notes
FROM appointments a
JOIN patients p ON a.patient_id = p.id
WHERE a.doctor_id = 1
ORDER BY a.date DESC;

-- Get today's appointments
SELECT 
    a.id,
    p.name AS patient_name,
    d.name AS doctor_name,
    a.time,
    a.status
FROM appointments a
JOIN patients p ON a.patient_id = p.id
JOIN doctors d ON a.doctor_id = d.id
WHERE a.date = CURDATE()
ORDER BY a.time;

-- Get pending appointments
SELECT 
    a.id,
    p.name AS patient_name,
    d.name AS doctor_name,
    a.date,
    a.time
FROM appointments a
JOIN patients p ON a.patient_id = p.id
JOIN doctors d ON a.doctor_id = d.id
WHERE a.status = 'PENDING'
ORDER BY a.date, a.time;

-- Search doctors by specialization
SELECT id, name, email, phone 
FROM doctors 
WHERE specialization LIKE '%Cardio%'
ORDER BY name;

-- Search patients by name
SELECT id, name, email, phone, age 
FROM patients 
WHERE name LIKE '%Alice%'
ORDER BY name;

-- ============================================
-- 5. ANALYTICS & REPORTS
-- ============================================

-- Count total doctors, patients, and appointments
SELECT 
    (SELECT COUNT(*) FROM doctors) AS total_doctors,
    (SELECT COUNT(*) FROM patients) AS total_patients,
    (SELECT COUNT(*) FROM appointments) AS total_appointments,
    (SELECT COUNT(*) FROM appointments WHERE status = 'PENDING') AS pending_appointments;

-- Appointments count by doctor
SELECT 
    d.id,
    d.name AS doctor_name,
    d.specialization,
    COUNT(a.id) AS total_appointments,
    SUM(CASE WHEN a.status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed,
    SUM(CASE WHEN a.status = 'PENDING' THEN 1 ELSE 0 END) AS pending,
    SUM(CASE WHEN a.status = 'CANCELLED' THEN 1 ELSE 0 END) AS cancelled
FROM doctors d
LEFT JOIN appointments a ON d.id = a.doctor_id
GROUP BY d.id, d.name, d.specialization
ORDER BY total_appointments DESC;

-- Appointments count by patient
SELECT 
    p.id,
    p.name AS patient_name,
    p.email,
    COUNT(a.id) AS total_appointments,
    SUM(CASE WHEN a.status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed,
    SUM(CASE WHEN a.status = 'PENDING' THEN 1 ELSE 0 END) AS pending
FROM patients p
LEFT JOIN appointments a ON p.id = a.patient_id
GROUP BY p.id, p.name, p.email
ORDER BY total_appointments DESC;

-- Appointments by status
SELECT 
    status,
    COUNT(*) AS count
FROM appointments
GROUP BY status
ORDER BY count DESC;

-- Appointments by date (last 30 days)
SELECT 
    date,
    COUNT(*) AS appointment_count
FROM appointments
WHERE date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY date
ORDER BY date DESC;

-- Most popular specializations
SELECT 
    d.specialization,
    COUNT(a.id) AS appointment_count
FROM doctors d
LEFT JOIN appointments a ON d.id = a.doctor_id
GROUP BY d.specialization
ORDER BY appointment_count DESC;

-- Patient age distribution
SELECT 
    CASE 
        WHEN age < 18 THEN 'Under 18'
        WHEN age BETWEEN 18 AND 30 THEN '18-30'
        WHEN age BETWEEN 31 AND 50 THEN '31-50'
        WHEN age > 50 THEN 'Over 50'
        ELSE 'Unknown'
    END AS age_group,
    COUNT(*) AS patient_count
FROM patients
GROUP BY age_group
ORDER BY patient_count DESC;

-- ============================================
-- 6. UPDATE QUERIES
-- ============================================

-- Update appointment status
UPDATE appointments 
SET status = 'CONFIRMED' 
WHERE id = 1;

-- Update doctor information
UPDATE doctors 
SET phone = '+1-555-9999', email = 'new.email@clinic.com' 
WHERE id = 1;

-- Update patient information
UPDATE patients 
SET age = 33, phone = '+1-555-8888' 
WHERE id = 1;

-- Cancel appointment
UPDATE appointments 
SET status = 'CANCELLED', notes = 'Cancelled by patient' 
WHERE id = 8;

-- ============================================
-- 7. DELETE QUERIES
-- ============================================

-- Delete a specific appointment
-- DELETE FROM appointments WHERE id = 10;

-- Delete a patient (will cascade delete their appointments)
-- DELETE FROM patients WHERE id = 8;

-- Delete a doctor (will cascade delete their appointments)
-- DELETE FROM doctors WHERE id = 6;

-- ============================================
-- 8. STORED PROCEDURES
-- ============================================

-- Procedure to book an appointment
DELIMITER //
CREATE PROCEDURE BookAppointment(
    IN p_patient_id BIGINT,
    IN p_doctor_id BIGINT,
    IN p_date VARCHAR(20),
    IN p_time VARCHAR(20),
    IN p_notes TEXT
)
BEGIN
    INSERT INTO appointments (patient_id, doctor_id, date, time, status, notes)
    VALUES (p_patient_id, p_doctor_id, p_date, p_time, 'PENDING', p_notes);
    
    SELECT LAST_INSERT_ID() AS appointment_id;
END //
DELIMITER ;

-- Procedure to get doctor's schedule for a specific date
DELIMITER //
CREATE PROCEDURE GetDoctorSchedule(
    IN p_doctor_id BIGINT,
    IN p_date VARCHAR(20)
)
BEGIN
    SELECT 
        a.id,
        a.time,
        p.name AS patient_name,
        p.phone,
        a.status,
        a.notes
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    WHERE a.doctor_id = p_doctor_id 
    AND a.date = p_date
    ORDER BY a.time;
END //
DELIMITER ;

-- ============================================
-- 9. USAGE EXAMPLES
-- ============================================

-- Call stored procedure to book appointment
-- CALL BookAppointment(1, 2, '2024-02-20', '10:00', 'Regular checkup');

-- Call stored procedure to get doctor's schedule
-- CALL GetDoctorSchedule(1, '2024-02-15');

-- ============================================
-- 10. VIEWS FOR COMMON QUERIES
-- ============================================

-- View for appointment details
CREATE VIEW appointment_details AS
SELECT 
    a.id,
    a.date,
    a.time,
    a.status,
    a.notes,
    p.id AS patient_id,
    p.name AS patient_name,
    p.email AS patient_email,
    p.phone AS patient_phone,
    d.id AS doctor_id,
    d.name AS doctor_name,
    d.specialization,
    d.email AS doctor_email
FROM appointments a
JOIN patients p ON a.patient_id = p.id
JOIN doctors d ON a.doctor_id = d.id;

-- Use the view
SELECT * FROM appointment_details WHERE status = 'PENDING';

-- ============================================
-- END OF SQL QUERIES
-- ============================================
