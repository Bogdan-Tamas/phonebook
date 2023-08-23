using PhoneBook.API.Models.Domain;

namespace PhoneBook.API.Repositories.Interface
{
    public interface IContactRepository
    {
        Task<Contact> CreateAsync(Contact contact);
        ICollection<Contact> GetContacts();
        Contact GetContact(int id);
        Contact GetContactByPhoneNumber(string phoneNumber);
        Contact GetContactByName(string name);
        bool ContactExistsById(int id);
        bool ContactExistsByPhoneNumber(string phoneNumber);
        bool ContactExistsByName(string name);
        bool UpdateContact(Contact contact);
        bool Save();
    }
}
