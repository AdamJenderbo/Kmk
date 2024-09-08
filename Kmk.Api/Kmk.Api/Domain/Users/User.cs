using Kmk.Api.Domain.Channels;

namespace Kmk.Api.Domain.Users;

public class User
{
    public Guid Id { get; private set; }
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public string Email { get; set; }
    public string Address { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime DateOfBrith { get; set; }
    public Instrument Instrument { get; set; }
    public string Password { get; set; }
    public bool Approved { get; private set; }
    public List<UserRole> Roles { get; private set; }

    private User() { }
    public User(
        string email, 
        string password,
        string firstName, 
        string lastName, 
        DateTime dateOfBirth,
        string address, 
        string phoneNumber,
        Instrument instrument)
    {
        Id = Guid.NewGuid();
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        PhoneNumber = phoneNumber;
        Address = address;
        DateOfBrith = dateOfBirth;
        Instrument = instrument;
        Password = password;
        Approved = false;
        Roles = new List<UserRole>();
    }

    public void Approve()
    {
        Approved = true;
    }

    public bool HasRole(Role role)
    {
        return Roles.Any(x => x.Role == role);
    }
}