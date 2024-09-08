import '../../style/button.scss';

import { connect } from 'react-redux';
import { addClaim, editClaim, editRole, loadInheiritedClaims, loadRole, loadRoles, saveRole } from '../../actions/role';
import { EditRolePage } from '../../pages/role/EditRolePage';

const mapStateToProps = state => {
    return {
        inheiritedClaims: state.role.inheiritedClaims,
        role: state.role.role,
        roleOptions: state.role.roles.map(role => ({
            value: role.id,
            text: role.name 
        }))
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addClaim: () => dispatch(addClaim()),
        editClaim: (change) => dispatch(editClaim(change)),
        editRole: (change) => dispatch(editRole(change)),
        loadInheiritedClaims: (id) => dispatch(loadInheiritedClaims(id)),
        loadRole: (id) => dispatch(loadRole(id)),
        loadRoles: () => dispatch(loadRoles()),
        saveRole: () => dispatch(saveRole()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRolePage)