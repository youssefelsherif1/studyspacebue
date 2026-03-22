using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using StudySpaceApi.Models;

namespace StudySpaceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly string _connectionString;

        public RoomsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") 
                ?? configuration["DefaultConnection"] 
                ?? string.Empty;
        }

        [HttpGet]
        public IActionResult GetRooms()
        {
            if (string.IsNullOrEmpty(_connectionString)) 
                return StatusCode(500, new { Error = "Connection string 'DefaultConnection' is missing from Azure configuration." });

            var rooms = new List<Room>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                connection.Open();
                
                var query = "SELECT RoomID, RoomName, Capacity, PricePerHour, IsActive FROM Rooms";
                using var command = new SqlCommand(query, connection);
                using var reader = command.ExecuteReader();
                
                while (reader.Read())
                {
                    bool isActive = reader.GetBoolean(4);
                    rooms.Add(new Room
                    {
                        Id = reader.GetInt32(0),
                        Name = reader.GetString(1),
                        Type = "Study Room",
                        Capacity = reader.GetInt32(2),
                        PricePerHour = reader.GetDecimal(3),
                        Status = isActive ? "available" : "unavailable",
                        HasPc = false,
                        HasWhiteboard = false,
                        HasMonitor = false,
                        HasAc = false,
                        ImageUrl = string.Empty
                    });
                }
                
                return Ok(rooms);
            }
            catch (Exception ex)
            {
                // In a production environment, you would log this exception.
                return StatusCode(500, new { Error = "Failed to fetch rooms from database", Details = ex.Message });
            }
        }
    }
}
