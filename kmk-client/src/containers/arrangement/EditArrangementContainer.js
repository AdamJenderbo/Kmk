import '../../style/button.scss';

import { connect } from 'react-redux';
import { addPart, clearArrangement, deleteArrangement, editArrangement, loadArragement, saveArrangement } from '../../actions/arrangement';
import { editRow } from '../../actions/form';
import { instrumentOptions } from '../../actions/instrument,';
import { EditArrangementPage } from '../../pages/arrangement/EditArrangementPage';

const formDef = [{
    label:"Löpnummer",
    property: "serialNumber",
    dataType: "number",
    disabled: true
}, {
    label:"Titel",
    property: "title",
    dataType: "text",
}, {
    label:"Kompositör",
    property: "composer",
    dataType: "text",
}, {
    label:"Arrangör",
    property: "arranger",
    dataType: "text",
}];

const partsColums = [{
    header: "Instrument",
    property: "instrument",
    dataType: "select",
    options: instrumentOptions,
    edit: true
}, {
    header: "Nummer",
    property: "no",
    dataType: "number",
    edit: true
}];

const mapStateToProps = state => {
    return {
        arrangement: state.arrangement.arrangement,
        def: {
            property: "arrangement",
            elements: [{
                type: "form",
                def: formDef
            }, {
                type: "table",
                def: partsColums,
                property: "parts",
                header: "Stämmor"
            }]
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: (id) => dispatch(loadArragement(id)),
        save: () => dispatch(saveArrangement()),
        
        edit: (change) => dispatch(editArrangement(change)),

        addPart: () => dispatch(addPart()),
        editRow: (table, change) => dispatch(editRow("arrangement", table, change)),
        clearArrangement: () => dispatch(clearArrangement()),
        deleteArrangement: () => dispatch(deleteArrangement())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArrangementPage)