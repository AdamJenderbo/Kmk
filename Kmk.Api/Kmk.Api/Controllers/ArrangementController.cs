using Kmk.Application.Arrangements.Commands;
using Kmk.Application.Arrangements.Queries;
using Kmk.Domain;
using Kmk.Domain.Arrangements;
using Kmk.Domain.Users;
using Kmk.Infrastructure.Authorization;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Kmk.Api.Controllers;

[ApiController]
[Route("api/arrangement")]
public class ArrangementController(IMediator _mediator) : ControllerBase
{
    [HttpPost]
    [Route("list")]
    public async Task<IEnumerable<Arrangement>> List(ListArrangements request)
    {
        return await _mediator.Send(request);
    }

    [HttpGet]
    [Route("{serialNumber}")]
    public async Task<Arrangement> GetArrangement(int serialNumber)
    {
        return await _mediator.Send(new GetBySerialNumber(serialNumber));
    }

    [HttpPost]
    [Route("create")]
    [HasRole(Role.Arrangement)]
    public async Task<Arrangement> CreateArrangement(CreateArrangement request)
    {
        return await _mediator.Send(request);
    }

    [HttpPost]
    [Route("save")]
    [HasRole(Role.Arrangement)]
    public async Task SaveArrangement(SaveArrangement request)
    {
        await _mediator.Send(request);
    }

    [HttpPost]
    [Route("delete/{serialNumber}")]
    [HasRole(Role.Arrangement)]
    public async Task DeleteArrangement(int serialNumber)
    {
        await _mediator.Send(new DeleteArrangement(serialNumber));
    }

    [HttpPost("upload/{serialNumber}/{instrument}")]
    public async Task<IActionResult> Upload(int serialNumber, Instrument instrument, IFormFile file)
    {
        using var stream = file.OpenReadStream();

        await _mediator.Send(new UploadArrangementPart(serialNumber, instrument, stream, file.ContentType));

        return Ok();
    }

    [HttpGet("download/{fileId}")]
    public async Task<IActionResult> Download(string fileId)
    {
        var(stream, fileName, contentType)  = await _mediator.Send(new DownloadArrangementPart(fileId));

        return File(stream, contentType, fileName);
    }
}