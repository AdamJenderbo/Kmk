import { connect } from 'react-redux';
import { SearchPage } from '../../pages/SearchPage';
import { loadRoles } from '../../actions/role';

const mapStateToProps = state => {
    return {
        rows: state.role.roles,
        header: "Sök roll",
        colums: [{
            header: "Namn",
            property: "name",
            dataType: "text",
            link: (row) => `/role/${row.id}`
        }]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadRows: () => dispatch(loadRoles()),
        // loadDetails: (id) => dispatch(loadUser(id)),
        // edit: (change) => dispatch(editUser(change)),
        // create: () => dispatch(registerUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)