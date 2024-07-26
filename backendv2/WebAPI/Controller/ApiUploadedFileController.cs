using Commons;
using Commons.Utils;
using Core;
using Core.Data.Casting.TourneyTeam;
using Core.Data.UploadedFile;
using Core.Data.User;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Utils;

namespace WebAPI.Controller;

[ApiController]
[Route("api/file")]
public class ApiUploadedFileController : ControllerBase
{
    [HttpGet]
    [Route("{fileName}")]
    public ActionResult Get([FromRoute] string fileName, string? apiToken)
    {
        if (string.IsNullOrEmpty(fileName))
        {
            return BadRequest();
        }
        
        var fileUuid = Path.GetFileNameWithoutExtension(fileName);
        if (!UploadedFileController.Instance.TryGetByUuid(fileUuid, out var file))
        {
            return NotFound();
        }

        if (file.AccessLevel <= AppUserGroup.Default)
        {
            Logger.Debug($"{Request.HttpContext.Connection.RemoteIpAddress} file access {file.Id} ({file.Uuid})");
            return new FileStreamResult(file.GetFileStream(), file.ContentType);
        }

        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, file.AccessLevel, out var user))
        {
            return Unauthorized();
        }
        
        Logger.Debug($"{user!.Name} ({Request.HttpContext.Connection.RemoteIpAddress}) file access {file.Id} ({file.Uuid})");
        return new FileStreamResult(file.GetFileStream(), file.ContentType);
    }

    [HttpPost]
    [Route("uploadTeamLogo")]
    public async Task<ActionResult> Upload(IFormFile formFile, [FromForm] string teamUuid, string? apiToken)
    {
        if (!ApiAuthUtils.TryAuth(Request, Response, apiToken, AppUserGroup.Normal, out var user))
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
            Logger.Exception(e);
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

        Logger.Debug($"{user!.Name} ({Request.HttpContext.Connection.RemoteIpAddress}) uploaded file {uploadedFile.Id} ({uploadedFile.Uuid})");
        
        return Ok(uploadedFile);
    }
    
}