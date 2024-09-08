import { connect } from 'react-redux';
import { approveUser, loadMembershipRequests} from '../../actions/user';
import { UnapprovedUsersPage } from '../../pages/user/UnapprovedUsersPage';

const mapStateToProps = state => {
    return {
        unapprovedUsers: state.user.unapprovedUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        approveUser: (userId) => dispatch(approveUser(userId)),
        loadMembershipRequests: () => dispatch(loadMembershipRequests())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnapprovedUsersPage)