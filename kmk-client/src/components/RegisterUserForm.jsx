import '../style/login.scss';
import '../style/card.scss';
import '../style/button.scss';

import PasswordField from './PasswordField';
import React from 'react';
import TextField from './TextField';
import { instrumentOptions } from '../actions/instrument,';
import SelectField from './SelectField';
import Label from './Label';
import { DateField } from './fields/DateField';

export default class RegisterUserForm extends React.Component
{
    render() {
        
        const {form, onEdit} = this.props;

        return (
            <div>
                <Label label="Förnamn">
                    <TextField source={form} property="firstName" onEdit={onEdit}/>
                </Label>
                <Label label="Efternamn">
                    <TextField source={form} property="lastName" onEdit={onEdit}/>
                </Label>
                <Label label="Födelsedag">
                    <DateField source={form} property="dateOfBirth" onEdit={onEdit}/>
                </Label>
                <Label label="Email">
                    <TextField source={form} property="email" onEdit={onEdit}/>
                </Label>
                <Label label="Telefonnummer">
                    <TextField source={form} property="phoneNumber" onEdit={onEdit}/>
                </Label>
                <Label label="Adress">
                    <TextField source={form} property="address" onEdit={onEdit}/>
                </Label>
                <Label label="Intrument">
                    <SelectField source={form} property="instrument" onEdit={onEdit} options={instrumentOptions}/>
                </Label>
                <Label label="Lösenord">
                    <PasswordField source={form} property="password" onEdit={onEdit}/>
                </Label>
                <Label label="Bekräfta lösenord">
                    <PasswordField source={form} property="passwordConfirm" onEdit={onEdit}/>
                </Label>
            </div>
         );
    }
}
