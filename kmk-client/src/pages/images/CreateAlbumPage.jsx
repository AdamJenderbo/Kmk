import '../../style/card.scss';
import '../../style/button.scss';
import '../../style/app.scss';

import React, { useState } from 'react';
import { Card } from '../../components/Card';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { DateField } from '../../components/fields/DateField';

export const CreateAlbumPage = ({createAlbum}) => {
    
    const [request, setRequest] = useState({title: ""});

    const navigate = useNavigate();

    const onClickCreate = async () => {
        if(!request || request.title.length === 0) {
            return;
        }

        await createAlbum(request);

        navigate("/bilder/album");
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>
                <div style={{fontWeight: "bold", fontSize: "larger"}}>Skapa album</div>
                <div style={{padding: 5}}>
                    <Card>
                        <TextField 
                            source={request} 
                            property="title" 
                            onEdit={(change) => setRequest({
                                ...request, 
                                ...change
                            })}
                        />
                        <DateField 
                            source={request} 
                            property="date" 
                            onEdit={(change) => setRequest({
                                ...request, 
                                ...change
                            })}
                        />
                    </Card>
                </div>
                <div style={{padding: 5}}>
                    <Button 
                        onClick={onClickCreate}
                        disabled={!request || request.title.length === 0}
                        shape="rounded"
                    >
                        Skapa
                    </Button>
                </div>
            </div>
        </div>
    );
};