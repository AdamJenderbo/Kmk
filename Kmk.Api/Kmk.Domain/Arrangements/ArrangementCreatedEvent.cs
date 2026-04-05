using MediatR;

namespace Kmk.Domain.Arrangements;

public record ArrangementCreatedEvent(Arrangement Arrangement) : INotification;