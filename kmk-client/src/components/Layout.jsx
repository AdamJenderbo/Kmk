import '../style/user.scss';
import '../style/card.scss';

import { Outlet } from 'react-router-dom';
import Page from '../pages/Page';
import { Header } from './Header';


export default function Layout({login, logout, isLoggedIn, notifications, readNotifications, user}) {


    return (
        <div>
            <Header 
                isLoggedIn={isLoggedIn} 
                login={login} 
                logout={logout} 
                notifications={notifications}
                readNotifications={readNotifications} 
                user={user}
            />
            <Page>
                <Outlet/>
            </Page>
        </div>
    );
}
