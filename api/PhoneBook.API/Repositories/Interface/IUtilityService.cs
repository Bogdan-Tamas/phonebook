using PhoneBook.API.Models.Domain;
using PhoneBook.API.Models.DTO;

namespace PhoneBook.API.Repositories.Interface
{
    public interface IUtilityService
    {
        ContactDto mapToDto(Contact contact);
        Contact mapToContact(ContactDto contactDto);
    }
}
