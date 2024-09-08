import React from 'react';
import '../style/textField.scss';
import '../style/layout.scss';

export default class NumberField extends React.Component
{
    constructor(props) {
        super(props);

        this.onChange = (event) => {
            const {onEdit, property, source} = this.props;

            onEdit({ 
                [property]: parseInt(event.target.value)
            }, source);
        };
    }

    render() {

        const {
            className, 
            source, 
            property,
            disabled
        } = this.props;

        return (
            <input 
                className={className} 
                onChange={this.onChange}
                type="number" 
                value={source[property]}
                disabled={disabled}
            />
         );
    }
}
