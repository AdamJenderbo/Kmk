import { connect } from 'react-redux';
import { HomePage } from '../pages/HomePage';
import { loadChannels, loadMessages, sendMessage } from '../actions/channel';

const mapStateToProps = state => {
    return {
        user: state.user.user,
        channels: state.channel.channels,
        channel: state.channel.channel
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadChannels: () => dispatch(loadChannels()),
        loadMessages: (channelId) => dispatch(loadMessages(channelId)),
        sendMessage: (channel, user, message) => dispatch(sendMessage(channel, user, message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)