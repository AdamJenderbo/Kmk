import '../style/card.scss';
import '../style/button.scss';

import React from 'react';
import TextField from './TextField';
import Button from './Button';
import Label from './Label';

export const RegisterArrangement = ({arrangement, editArrangement, registerArrangement}) => {

    const valid = 
        arrangement.title.length > 0 && 
        arrangement.composer.length > 0 && 
        arrangement.arranger.length > 0;

    return (<div>
        <h3>Registrera arrangemang</h3>
        <Label label="Löpnummer">
            <TextField source={arrangement} property="serialNumber" onEdit={editArrangement}/>
        </Label>
        <Label label="Titel">
            <TextField source={arrangement} property="title" onEdit={editArrangement}/>
        </Label>
        <Label label="Kompositör">
            <TextField source={arrangement} property="composer" onEdit={editArrangement}/>
        </Label>
        <Label label="Arrangör">
            <TextField source={arrangement} property="arranger" onEdit={editArrangement}/>
        </Label>
        <Button onClick={registerArrangement} disabled={!valid}>Registrera</Button>
    </div>);
}