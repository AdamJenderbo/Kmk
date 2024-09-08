import '../style/user.scss';
import '../style/card.scss';

import React from 'react';
import { Outlet } from 'react-router-dom';
import Page from '../pages/Page';
import { Header } from './Header';


export default function Layout({login, logout, isLoggedIn, user}) {


    return (
        <div>
            <Header isLoggedIn={isLoggedIn} login={login} logout={logout} user={user}/>
            <Page>
                <Outlet/>
            </Page>
        </div>
    );
}
