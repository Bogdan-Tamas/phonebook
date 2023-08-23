namespace PhoneBook.API.Models.DTO
{
    public class ContactDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Organization { get; set; }
    }
}
