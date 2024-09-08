import '../../style/button.scss';

import { connect } from 'react-redux';
import { createRole, editRole } from '../../actions/role';
import { CreateRolePage } from '../../pages/role/CreateRolePage';

const mapStateToProps = state => {
    return {
        role: state.role.role,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createRole: () => dispatch(createRole()),
        editRole: (change) => dispatch(editRole(change)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRolePage)