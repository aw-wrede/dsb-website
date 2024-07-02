using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Models;

public class ApiSessionData
{
    [FromHeader]
    public string Uuid { get; set; }
    [FromHeader]
    public string SessionToken { get; set; }
}