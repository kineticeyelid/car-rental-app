using System.Security.Cryptography;

public class KeyGenerator
{
    public static byte[] GenerateHMACSHA512Key()
    {
        using (var rng = RandomNumberGenerator.Create())
        {
            var key = new byte[64]; // 64 bytes for 512 bits
            rng.GetBytes(key);
            return key;
        }
    }
}
