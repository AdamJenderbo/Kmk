import { connect } from 'react-redux';
import { createEvent, editEvent } from '../../actions/calendar';
import { CreateEventPage } from '../../pages/calendar/CreateEventPage';

const mapStateToProps = state => {
    return {
        event: state.calendar.event
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editEvent: (change) => dispatch(editEvent(change)),
        createEvent: () => dispatch(createEvent())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventPage)