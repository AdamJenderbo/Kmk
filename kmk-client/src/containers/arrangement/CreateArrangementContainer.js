import '../../style/button.scss';

import { connect } from 'react-redux';
import { clearArrangement, createArrangement, editArrangement } from '../../actions/arrangement';
import { CreateArrangementPage } from '../../pages/arrangement/CreateArrangementPage';


const mapStateToProps = state => {
    return {
        source: state.arrangement.arrangement
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clear: () => dispatch(clearArrangement()),
        create: () => dispatch(createArrangement()),
        
        edit: (change) => dispatch(editArrangement(change)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateArrangementPage)