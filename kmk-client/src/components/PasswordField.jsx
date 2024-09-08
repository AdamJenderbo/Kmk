

import React from 'react';
import '../style/passwordField.scss';

export default class PasswordField extends React.Component
{
    constructor(props) {
        super(props);

        this.onChange = (event) => {
            const {onEdit, property, source} = this.props;
            const value = event.target.value;
            onEdit({ [property]: value }, source);
        };
    }

    render() {

        const {source, property} = this.props;

        return (
            <div>
                <input type="password" value={source[property]} onChange={this.onChange}></input>
            </div>
         );
    }
}
