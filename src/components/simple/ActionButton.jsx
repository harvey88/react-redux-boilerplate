import React from 'react';
import {Link} from 'react-router-dom';

const ActionButton = (props) => {

    let className = 'ping_button ';
    if (props.type) {
        className += `ping_button--${props.type}`;
    }
    if (props.path) {
        return (
            <Link className={className} to={props.path}>
                {props.text}
            </Link>
        )
    }
    return (
        <button style={props.style}
                className={className}
                onClick={props.onClick}
                type={props.actionType}
        >
            {props.text}
        </button>
    );
}

export default ActionButton;