using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using StudySpaceApi.Models;

namespace StudySpaceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly string _connectionString;

        public BookingsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") 
                ?? configuration["DefaultConnection"] 
                ?? string.Empty;
        }

        [HttpGet]
        public IActionResult GetUserBookings([FromQuery] int userId)
        {
            if (string.IsNullOrEmpty(_connectionString)) 
                return StatusCode(500, new { Error = "Connection string 'DefaultConnection' is missing from Azure configuration." });

            var bookings = new List<object>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                connection.Open();
                
                var query = @"
                    SELECT r.RoomName, b.StartTime, b.EndTime, b.Status, b.PaymentID
                    FROM Bookings b
                    JOIN Rooms r ON b.RoomID = r.RoomID
                    WHERE b.UserID = @UserId
                    ORDER BY b.StartTime DESC";
                    
                using var command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@UserId", userId);
                
                using var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    DateTime start = reader.GetDateTime(1);
                    DateTime end = reader.GetDateTime(2);
                    bookings.Add(new
                    {
                        Id = new Random().Next(1000, 9999),
                        RoomName = reader.GetString(0),
                        BookingDate = start.ToString("yyyy-MM-dd"),
                        StartTime = start.ToString(@"hh\:mm"),
                        EndTime = end.ToString(@"hh\:mm"),
                        Status = reader.GetString(3),
                        Amount = 0m,
                        QrCode = reader.IsDBNull(4) ? null : "QR123"
                    });
                }
                
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "Database fetch failed", Details = ex.Message });
            }
        }

        [HttpPost]
        public IActionResult CreateBooking([FromBody] Booking request)
        {
            if (string.IsNullOrEmpty(_connectionString)) 
                return StatusCode(500, new { Error = "Connection string 'DefaultConnection' is missing from Azure configuration." });

            try
            {
                using var connection = new SqlConnection(_connectionString);
                connection.Open();
                
                var query = @"
                    INSERT INTO Bookings (UserID, RoomID, StartTime, EndTime, Status)
                    VALUES (@UserId, @RoomId, @StartTime, @EndTime, @Status);";
                    
                using var command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@UserId", request.UserId);
                command.Parameters.AddWithValue("@RoomId", request.RoomId);
                
                DateTime startDateTime = request.BookingDate.Date + request.StartTime;
                DateTime endDateTime = request.BookingDate.Date + request.EndTime;
                
                command.Parameters.AddWithValue("@StartTime", startDateTime);
                command.Parameters.AddWithValue("@EndTime", endDateTime);
                command.Parameters.AddWithValue("@Status", request.Status ?? "pending_payment");
                
                command.ExecuteNonQuery();
                request.Id = new Random().Next(1000, 9999);
                
                return CreatedAtAction(nameof(GetUserBookings), new { userId = request.UserId }, request);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "Failed to create booking", Details = ex.Message });
            }
        }
    }
}
