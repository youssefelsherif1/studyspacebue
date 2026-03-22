using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace StudySpaceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DatabaseController : ControllerBase
    {
        private readonly string _connectionString;

        public DatabaseController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") 
                                ?? configuration["DefaultConnection"]
                                ?? string.Empty;
        }

        // 1. Filtering & Sorting Query 1
        [HttpGet("rooms/available")]
        public IActionResult GetAvailableRooms()
        {
            if (string.IsNullOrEmpty(_connectionString)) return StatusCode(500, new { Error = "Missing DefaultConnection" });
            var result = new List<object>();
            using (var connection = new SqlConnection(_connectionString))
            {
                var query = "SELECT RoomName, Capacity, PricePerHour FROM Rooms WHERE Capacity >= 3 AND IsActive = 1 ORDER BY PricePerHour ASC;";
                using (var command = new SqlCommand(query, connection))
                {
                    try {
                        connection.Open();
                        using var reader = command.ExecuteReader();
                        while (reader.Read())
                        {
                            result.Add(new {
                                RoomName = reader.GetString(0),
                                Capacity = reader.GetInt32(1),
                                PricePerHour = reader.GetDecimal(2)
                            });
                        }
                    } catch (SqlException ex) { return StatusCode(500, ex.Message); }
                }
            }
            return Ok(result);
        }

        // 2. Filtering & Sorting Query 2
        [HttpGet("bookings/recent")]
        public IActionResult GetRecentBookings()
        {
            if (string.IsNullOrEmpty(_connectionString)) return StatusCode(500, new { Error = "Missing DefaultConnection" });
            var result = new List<object>();
            using (var connection = new SqlConnection(_connectionString))
            {
                var query = "SELECT UserID, RoomID, StartTime, EndTime FROM Bookings WHERE Status = 'confirmed' AND StartTime > '2026-03-21' ORDER BY StartTime ASC;";
                using (var command = new SqlCommand(query, connection))
                {
                    connection.Open();
                    using var reader = command.ExecuteReader();
                    while (reader.Read()) {
                        result.Add(new {
                            UserID = reader.GetInt32(0),
                            RoomID = reader.GetInt32(1),
                            StartTime = reader.GetDateTime(2),
                            EndTime = reader.GetDateTime(3)
                        });
                    }
                }
            }
            return Ok(result);
        }

        // 3. Aggregate Query 1
        [HttpGet("users/students/points")]
        public IActionResult GetTotalStudentPoints()
        {
            if (string.IsNullOrEmpty(_connectionString)) return StatusCode(500, new { Error = "Missing DefaultConnection" });
            using (var connection = new SqlConnection(_connectionString))
            {
                var query = "SELECT ISNULL(SUM(Points), 0) FROM Users WHERE Role = 'Student';";
                using (var command = new SqlCommand(query, connection))
                {
                    connection.Open();
                    var total = command.ExecuteScalar();
                    return Ok(new { TotalStudentPoints = total });
                }
            }
        }

        // 4. Aggregate Query 2
        [HttpGet("rooms/average-price")]
        public IActionResult GetAverageRoomPrice()
        {
            if (string.IsNullOrEmpty(_connectionString)) return StatusCode(500, new { Error = "Missing DefaultConnection" });
            using (var connection = new SqlConnection(_connectionString))
            {
                var query = "SELECT ISNULL(AVG(PricePerHour), 0) FROM Rooms WHERE IsActive = 1;";
                using (var command = new SqlCommand(query, connection))
                {
                    connection.Open();
                    var avg = command.ExecuteScalar();
                    return Ok(new { AverageRoomPrice = avg });
                }
            }
        }

        // 5. Aggregate Query 3
        [HttpGet("bookings/stats")]
        public IActionResult GetBookingStats()
        {
            if (string.IsNullOrEmpty(_connectionString)) return StatusCode(500, new { Error = "Missing DefaultConnection" });
            var result = new List<object>();
            using (var connection = new SqlConnection(_connectionString))
            {
                var query = "SELECT Status, COUNT(*) AS NumberOfBookings FROM Bookings GROUP BY Status;";
                using (var command = new SqlCommand(query, connection))
                {
                    connection.Open();
                    using var reader = command.ExecuteReader();
                    while (reader.Read()) {
                        result.Add(new {
                            Status = reader.GetString(0),
                            NumberOfBookings = reader.GetInt32(1)
                        });
                    }
                }
            }
            return Ok(result);
        }

        // 6. Joins Query
        [HttpGet("bookings/details")]
        public IActionResult GetBookingDetails()
        {
            if (string.IsNullOrEmpty(_connectionString)) return StatusCode(500, new { Error = "Missing DefaultConnection" });
            var result = new List<object>();
            using (var connection = new SqlConnection(_connectionString))
            {
                var query = @"
                    SELECT u.Name, r.RoomName, b.StartTime, b.EndTime, b.Status
                    FROM Bookings b
                    INNER JOIN Users u ON b.UserID = u.UserID
                    INNER JOIN Rooms r ON b.RoomID = r.RoomID;";
                using (var command = new SqlCommand(query, connection))
                {
                    connection.Open();
                    using var reader = command.ExecuteReader();
                    while (reader.Read()) {
                        result.Add(new {
                            Name = reader.GetString(0),
                            RoomName = reader.GetString(1),
                            StartTime = reader.GetDateTime(2),
                            EndTime = reader.GetDateTime(3),
                            Status = reader.GetString(4)
                        });
                    }
                }
            }
            return Ok(result);
        }

        // 7. Null Handling Query
        [HttpGet("bookings/unpaid")]
        public IActionResult GetUnpaidBookings()
        {
            if (string.IsNullOrEmpty(_connectionString)) return StatusCode(500, new { Error = "Missing DefaultConnection" });
            var result = new List<object>();
            using (var connection = new SqlConnection(_connectionString))
            {
                var query = @"
                    SELECT u.Name, b.RoomID, b.StartTime, b.Status
                    FROM Bookings b
                    INNER JOIN Users u ON b.UserID = u.UserID
                    WHERE b.PaymentID IS NULL;";
                using (var command = new SqlCommand(query, connection))
                {
                    connection.Open();
                    using var reader = command.ExecuteReader();
                    while (reader.Read()) {
                        result.Add(new {
                            Name = reader.GetString(0),
                            RoomID = reader.GetInt32(1),
                            StartTime = reader.GetDateTime(2),
                            Status = reader.GetString(3)
                        });
                    }
                }
            }
            return Ok(result);
        }
    }
}
