using System;

namespace Commons.Utils
{
    public static class UuidGenerator
    {
        public static string GenerateUuid()
        {
            return Guid.NewGuid().ToString();
        }
    }
}