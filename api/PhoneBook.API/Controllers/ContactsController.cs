using Microsoft.AspNetCore.Mvc;
using PhoneBook.API.Models.Domain;
using PhoneBook.API.Models.DTO;
using PhoneBook.API.Repositories.Interface;

namespace PhoneBook.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactRepository contactRepository;
        private readonly IUtilityService utilityService;

        public ContactsController(IContactRepository contactRepository, IUtilityService utilityService)
        {
            this.contactRepository = contactRepository;
            this.utilityService = utilityService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateContact(CreateContactRequestDto request)
        {
            if (!contactRepository.ContactExistsByPhoneNumber(request.PhoneNumber))
                return NotFound();

            var contact = new Contact
            {
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                Organization = request.Organization,
                Email = request.Email,
            };

            await contactRepository.CreateAsync(contact);

            var response = utilityService.mapToDto(contact);

            return Ok(response);
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ContactDto>))]
        public IActionResult GetContacts()
        {
            var contacts = contactRepository.GetContacts();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var mappedContacts = contacts.Select(contact => utilityService.mapToDto(contact)).ToArray();

            return Ok(mappedContacts);
        }

        [HttpGet("ids/{contactId}")]
        [ProducesResponseType(200, Type = typeof(ContactDto))]
        [ProducesResponseType(400)]
        public IActionResult GetContactById(int contactId)
        {
            if (!contactRepository.ContactExistsById(contactId))
                return NotFound();

            var contact = contactRepository.GetContact(contactId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(utilityService.mapToDto(contact));
        }

        [HttpGet("phone_numbers/{phoneNumber}")]
        [ProducesResponseType(200, Type = typeof(Contact))]
        [ProducesResponseType(400)]
        public IActionResult GetContactByPhoneNumber(string phoneNumber)
        {
            if (!contactRepository.ContactExistsByPhoneNumber(phoneNumber))
                return NotFound();

            var contact = contactRepository.GetContactByPhoneNumber(phoneNumber);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(contact);
        }

        [HttpGet("names/{name}")]
        [ProducesResponseType(200, Type = typeof(ContactDto))]
        [ProducesResponseType(400)]
        public IActionResult GetContactByName(string name)
        {
            if (!contactRepository.ContactExistsByName(name))
                return NotFound();

            var contact = contactRepository.GetContactByName(name);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(utilityService.mapToDto(contact));
        }

        [HttpPut("ids/{contactId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult updateContact(int contactId, [FromBody]ContactDto updatedContact)
        {
            if (updatedContact == null)
                return BadRequest(ModelState);

            if (contactId != updatedContact.Id)
                return BadRequest(ModelState);

            if (!contactRepository.ContactExistsById(contactId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            if(contactRepository.ContactExistsByPhoneNumber(updatedContact.PhoneNumber))
            {
                ModelState.AddModelError("message", "Phone number already exists");
                return BadRequest(ModelState);
            }

            var contact = utilityService.mapToContact(updatedContact);

            if (!contactRepository.UpdateContact(contact))
            {
                ModelState.AddModelError("message", "Something went wrong updating contact");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
