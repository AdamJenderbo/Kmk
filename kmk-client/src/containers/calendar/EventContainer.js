import { connect } from "react-redux"
import { acceptInvite, declineInvite, loadEvent } from "../../actions/calendar"
import { EventPage } from "../../pages/calendar/EventPage"


const mapStateToProps = state => {
    return {
        event: state.calendar.event,
        user: state.user.user
    }
}

const mapDispatchToProps = dispatch => {

    return {
        loadEvent: (id) => dispatch(loadEvent(id)),
        acceptInvite: (eventId, userId) => dispatch(acceptInvite(eventId, userId)),
        declineInvite: (eventId, userId) => dispatch(declineInvite(eventId, userId)),
        // cancelEvent: (id) => dispatch(cancelEvent(id)),
        // getUser: (id) => dispatch(getUser(id))
    }
}

const mergeProps = (stateProps, dispatchProps) => ({ 
    ...stateProps, 
    ...dispatchProps,
    acceptInvite: () => dispatchProps.acceptInvite(stateProps.event.id, stateProps.user.id),
    declineInvite: () => dispatchProps.declineInvite(stateProps.event.id, stateProps.user.id)

})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(EventPage)