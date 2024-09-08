using Kmk.Api.Api.Requests;
using Kmk.Api.Application.Channels;
using Kmk.Api.Domain.Channels;
using Kmk.Api.Persistence;
using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;
using System.Text;

namespace Kmk.Api.Api.Controllers;

[ApiController]
[Route("api/channel")]
public class ChannelController : ControllerBase
{
    ChannelService _channelService;
    UnitOfWork _unitOfWork;

    public ChannelController(ChannelService channelService, UnitOfWork unitOfWork)
    {
        _channelService = channelService;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    [Route("list")]
    public List<Channel> GetChannels()
    {
        return _channelService.GetChannels();
    }

    [HttpGet]
    [Route("my/{userId}")]
    public List<Channel> GetChannelsOfUser(Guid userId)
    {
        return _channelService.GetChannelsOfUser(userId);
    }


    [HttpGet]
    [Route("{channelId}")]
    public Channel GetChannel(Guid channelId)
    {
        return _channelService.GetChannel(channelId);
    }

    [HttpGet]
    [Route("get/name/{name}")]
    public Channel GetChannelByName(string name)
    {
        return _channelService.GetChannelByName(name);
    }

    [HttpPost]
    [Route("create/{name}")]
    public Channel CreateChannel(string name)
    {
        Channel channel = _channelService.CreateChannel(name);

        _unitOfWork.Save();

        return channel;
    }

    [HttpGet]
    [Route("message/get/{channelId}")]
    public List<Post> GetMessages(Guid channelId)
    {
        return _channelService.GetMessages(channelId);
    }


    [HttpPost]
    [Route("send")]
    public bool SendMessage(SendMessageRequest request)
    {
        _channelService.SendMessage(request.ChannelId, request.UserId, request.Message);
        _unitOfWork.Save();
        return true;
    }
}