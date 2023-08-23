using PhoneBook.API.Data;
using PhoneBook.API.Models.Domain;
using PhoneBook.API.Repositories.Interface;

namespace PhoneBook.API.Repositories.Implementation
{
    public class ContactRepository : IContactRepository
    {
        private readonly ApplicationDbContext context;

        public ContactRepository(ApplicationDbContext context)
        {
            this.context = context;
        }
        
        public bool ContactExistsById(int id)
        {
            return context.Contacts.Any(c => c.Id == id);
        }

        public bool ContactExistsByPhoneNumber(string phoneNumber)
        {
            return context.Contacts.Any(c => c.PhoneNumber == phoneNumber);
        }

        public bool ContactExistsByName(string name)
        {
            return context.Contacts.Any(c => c.Name == name);
        }

        public async Task<Contact> CreateAsync(Contact contact)
        {
            await context.Contacts.AddAsync(contact);
            await context.SaveChangesAsync();

            return contact;
        }

        public Contact GetContact(int id)
        {
            return context.Contacts.Where(c => c.Id == id).FirstOrDefault();
        }

        public Contact GetContactByName(string name)
        {
            return context.Contacts.Where(c => c.Name == name).FirstOrDefault();
        }

        public Contact GetContactByPhoneNumber(string phoneNumber)
        {
            return context.Contacts.Where(c => c.PhoneNumber == phoneNumber).FirstOrDefault();
        }

        public ICollection<Contact> GetContacts()
        {
            return context.Contacts.OrderBy(c => c.Id).ToList();
        }

        public bool UpdateContact(Contact contact)
        {
            context.Update(contact);
            return Save();
        }

        public bool Save()
        {
            var saved = context.SaveChanges();

            return saved > 0;
        }
    }
}
