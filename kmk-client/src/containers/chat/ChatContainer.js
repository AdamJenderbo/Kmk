import { connect } from 'react-redux';
import { addMessage, loadChannel, loadChannels, loadMessages, sendMessage, setMessages } from '../../actions/channel';
import { ChatPage } from '../../pages/chat/ChatPage';

const mapStateToProps = state => {
    return {
        user: state.user.user,
        channels: state.channel.channels,
        channel: state.channel.channel,
        messages: state.channel.messages.filter(x => x.channelId == state.channel.channel.id)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadChannels: () => dispatch(loadChannels()),
        loadChannel: (channelId) => dispatch(loadChannel(channelId)),
        loadMessages: (channelId) => dispatch(loadMessages(channelId)),
        sendMessage: (channel, user, message) => dispatch(sendMessage(channel, user, message)),
        setMessages: (messages) => dispatch(setMessages(messages)),
        addMessage: (message) => dispatch(addMessage(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)