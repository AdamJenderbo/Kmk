import React from 'react';
import '../style/selectField.scss';

export default class SelectField extends React.Component
{
    constructor(props) {
        super(props);

        this.onChange = (event) => {
            const {onEdit, property, source} = this.props;
            const value = event.target.value;
            onEdit({ [property]: value}, source);
        };
    }

    render() {

        const { className, source, property, options, nulloption, disabled} = this.props;

        const value = source ? source[property] : undefined;

        return (
            <select className={className} value={value} onChange={this.onChange} disabled={disabled}>
                {nulloption && <option value={undefined}>{""}</option>}
                {options.map((option, index) => <option key={index} value={option.value}>{option.text}</option>)}
            </select>
         );
    }
}
