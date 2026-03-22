namespace StudySpaceApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = "Student";
        public int Points { get; set; } = 0;
        public string? University { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int Capacity { get; set; }
        public decimal PricePerHour { get; set; }
        public string Status { get; set; } = "available";
        public bool HasPc { get; set; } = false;
        public bool HasWhiteboard { get; set; } = false;
        public bool HasMonitor { get; set; } = false;
        public bool HasAc { get; set; } = false;
        public string ImageUrl { get; set; } = string.Empty;
    }

    public class Booking
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RoomId { get; set; }
        public DateTime BookingDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string Status { get; set; } = "pending";
        public decimal TotalAmount { get; set; }
        public string? QrCode { get; set; }
    }

    public class Payment
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public string Status { get; set; } = "completed";
        public DateTime PaymentDate { get; set; }
    }
}
