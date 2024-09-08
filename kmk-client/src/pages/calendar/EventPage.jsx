import '../../style/card.scss';
import '../../style/button.scss';
import '../../style/layout.scss'
import '../../style/calendar.scss'

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { Icons } from '../../actions/icon';
import { InviteStatus } from '../../actions/calendar';
import { Card } from '../../components/Card';


const Invite = ({invite, acceptInvite, declineInvite}) => {

    return (
        <div>
            {!invite.status && <div className='row'>
                <div style={{margin: 5}}>
                    <Button
                        color="green"
                        onClick={acceptInvite}
                        shape="rounded"
                    >
                        <Icon type={Icons.CircleCheck}></Icon>
                        {"Kommer"}
                    </Button>
                </div>
                <div style={{margin: 5}}>
                    <Button
                        color="red"
                        onClick={declineInvite}
                        shape="rounded"
                    >
                        <Icon type={Icons.CircleXmark}></Icon>
                        {"Kommer inte"}
                    </Button>
                </div>
            </div>}
            {invite.status === InviteStatus.Accepted && <div style={{
                margin: 5, 
                backgroundColor: "rgb(235, 245, 255)",
                color: "rgb(0, 98, 210)",
                padding: 10,
                borderRadius: 10,
                width: 100
            }}>
                Du kommer
            </div>}
            {invite.status === InviteStatus.Declined && <div style={{
                margin: 5, 
                backgroundColor: "rgb(235, 245, 255)",
                color: "rgb(0, 98, 210)",
                borderRadius: 10,
                padding: 10,
                borderRadius: 10,
                width: 120
            }}>
                Du kommer inte
            </div>}
            {/* {(invite.status === 0 || invite.status === 1) && <InviteStatusButton answer={invite.status}></InviteStatusButton>} */}
        </div>
    );
}


const GuestList = ({event}) => {

    const acceptedInvites = event.invites.filter(x => x.answer === InviteStatus.Accepted).length;
    const declinedInvites = event.invites.filter(x => x.answer === InviteStatus.Declined).length;

    return (
        <div style={{margin: 5}}>
            <Card padding={true} className="form">
                <div className='information-header'>
                    Närvaro
                </div>
                <div className='row'>
                    <div className='col-4 answerQty' style={{alignItems: "center", justifyContent: "center"}}>
                        <div>{acceptedInvites}</div>
                        <div>Kommer</div>
                    </div>
                    <div className='col-4 answerQty' style={{alignItems: "center", justifyContent: "center"}}>
                        <div>{declinedInvites}</div>
                        <div>Kommer inte</div>
                    </div>
                    <div className='col-4 answerQty' style={{alignItems: "center", justifyContent: "center"}}>
                        <div>{event.invites.length - acceptedInvites - declinedInvites}</div>
                        <div>Ej svarat</div>
                    </div>
                </div>
            </Card>
        </div>
    )
}


const Information = ({event}) => {
    return (
        <div style={{margin: 5}}>
            <Card padding={true} className="form">
                <div className='information-header'>
                    Information
                </div>
                <div style={{marginTop: 10, marginBottom: 10}}>
                    {`${event.noOfAnswers} personer har svarat`}
                </div>
                <div>
                    {event.locaiton}
                </div>
                <div>
                    {event.description}
                </div>
            </Card>
        </div>

    )
}

const CalendarIcon = ({day}) => {

    return (<div className='calendarIcon'>
        <div className='banner'/>
        <div style={{
            backgroundColor: "white",
            borderBottomLeftRadius: 10, 
            borderBottomRightRadius: 10,
            padding: 10 
        }}>
            {day}
        </div>              
    </div>);

}


export const EventPage = ({acceptInvite, declineInvite, event, loadEvent, user}) => {    

    let { id } = useParams();

    useEffect(() => {
        
        loadEvent(id);

    }, [loadEvent, id, user]);


    const getInvite = () => {

        if(!event)
            return;
  
        const filteredInvites = event.invites.filter(invite => invite.userId === user.id);

        if(filteredInvites.length > 0)
            return filteredInvites[0];
        else
            return null;
    };

    const invite = event ? getInvite() : null;

    if(!event) {
        return <div>Loading...</div>
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>
        <div className='eventPage'>
            <CalendarIcon day={event.day}/>
            <div style={{textAlign: "left"}} className='date'>
                {event.dateText}
            </div>
            <div style={{textAlign: "left"}} className='title'>
                {event.title}
            </div>
            <div style={{margin: 5}}>
                {event.location}
            </div>
            {invite && <Invite 
                invite={invite}
                acceptInvite={acceptInvite}
                declineInvite={declineInvite}
            />}

            <Information event={event}/>
            <GuestList event={event}/>
            {/* <OptionsList 
                options={[
                    {value: InviteAnswer.ACCEPTED, text: "Kommer"},
                    {value: InviteAnswer.DECLINED, text: "Kommer inte"}
                ]} 
                value={invite && invite.answer} 
                onSelect={onSelectAnswer}
            /> */}
        </div>
            </div>
        </div>
     );
};