import '../../style/button.scss';

import { connect } from 'react-redux';
import { addRow, editForm, editRow } from '../../actions/form';
import { EditPage } from '../../pages/EditPage';
import { instrumentOptions } from '../../actions/instrument,';
import { loadUser, saveuser } from '../../actions/user';

const formDef = [{
    label: "Namn",
    property: "name",
    dataType: "text"
}, {
    label:"Email",
    property: "email",
    dataType: "text",
}, {
    label:"Instrument",
    property: "instrument",
    dataType: "select",
    options: instrumentOptions
}];

const rolesDef = [{
    header: "Namn",
    property: "name",
    dataType: "select",
    options: [],
    edit: true
}];

const mapStateToProps = state => {
    return {
        source: state.form.user,
        def: {
            property: "user",
            elements: [{
                type: "form",
                def: formDef
            }, {
                type: "table",
                def: rolesDef,
                property: "roles",
                header: "Roller"
            }]
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: (id) => dispatch(loadUser(id)),
        save: () => dispatch(saveuser()),
        
        edit: (change) => dispatch(editForm("user", change)),

        addRow: (table) => dispatch(addRow("user", table)),
        editRow: (table, change) => dispatch(editRow("user", table, change)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage)