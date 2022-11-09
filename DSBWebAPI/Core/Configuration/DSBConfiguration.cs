using System.Collections.Generic;
using Commons.Configuration;

namespace Core.Configuration
{
    public class DSBConfiguration : IConfiguration
    {
        public string ConfigurationName { get; } = "DSBConfiguration";
        
        public string ChallongeApiKey { get; set; }
        
        public List<string> TournamentUrls { get; set; } = new List<string>();

        public void LoadDefault()
        {
        }
    }
}