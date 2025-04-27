using Core.Controller;
using Core.Data.User;
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

    public bool TryGetByUser(AppUser user, out AppAccessToken token)
    {
        token = Collection.FindSync(t => t.AppUserReference.ReferenceId == user.Id).FirstOrDefault();
        return token != null;
    }
    
}