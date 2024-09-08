import React from 'react';
import '../style/textField.scss';
import '../style/layout.scss';

export default class TextField extends React.Component
{
    constructor(props) {
        super(props);

        this.onChange = (event) => {
            const {onEdit, property, source} = this.props;

            onEdit({ 
                [property]: event.target.value 
            }, source);
        };
    }

    render() {

        const {
            className, 
            source, 
            property,
            disabled,
            placeholder
        } = this.props;

        return (
            <input 
                className={className} 
                onChange={this.onChange}
                type="text" 
                value={source[property]}
                disabled={disabled}
                placeholder={placeholder}
            />
         );
    }
}
