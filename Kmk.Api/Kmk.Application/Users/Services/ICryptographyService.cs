namespace Kmk.Application.Users.Services;

public interface ICryptographyService
{
    string Hash(string value);
}