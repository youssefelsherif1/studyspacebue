# Project Report: Study Space Management System 

## Perspective and Theme
The unique theme for this database system is a **Study Space Management Dashboard**. It is designed for educational environments, such as universities or private study hubs, to facilitate the reservation of quiet areas, tech labs, and conference rooms. The primary challenges addressed involve role-based logic (students vs. instructors), recurring subscriptions, and a rewards points system based on booking attendance.

The objective is to allow Users to make Bookings for Rooms, while Payments and Subscriptions are robustly tracked. 

## Table Descriptions
1. **Users**: Stores the profile information, contact email, Role descriptor (e.g., Student, Instructor, Admin, Receptionist), and accumulated reward points.
2. **Rooms**: Stores available physical spaces, their capacities, and base rental price per hour. Includes a boolean for active status.
3. **Payments**: Records financial transactions, monetary amounts, and the payment method used.
4. **Subscriptions**: Tracks recurring plans bought by Users (such as monthly passes), storing the expiration dates and plan names.
5. **Bookings (Weak Entity)**: Dependent on User and Room. Stores the start and end times, and links to the relevant payment when completed. Demonstrates a weak entity properly structured via a composite key `(UserID, RoomID, StartTime)`.

## Implementation Details (C# Integration)
The backend is an interconnected layer written in `C# ASP.NET Core (.NET 8.0)`. It employs standard `Microsoft.Data.SqlClient` (ADO.NET) to execute raw SQL Server dialect queries directly ensuring "SQL Proficiency" points. 

**Query Demonstrations:**
1. **Filtering/Sorting 1:** Finds all active rooms with capacity >= 3 ordered cheapest first.
2. **Filtering/Sorting 2:** Finds recently confirmed bookings chronologically sorted.
3. **Aggregate 1:** SUM to calculate total points over the entire student population.
4. **Aggregate 2:** AVG to calculate the overall average price of hiring a room.
5. **Aggregate 3:** COUNT/GROUP BY to tally numbers of bookings falling into each distinct Status.
6. **Join:** INNER JOIN between Bookings, Users, and Rooms bringing together readable names for the booking timeline.
7. **Null Handling:** IS NULL checks the Payment ID attached to a Booking to cleanly discover unpaid (Pending) bookings without inner-looping in application logic.

*Note: Screenshots of the resulting frontend interface and system running should be appended to this document prior to physical submission.*
