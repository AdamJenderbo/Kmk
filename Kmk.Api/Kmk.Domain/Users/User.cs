using Kmk.Domain.Users.Events;

namespace Kmk.Domain.Users;

public class User
{
    /// <summary>
    /// ID
    /// </summary>
    public Guid Id { get; private set; }

    /// <summary>
    /// Förnamn
    /// </summary>
    public string FirstName { get; private set; }

    /// <summary>
    /// Efternamn
    /// </summary>
    public string LastName { get; private set; }

    /// <summary>
    /// Email
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// Adress
    /// </summary>
    public string Address { get; set; }

    /// <summary>
    /// Telefonnummer
    /// </summary>
    public string PhoneNumber { get; set; }

    /// <summary>
    /// Födelsedag
    /// </summary>
    public DateTime DateOfBrith { get; set; }

    /// <summary>
    /// Instrumentet medlemmen spelar
    /// </summary>
    public Instrument Instrument { get; set; }

    /// <summary>
    /// Lösenord
    /// </summary>
    public string Password { get; set; }

    /// <summary>
    /// Id till profilbild
    /// </summary>
    public Guid? ImageId { get; set; }

    /// <summary>
    /// Om användaren är godkänd
    /// </summary>
    public bool Approved { get; private set; }

    /// <summary>
    /// Användarens roller
    /// </summary>
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

        //RaiseEvent(new UserRegisteredEvent(this));
    }

    /// <summary>
    /// Godkänner användare
    /// </summary>
    public void Approve()
    {
        Approved = true;

        //RaiseEvent(new UserApprovedEvent(this));
    }

    /// <summary>
    /// Har användaren rollen?
    /// </summary>
    /// <param name="role"></param>
    /// <returns></returns>
    public bool IsRole(Role role)
    {
        return Roles.Any(x => x.Role == role);
    }

    /// <summary>
    /// Är användaren en del av styrelsen?
    /// </summary>
    /// <returns></returns>
    public bool IsBoardMember()
    {
        return Roles.Any(x => 
            x.Role == Role.Chairman ||
            x.Role == Role.Secretery ||
            x.Role == Role.Treasurer ||
            x.Role == Role.BoardMember ||
            x.Role == Role.BoardDeputy);
    }
}