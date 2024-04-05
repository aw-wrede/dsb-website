using Core.Data.Calendar;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controller;

[ApiController]
[Route("api/calendar")]
public class ApiCalendarController : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [Route("getall")]
    public ActionResult<List<DsbCalendar>> GetAll()
    {
        var calendars = DsbCalendarController.Instance.GetAll();
        return Ok(calendars);
    }
}