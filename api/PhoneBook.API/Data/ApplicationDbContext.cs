using Microsoft.EntityFrameworkCore;
using PhoneBook.API.Models.Domain;

namespace PhoneBook.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}
