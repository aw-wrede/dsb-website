using Commons;
using Commons.Logging;
using Commons.Utils;
using Core.Controller;
using Core.Data.AccessToken;
using MongoDB.Driver;

namespace Core.Data.User;

public class AppUserController : PublicDataDatabaseController<AppUserController, AppUser>
{
    protected AppUserController() { }

    public override void OnStartup()
    {
        base.OnStartup();
        EnsureAdminUser();
    }

    private void EnsureAdminUser()
    {
        var admin = Collection.FindSync(c => c.Name.Equals("admin", StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault();
        if (admin != null)
        {
            return;
        }

        admin = new AppUser()
        {
            Uuid = UuidGenerator.GenerateUuid(),
            Name = "admin",
            DisplayName = "Admin",
            UserGroup = AppUserGroup.Admin
        };
        admin.SetCredentials("ChangeMe");

        InsertOne(admin);

        if (!TryGetByUuid(admin.Uuid, out admin))
        {
            Logger.Error("Could not find admin user after creation!");
            return;
        }

        var adminToken = new AppAccessToken()
        {
            Token = AppAccessToken.CreateToken(),
            AppUserReference = admin.CreateReference()
        };
        
        AppAccessTokenController.Instance.InsertOne(adminToken);
    }
    
    public bool CheckSessionToken(string uuid, string token, out AppUser? user)
    {
        user = Collection.FindSync(c => c.Uuid == uuid).FirstOrDefault();
        if (user == null)
        {
            return false;
        }

        if (user.VerifySessionToken(token))
        {
            return true;
        }
        else
        {
            user = null;
            return false;
        }
    }

    public bool VerifyLogin(string username, string password, out AppUser? user, out AppUserSessionData? session)
    {
        session = null;
        user = Collection.FindSync(c => c.Name == username).FirstOrDefault();
        if (user == null)
        {
            return false;
        }

        if (!user.VerifyLoginAttempt(password))
        {
            user = null;
            return false;
        }

        session = user.CreateNewSessionData();
        
        UpdateOneComplete(user);
        
        return true;
    }
    
    public AppUserReference GetReference(AppUser user)
    {
        return new AppUserReference()
        {
            ReferenceId = user.Id
        };
    }

    public AppUserReference? GetReference(string uuid)
    {
        return TryGetByUuid(uuid, out var user) ? GetReference(user) : null;
    }

    public List<AppUserReference>? GetReferences(string[] uuids)
    {
        var list = new List<AppUserReference>();
        foreach (var uuid in uuids)
        {
            var reference = GetReference(uuid);
            if (reference == null)
            {
                return null;
            }
            list.Add(reference);
        }

        return list;
    }
    
}