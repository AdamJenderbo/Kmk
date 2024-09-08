import '../style/user.scss';
import '../style/card.scss';

import React from 'react';


export default function Checkbox({source, property, onEdit}) {

    const onChange = (event) => {
        const value = event.target.value;

        onEdit({[property]: value});
    }

    return <input type="checkbox" name="Test" value={source[property]} onChange={onChange}/>;
}