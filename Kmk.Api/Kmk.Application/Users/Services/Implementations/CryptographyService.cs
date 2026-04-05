using System.Security.Cryptography;
using System.Text;

namespace Kmk.Application.Users.Services.Implementations;

public class CryptographyService : ICryptographyService
{
    /// <summary>
    /// Hashar
    /// </summary>
    /// <param name="password"></param>
    /// <returns></returns>
    public string Hash(string value)
    {
        using (SHA256 sha256Hash = SHA256.Create())
        {
            byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(value));

            var builder = new StringBuilder();

            for (int i = 0; i < bytes.Length; i++)
                builder.Append(bytes[i].ToString("x2"));

            return builder.ToString();
        }
    }
}