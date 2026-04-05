import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../../style/dateField.scss';

export const DateField = ({source, property, onEdit}) => {

    const onChange = (date) => {
        onEdit({[property]: date});
    }

    return (
        <DatePicker className='dateField' selected={source[property]} onChange={onChange} />
    );
}
