import '../style/header.scss';

import Button from './Button';
import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions/authentication';
import { Menu } from './Menu';


const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(logOut())
    }
}

const LogOutButton = ({logOut}) => {

    return (           
         <Link to="/login">
            <Button onClick={logOut}>
                Logga ut
            </Button>
        </Link>
    );
}

const TopBar = ({logOut, title}) => 
{
    return (
        <div className="header">
            <div className='title'>{title}</div>
            <Menu/>
            {/* <LogOutButton logOut={logOut}/> */}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)