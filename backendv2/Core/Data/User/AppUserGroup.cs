namespace Core.Data.User;

public enum AppUserGroup
{
    Default = 0,
    Guest = 1,
    Unverified = 2,
    Normal = 10,
    Privileged = 20,
    Admin = 100,
    SuperUser = 1000
}