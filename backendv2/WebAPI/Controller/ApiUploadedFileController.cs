using Commons.Utils;
using Core;
using Core.Data.Casting.TourneyTeam;
using Core.Data.UploadedFile;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Utils;

namespace WebAPI.Controller;

[ApiController]
[Route("api/file")]
public class ApiUploadedFileController : ControllerBase
{
    [HttpGet]
    [Route("{fileName}")]
    public ActionResult Get([FromRoute] string fileName, string apiToken)
    {
        if (string.IsNullOrEmpty(fileName) || string.IsNullOrEmpty(apiToken))
        {
            return BadRequest();
        }

        if (!ApiAuthUtils.IsAuth(apiToken, accessLevel: AppUserGroup.Default, out var user))
        {
            return Unauthorized();
        }
        
        var fileUuid = Path.GetFileNameWithoutExtension(fileName);

        if (!UploadedFileController.Instance.TryGetByUuid(fileUuid, out var file))
        {
            return NotFound();
        }

        if (file.AccessLevel > user!.UserGroup)
        {
            return Forbid();
        }

        return new FileStreamResult(file.GetFileStream(), file.ContentType);
    }

    [HttpPost]
    [Route("uploadTeamLogo")]
    public async Task<ActionResult> Upload(IFormFile formFile, [FromForm] string teamUuid, [FromHeader] ApiSessionData sessionData)
    {
        if (formFile.Length == 0 ||string.IsNullOrEmpty(teamUuid))
        {
            return BadRequest();
        }

        if (!ApiAuthUtils.IsAuth(sessionData, accessLevel: AppUserGroup.Privileged, out var user))
        {
            return Unauthorized();
        }
        
        if (!TourneyTeamController.Instance.TryGetByUuid(teamUuid, out var team))
        {
            return NotFound("Team with given uuid not found.");
        }
        
        var fileName = UuidGenerator.GenerateUuid();
        
        try
        {
            var filePath = Path.Combine(BackendServer.Instance.FileUploadConfiguration.Path, fileName);
            await using var stream = System.IO.File.Create(filePath);
            await formFile.CopyToAsync(stream);
        }
        catch (Exception e)
        {
            return StatusCode(500);
        }

        var uploadedFile = new UploadedFile()
        {
            Uuid = fileName,
            TimeCreated = DateTime.Now,
            AccessLevel = AppUserGroup.Normal,
            ContentType = formFile.ContentType
        };

        if (!UploadedFileController.Instance.InsertOne(uploadedFile) || !UploadedFileController.Instance.TryGetByUuid(uploadedFile.Uuid, out uploadedFile))
        {
            return StatusCode(500);
        }

        team.TeamLogo = uploadedFile.CreateReference();

        if (!TourneyTeamController.Instance.UpdateOneComplete(team))
        {
            return StatusCode(500);
        }

        return Ok(uploadedFile);
    }
    
}