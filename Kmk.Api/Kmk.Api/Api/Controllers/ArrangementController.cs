using Kmk.Api.Application.Arrangements.Commands;
using Kmk.Api.Application.Arrangements.Queries;
using Kmk.Api.Domain.Arrangements;
using Microsoft.AspNetCore.Mvc;

namespace Kmk.Api.Api.Controllers;

[ApiController]
[Route("api/arrangement")]
public class ArrangementController : ControllerBase
{
    [HttpPost]
    [Route("list")]
    public List<Arrangement> GetArrangements(
        GetArrangementsQuery request, 
        [FromServices] GetArrangementsQueryHandler queryHandler)
    {
        return queryHandler.Handle(request);
    }

    [HttpPost]
    [Route("get")]
    public Arrangement GetArrangement(
        GetArrangementQuery request,
        [FromServices] GetArrangementQueryHandler queryHandler)
    {
        return queryHandler.Handle(request);
    }

    [HttpPost]
    [Route("create")]
    //[HasRole(Role.Arrangement)]
    public CreateArrangementResponse CreateArrangement(
        CreateArrangementCommand request, 
        [FromServices] CreateArrangementCommandHandler commandHandler)
    {
        return commandHandler.Handle(request);
    }

    [HttpPost]
    [Route("save")]
    //[HasRole(Role.Arrangement)]
    public SaveArrangementResponse SaveArrangement(
        SaveArrangementCommand request,
        [FromServices] SaveArrangementCommandHandler commandHandler)
    {
        return commandHandler.Handle(request);
    }

    [HttpPost]
    [Route("delete")]
    //[HasRole(Role.Arrangement)]
    public DeleteArrangementResponse DeleteArrangement(
        DeleteArrangementCommand request,
        [FromServices] DeleteArrangementCommandHandler commandHandler)
    {
        return commandHandler.Handle(request);
    }


    [HttpPost]
    [Route("import")]
    //[HasRole(Role.Arrangement)]
    public void ImportArrangements([FromServices] CreateArrangementCommandHandler commandHandler)
    {
        var file = System.IO.File.ReadAllLines("C:\\temp\\arrangements.txt");

        foreach( var line in file) 
        {
            var colums = line.Split('\t');

            if (colums[3].Length == 0)
                continue;

            var serialNumber = int.Parse(colums[colums.Length - 1]);
            var title = colums[0];

            CreateArrangementCommand request = new CreateArrangementCommand
            {
                SerialNumber = serialNumber,
                Title = title,
                CreatedBy = "import"
            };

            commandHandler.Handle(request);
        }

    }
}