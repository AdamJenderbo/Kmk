import '../../style/card.scss';
import '../../style/button.scss';
import '../../style/app.scss';

import React, { useEffect } from 'react';
import { Card } from '../../components/Card';


export const NotificationPage = ({
    notifications,
    loadNotifications
}) => {
    
    useEffect(() => {
        loadNotifications();
    }, []);

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>
                {notifications.map(x => <Card padding={true}>{x.title}</Card>)}
            </div>
        </div>
    );
};