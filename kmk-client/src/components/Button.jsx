import '../style/button.scss';

import React from 'react';

export default class Button extends React.Component
{

    render() {

        const {className, children, disabled, onClick, shape} = this.props;


        return (
            <button 
                className={`button ${className ? className : ""} ${disabled ? "disabled" : ""}`} 
                disabled={disabled} 
                onClick={onClick}
                style={{
                    borderRadius: shape === "circle" ? 100 : shape == "rounded" ? 12 : 0
                }}
            >
                {children}
            </button>
         );
    }
}