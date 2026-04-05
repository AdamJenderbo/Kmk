using Kmk.Domain.Arrangements;
using MediatR;

namespace Kmk.Application.Arrangements.Commands;

/// <summary>
/// Raderar tag
/// </summary>
public record DeleteTag(Guid Id) : IRequest;

public class DeleteTagHandler(ITagRepository _tagRepository, IUnitOfWork _unitOfWork) : IRequestHandler<DeleteTag>
{
    public async Task Handle(DeleteTag request, CancellationToken cancellationToken)
    {
        _tagRepository.Remove(request.Id);

        await _unitOfWork.Save();
    }
}