import { connect } from 'react-redux';
import { loadNotifications } from '../../actions/notification';
import { NotificationPage } from '../../pages/notification/NotificationsPage';

const mapStateToProps = state => {
    return {
        notifications: state.notification.notifications
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadNotifications: () => dispatch(loadNotifications())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)