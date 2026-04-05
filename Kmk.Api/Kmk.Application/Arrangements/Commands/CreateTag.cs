using Kmk.Domain.Arrangements;
using MediatR;

namespace Kmk.Application.Arrangements.Commands;

/// <summary>
/// Skapar tag
/// </summary>
public record CreateTag(string Name) : IRequest;

public class CreateTagHandler(ITagRepository _tagRepository, IUnitOfWork _unitOfWork) : IRequestHandler<CreateTag>
{
    public async Task Handle(CreateTag request, CancellationToken cancellationToken)
    {
        _tagRepository.Add(new Tag(request.Name));

        await _unitOfWork.Save();
    }
}