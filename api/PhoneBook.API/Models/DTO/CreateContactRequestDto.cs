namespace PhoneBook.API.Models.DTO
{
    public class CreateContactRequestDto
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Organization { get; set; }
    }
}
