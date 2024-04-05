using Core.Controller;
using MongoDB.Driver;

namespace Core.Data.AccessToken;

public class AppAccessTokenController : DatabaseController<AppAccessTokenController, AppAccessToken>
{
    protected AppAccessTokenController() {}
    public bool TryGetByAccessToken(string input, out AppAccessToken token)
    {
        token = Collection.FindSync(t => t.Token == input).FirstOrDefault();
        return token != null;
    }
}