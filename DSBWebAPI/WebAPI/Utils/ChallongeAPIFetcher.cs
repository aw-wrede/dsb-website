using System;
using System.IO;
using System.Net;
using Commons;
using Core;
using Core.Controller;
using Core.Data.Tournament;
using Newtonsoft.Json;
using WebAPI.Challonge;
using MongoDB.Driver;

namespace WebAPI.Utils
{
    public class ChallongeAPIFetcher : Singleton<ChallongeAPIFetcher>
    {
        protected ChallongeAPIFetcher()
        {
        }

        public void Fetch(string tournamentId)
        {
            var request = WebRequest.Create(CreateChallongeApiUrl(tournamentId));
            
            try
            {
                var response = (HttpWebResponse)request.GetResponse();
                var dataStream = response.GetResponseStream();
                if (dataStream == null)
                {
                    Logger.Error($"Could not get response stream for tournament {tournamentId}");
                    return;
                }
                var reader = new StreamReader(dataStream);

                var content = reader.ReadToEnd();
                reader.Close();
                dataStream.Close();
                response.Close();

                var challongeData = JsonConvert.DeserializeObject<ChallongeResponse>(content);
                var databaseData = challongeData!.ToDatabaseFormat();
                //Logger.Debug($"{databaseData.ToJson()}");

                var oldVersion = TournamentController.Instance.Collection.FindSync(x => x.ChallongeId == databaseData.ChallongeId)
                    .FirstOrDefault();

                if (oldVersion == null)
                {
                    TournamentController.Instance.Collection.InsertOne(databaseData);
                    return;
                }

                databaseData.Id = oldVersion.Id;
                databaseData.Uuid = oldVersion.Uuid;

                if (!databaseData.ShouldUpdateGroupsData)
                {
                    databaseData.GroupAmount = oldVersion.GroupAmount;
                    databaseData.Groups = oldVersion.Groups;
                }
                
                //set update var to false after updating
                databaseData.ShouldUpdateGroupsData = false;
                
                TournamentController.Instance.UpdateOneComplete(databaseData);
            }
            catch (Exception e)
            {
                Logger.Exception(e);
                return;
            }
            

        }

        private string CreateChallongeApiUrl(string tournamentId)
        {
            return $"https://api.challonge.com/v1/tournaments/{tournamentId}.json" +
                   $"?api_key={BackendServer.Instance.DsbConfiguration.ChallongeApiKey}" +
                   "&include_participants=1" +
                   "&include_matches=1";
        }
        
    }
}