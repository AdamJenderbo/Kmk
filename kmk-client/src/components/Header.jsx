import '../style/header.scss';

import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { Menu } from './Menu';
import Icon from './Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Header = ({ logout, isLoggedIn, user}) => 
{
    const navigate = useNavigate();

    return (
        <div className="header">
            <div className='title' onClick={() => navigate("/")}>Kungälvs musikkår</div>
            <Menu isLoggedIn={isLoggedIn} user={user}/>
            {!isLoggedIn && <Link style={{margin: 20}}  to="/register">Bli medlem</Link>}
            {!isLoggedIn && <Link style={{margin: 20}} to={"/login"} >Logga in</Link>}
            {isLoggedIn && <Link style={{margin: 20}}  to={"/"} onClick={logout}>Logga ut</Link>}
            {isLoggedIn && <div style={{margin: 20}}>{`${user.firstName} ${user.lastName}`}</div>}
            {isLoggedIn && <Link to={"/notifikationer"} style={{margin: 20}}>{"Notifikationer"}</Link>}
        </div>
    );
}
