using PhoneBook.API.Models.Domain;
using PhoneBook.API.Models.DTO;
using PhoneBook.API.Repositories.Interface;

namespace PhoneBook.API.Repositories.Implementation
{
    public class UtilityService : IUtilityService
    {

        public ContactDto mapToDto(Contact contact)
        {
            return new ContactDto
            {
                Id = contact.Id,
                Name = contact.Name,
                PhoneNumber = contact.PhoneNumber,
                Organization = contact.Organization,
                Email = contact.Email
            };
        }

        public Contact mapToContact(ContactDto contactDto)
        {
            return new Contact
            {
                Id = contactDto.Id,
                Name = contactDto.Name,
                PhoneNumber = contactDto.PhoneNumber,
                Organization = contactDto.Organization,
                Email = contactDto.Email
            };
        }
    }
}
