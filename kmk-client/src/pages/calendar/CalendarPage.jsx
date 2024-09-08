import '../../style/card.scss';
import '../../style/button.scss';
import '../../style/app.scss';

import React, { useEffect } from 'react';
import { getNameOfMonth } from '../../actions/event';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Card';


function Month({year, month}) {
    return (
        <div className="monthHeader">
            {getNameOfMonth(month)}{" "}{year}
        </div>
    )
}


function Event({event, event: {date}}) {
    const dateObj = new Date(date);

    const month = dateObj.getMonth();
    const day = dateObj.getDate();

    return (
        <div style={{margin: 10}}>
            <Link to={`/kalender/evenemang/${event.id}`}>
                <Card padding={true}>
                    <div className="event">
                        <div className="date">
                            <div className="day">{day}</div>
                            <div className="month">{getNameOfMonth(month).substring(0,3)}</div>
                        </div>
                        <div className="name">{event.title}</div>
                    </div>
                </Card>
            </Link>
        </div>

    )
}


export const CalendarPage = ({
    events,
    loadEvents
}) => {

    
    useEffect(() => {
        loadEvents();
    }, []);

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>
                {events.map((event, index) => {

                    const dateObj = new Date(event.date);

                    const year = dateObj.getFullYear();
                    const month = dateObj.getMonth();

                    return (<div key={index}>
                        {(index === 0 || new Date(events[index - 1].date).getMonth() !== month) && <Month month={month} year={year}/>}
                        <Event event={event}/>
                    </div>) 
                })}
            </div>
        </div>
    );
};