import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';


export default class Icon extends React.Component
{
    render() {

        const { type, style } = this.props;

        return (
            <div  
                className="icon" 
                style={style}
            >
                <FontAwesomeIcon icon={type} />
            </div>
         );
    }
}