using Core;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controller;

[ApiController]
[Route("api/diagnose")]
public class ApiDiagnoseController : ControllerBase
{
    
    [HttpGet]
    [Route("info")]
    public ActionResult<BasicDiagnose> Info()
    {
        return new BasicDiagnose()
        {
            Version = BackendServer.Version,
        };
    }
    
    public class BasicDiagnose
    {
        public double Version { get; set; }
    }
    
}