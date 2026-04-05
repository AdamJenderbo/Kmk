import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { logIn, logOut } from '../actions/authentication';
import { readNotifications } from '../notification/notification';

const mapStateToProps = state => {
    return {
        isLoggedIn: state.authentication.isLoggedIn,
        user: state.user.user,
        notifications: state.notification.notifications
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (accessToken) => dispatch(logIn(accessToken)),
        logout: () => dispatch(logOut()),
        readNotifications: (notificaitonIds) => dispatch(readNotifications(notificaitonIds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)