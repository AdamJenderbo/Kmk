import { connect } from 'react-redux';
import { editArrangement, loadArragement, loadArrangements, registerArrangement } from '../../actions/arrangement';
import { SearchPage } from '../../pages/SearchPage';

const mapStateToProps = state => {
    return {
        details: state.arrangement.arrangement,
        rows: state.arrangement.arrangements,
        header: "Sök arrangemang",
        user: state.user.user,
        colums: [{
            header: "Löpnummer",
            property: "serialNumber",
            dataType: "text"
        }, {
            header: "Titel",
            property: "title",
            dataType: "text"
        }, {
            header: "Kompositör",
            property: "composer",
            dataType: "text"
        }, {
            header: "Arrangör",
            property: "arranger",
            dataType: "text"
        }]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadRows: (filter, sorting) => dispatch(loadArrangements(filter, sorting)),
        loadDetails: (serialNo) => dispatch(loadArragement(serialNo)),
        edit: (change) => dispatch(editArrangement(change)),
        create: () => dispatch(registerArrangement())
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)