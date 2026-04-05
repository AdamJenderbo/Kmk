import { connect } from 'react-redux';
import { FrontPage } from '../pages/FrontPage';
import { logIn } from '../actions/authentication';

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: (email, password) => dispatch(logIn(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)