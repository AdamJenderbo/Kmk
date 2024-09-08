import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { logIn, logOut } from '../actions/authentication';

const mapStateToProps = state => {
    return {
        isLoggedIn: state.authentication.isLoggedIn,
        user: state.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (accessToken) => dispatch(logIn(accessToken)),
        logout: () => dispatch(logOut()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)