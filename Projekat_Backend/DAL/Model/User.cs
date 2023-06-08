using Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model
{
    public class User
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public byte[] Password { get; set; }
        public byte[] Salt { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public SD.Roles Role { get; set; }
        public Guid ActivationGuid { get; set; } //guid koji cemo koristiti za aktivaciju naloga
        public Guid PasswordGuid { get; set; } //guid koji cemo koristiti za reset passworda
        public string ProfileUrl { get; set; } //putanja do profilne slike
    }
}
