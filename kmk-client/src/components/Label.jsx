import React from 'react';
import '../style/label.scss';

export default class Label extends React.Component
{
    constructor(props) {
        super(props);

        this.onChange = (event) => {
            const {onEdit, property, source} = this.props;
            const value = event.target.value;
            onEdit({ [property]: parseInt(value)}, source);
        };
    }

    render() {

        const { children, label } = this.props;

        return (
            <div className="label">
                <div>{label}</div>
                {children}
            </div>
         );
    }
}
