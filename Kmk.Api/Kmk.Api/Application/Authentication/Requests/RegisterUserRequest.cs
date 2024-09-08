using Kmk.Api.Domain.Users;

namespace Kmk.Api.Application.Authentication;

public class RegisterUserRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    //public DateTime DateOfBrith { get; set; }
    public Instrument Instrument { get; set; }

    public string? Validate()
    {
        if (Email.Length == 0)
            return "Email saknas";

        if (Password.Length == 0)
            return "Lösenord saknas";

        if (FirstName.Length == 0)
            return "Förnamn saknas";

        if (LastName.Length == 0)
            return "Efternamn saknas";

        if (Address.Length == 0)
            return "Address saknas";

        if (PhoneNumber.Length == 0)
            return "Telefonnummer saknas";

        return null;
    }
}