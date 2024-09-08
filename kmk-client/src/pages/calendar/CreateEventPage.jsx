import '../../style/card.scss';
import '../../style/button.scss';

import React, { useState } from 'react';
import Label from '../../components/Label';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { Card } from '../../components/Card';
import { DateField } from '../../components/fields/DateField';
import { useNavigate } from 'react-router-dom';


export const CreateEventPage = ({event, editEvent, createEvent}) => {

    const [loading, setLoading] = useState();

    const navigate = useNavigate();

    const onClickCreate = async () => {
        setLoading(true);
        const response = await createEvent();
        setLoading(false);

        if(response.isSuccess) {
            navigate("/kalender");
        } else {
            console.error(response.message);
        }
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>
                <Card padding={true}>
                    <Label label="Datum">
                        <DateField 
                            source={event} 
                            property="date" 
                            onEdit={editEvent}
                        />
                    </Label>
                    <Label label="Namn">
                        <TextField 
                            source={event} 
                            property="title" 
                            onEdit={editEvent}
                        />
                    </Label>
                    <Label label="Beskrivning">
                        <TextField 
                            source={event} 
                            property="description" 
                            onEdit={editEvent}
                        />
                    </Label>
                    <Label label="Plats">
                        <TextField 
                            source={event} 
                            property="location" 
                            onEdit={editEvent}
                        />
                    </Label>
                </Card>
                <Button 
                    onClick={onClickCreate} 
                    disabled={loading}
                    shape="rounded" 
                >
                    Skapa
                </Button>
            </div>
        </div>
    );
};