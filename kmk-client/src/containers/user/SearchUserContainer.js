import { connect } from 'react-redux';
import { editUser, loadUsers, registerUser } from '../../actions/user';
import { instrumentOptions } from '../../actions/instrument,';
import { SearchUserPage } from '../../pages/user/SearchUserPage';

const mapStateToProps = state => {
    return {
        users: state.user.users || [],
        header: "Sök medlem",
        colums: [{
            header: "Namn",
            property: "name",
            dataType: "text",
            link: (row) => `/user/${row.id}`
        }, {
            header: "Email",
            property: "email",
            dataType: "text"
        }, {
            header: "Intrument",
            property: "instrument",
            dataType: "select",
            options: instrumentOptions
        }]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUsers: (filter) => dispatch(loadUsers(filter)),
        edit: (change) => dispatch(editUser(change)),
        create: () => dispatch(registerUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchUserPage)