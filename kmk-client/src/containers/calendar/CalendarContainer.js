import { connect } from 'react-redux';
import { loadEvents } from '../../actions/calendar';
import { CalendarPage } from '../../pages/calendar/CalendarPage';

const mapStateToProps = state => {
    return {
        events: state.calendar.events
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadEvents: () => dispatch(loadEvents())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage)