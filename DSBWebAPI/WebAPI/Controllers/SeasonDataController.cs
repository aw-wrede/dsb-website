using Core.Data.Tournament;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebAPI.Controllers.Models.Result;
using WebAPI.Utils.Controller;

namespace WebAPI.Controllers
{
    [Route("tournament")]
    public class SeasonDataController : BasicApiController<SeasonDataController>
    {
        public SeasonDataController(ILogger<SeasonDataController> logger) : base(logger)
        {
        }

        [EnableCors("Wildcard")]
        [Route("get/{uuid}")]
        public IActionResult CurrentSeason([FromRoute]string uuid)
        {
            if (!TournamentController.Instance.TryGetByUuid(uuid, out var tournament))
            {
                return NotFound();
            }

            var result = new SeasonDataResult(tournament);
            result.OrderParticipants();
            
            return Ok(result);
        }
        
    }
}