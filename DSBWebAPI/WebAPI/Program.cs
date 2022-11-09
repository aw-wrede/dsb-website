using System;
using System.Threading;
using Commons;
using Core;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using WebAPI.Utils;

namespace WebAPI
{
    public class Program
    {
        private static Timer _challongeApiTimer;
        private const int ChallongeApiTimerInterval = 60 * 60 * 1000;

        public static void Main(string[] args)
        {
            BackendServer.Instance.OnStartup();
            _challongeApiTimer = new Timer(UpdateChallongeApiData, null, 1000, Timeout.Infinite);
            //ChallongeAPIFetcher.Instance.Fetch("e9653c7812deb879c8dc3852-DSBS5D5");
            CreateHostBuilder(args).Build().Run();
            _challongeApiTimer?.Dispose();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });

        private static void UpdateChallongeApiData(object state)
        {
            try
            {
                Logger.Info("Refreshing Challonge Data...");
                BackendServer.Instance.DsbConfiguration.TournamentUrls.ForEach(t =>
                {
                    Logger.Debug($"Refreshing Tournament {t}");
                    ChallongeAPIFetcher.Instance.Fetch(t);
                });
                //ChallongeAPIFetcher.Instance.Fetch("e9653c7812deb879c8dc3852-DSBS5D5");
            }
            catch (Exception e)
            {
                Logger.Exception(e);
            }
            finally
            {
                _challongeApiTimer?.Change(ChallongeApiTimerInterval, Timeout.Infinite);
            }
        }
        
    }
}