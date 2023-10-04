using System.Reflection.Metadata.Ecma335;

namespace API.DTOs.Account
{
    public class UserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string JWT { get; set; }
    }
}
