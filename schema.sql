-- SQL Server Script for Study Space Booking System
-- Requirement: 5 related tables, 1 weak entity, relationships via PK/FK, 4+ tuples per table.

CREATE DATABASE StudySpaceDB;
GO
USE StudySpaceDB;
GO

-- 1. USERS Table
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(150) NOT NULL UNIQUE,
    Role VARCHAR(50) NOT NULL, -- e.g., 'Student', 'Instructor', 'Admin', 'Receptionist'
    Points INT DEFAULT 0,
    University VARCHAR(150) NULL
);

-- 2. ROOMS Table
CREATE TABLE Rooms (
    RoomID INT IDENTITY(1,1) PRIMARY KEY,
    RoomName VARCHAR(100) NOT NULL,
    Capacity INT NOT NULL,
    PricePerHour DECIMAL(10, 2) NOT NULL,
    IsActive BIT DEFAULT 1
);

-- 3. PAYMENTS Table
CREATE TABLE Payments (
    PaymentID INT IDENTITY(1,1) PRIMARY KEY,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentDate DATETIME NOT NULL,
    Method VARCHAR(50) -- e.g., 'Credit Card', 'Points'
);

-- 4. SUBSCRIPTIONS Table
CREATE TABLE Subscriptions (
    SubscriptionID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    PlanName VARCHAR(100) NOT NULL,
    ExpiryDate DATETIME NOT NULL,
    CONSTRAINT FK_Subscriptions_Users FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- 5. BOOKINGS Table (Weak Entity)
-- Dependant on Users and Rooms for identification. PK is composite (UserID, RoomID, StartTime)
CREATE TABLE Bookings (
    UserID INT NOT NULL,
    RoomID INT NOT NULL,
    StartTime DATETIME NOT NULL,
    EndTime DATETIME NOT NULL,
    PaymentID INT NULL, -- Can be NULL before payment is made
    Status VARCHAR(50) NOT NULL, -- 'pending_payment', 'confirmed', 'cancelled'
    CONSTRAINT PK_Bookings PRIMARY KEY CLUSTERED (UserID, RoomID, StartTime),
    CONSTRAINT FK_Bookings_Users FOREIGN KEY (UserID) REFERENCES Users(UserID),
    CONSTRAINT FK_Bookings_Rooms FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID),
    CONSTRAINT FK_Bookings_Payments FOREIGN KEY (PaymentID) REFERENCES Payments(PaymentID)
);
GO

-- Insert Initial Sample Data (Minimum 4 rows per table)

-- Seed Users
INSERT INTO Users (Name, Email, Role, Points, University) VALUES 
('Alice Smith', 'alice@student.test', 'Student', 150, 'State University'),
('Bob Jones', 'bob@student.test', 'Student', 20, 'Tech Institute'),
('Dr. Carol', 'carol@instructor.test', 'Instructor', 500, NULL),
('Admin Dave', 'dave@admin.test', 'Admin', 0, NULL),
('Recp Eve', 'eve@reception.test', 'Receptionist', 0, NULL);

-- Seed Rooms
INSERT INTO Rooms (RoomName, Capacity, PricePerHour, IsActive) VALUES 
('Quiet Zone 1', 1, 150.00, 1),
('Quiet Zone 2', 1, 150.00, 1),
('Group Room A', 4, 450.00, 1),
('Seminar Room', 20, 550.00, 1),
('Instructor Office', 2, 0.00, 1);

-- Seed Payments
INSERT INTO Payments (Amount, PaymentDate, Method) VALUES 
(450.00, '2026-03-21 09:00:00', 'Credit Card'),
(150.00, '2026-03-21 10:30:00', 'Points'),
(550.00, '2026-03-22 08:00:00', 'Credit Card'),
(0.00, '2026-03-20 14:00:00', 'Free Sub');

-- Seed Subscriptions
INSERT INTO Subscriptions (UserID, PlanName, ExpiryDate) VALUES 
(1, 'Monthly Student', '2026-04-21 23:59:59'),
(2, 'Daily Pass', '2026-03-21 23:59:59'),
(3, 'Teaching Hours Package', '2026-12-31 23:59:59'),
(1, 'Rewards Tier 1', '2027-01-01 23:59:59');

-- Seed Bookings
-- Using exact matches from Users, Rooms, Payments
INSERT INTO Bookings (UserID, RoomID, StartTime, EndTime, PaymentID, Status) VALUES 
(1, 1, '2026-03-22 10:00:00', '2026-03-22 12:00:00', 1, 'confirmed'),
(2, 2, '2026-03-22 11:00:00', '2026-03-22 12:00:00', 2, 'confirmed'),
(3, 4, '2026-03-23 09:00:00', '2026-03-23 11:00:00', 3, 'confirmed'),
(1, 3, '2026-03-24 14:00:00', '2026-03-24 16:00:00', NULL, 'pending_payment'), -- Demonstrates NULL
(2, 1, '2026-03-25 15:00:00', '2026-03-25 16:00:00', NULL, 'pending_payment');

GO

-- =========================================================================================
-- ADVANCED QUERYING REQUIREMENTS
-- =========================================================================================

-- 1. Filtering & Sorting Query 1
-- Objective: Find all available rooms (IsActive = 1) that can hold at least 3 people, ordered by cheapest price.
SELECT RoomName, Capacity, PricePerHour 
FROM Rooms 
WHERE Capacity >= 3 AND IsActive = 1 
ORDER BY PricePerHour ASC;

-- 2. Filtering & Sorting Query 2
-- Objective: Find all confirmed bookings starting after a specific date, sorted chronologically.
SELECT UserID, RoomID, StartTime, EndTime 
FROM Bookings 
WHERE Status = 'confirmed' AND StartTime > '2026-03-21' 
ORDER BY StartTime ASC;

-- 3. Aggregate Function Query 1
-- Objective: Calculate the total (SUM) points accumulated by all 'Student' role users.
SELECT SUM(Points) AS TotalStudentPoints 
FROM Users 
WHERE Role = 'Student';

-- 4. Aggregate Function Query 2
-- Objective: Find the average (AVG) price per hour across all active rooms.
SELECT AVG(PricePerHour) AS AverageRoomPrice 
FROM Rooms 
WHERE IsActive = 1;

-- 5. Aggregate Function Query 3
-- Objective: Count the total number of bookings (COUNT) grouped by Status.
SELECT Status, COUNT(*) AS NumberOfBookings 
FROM Bookings 
GROUP BY Status;

-- 6. Joins Query
-- Objective: Perform an INNER JOIN to show User Names, Room Names, and Booking times.
SELECT u.Name, r.RoomName, b.StartTime, b.EndTime, b.Status
FROM Bookings b
INNER JOIN Users u ON b.UserID = u.UserID
INNER JOIN Rooms r ON b.RoomID = r.RoomID;

-- 7. Null Handling Query
-- Objective: Demonstrate IS NULL to find Bookings that are awaiting payment (PaymentID IS NULL).
SELECT u.Name, b.RoomID, b.StartTime, b.Status
FROM Bookings b
INNER JOIN Users u ON b.UserID = u.UserID
WHERE b.PaymentID IS NULL;

GO
