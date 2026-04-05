import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from 'react-redux';
import RegisterUserPage from './pages/user/RegisterUserPage';
import SearchUserContainer from './containers/user/SearchUserContainer';
import CreateUserPage from './pages/user/CreateUserPage';
import EditUserContainer from './containers/user/EditUserContainer';
import EditArrangementContainer from './containers/arrangement/EditArrangementContainer';
import SearchArrangementContainer from './containers/arrangement/SearchArrangementContainer';
import CreateArrangementContainer from './containers/arrangement/CreateArrangementContainer';
import LayoutContainer from './containers/LayoutContainer';
import UnapprovedUsersConainter from './containers/user/UnapprovedUsersConainter';
import { PendingUserPage } from './pages/user/PendingUserPage';
import FrontContainer from './containers/FrontContainer';
import HomeContainer from './containers/HomeContainer';
import ChatContainer from './containers/chat/ChatContainer';
import CalendarContainer from './containers/calendar/CalendarContainer';
import CreateEventContainer from './containers/calendar/CreateEventContainer';
import EventContainer from './containers/calendar/EventContainer';
import NotificationsContainer from './containers/notification/NotificationsContainer';
import UploadImageContainer from './containers/images/UploadImageContainer';
import CreateAlbumContainer from './containers/images/CreateAlbumContainer';
import AlbumsContainer from './containers/images/AlbumsContainer';
import AlbumContainer from './containers/images/AlbumContainer';
import LogContainer from './log/LogContainer';
import CreateSheetMusicPage from './components/CreateSheetMusicPage';

const mapStateToProps = state => {
    return {
        isLoggedIn: state.authentication.isLoggedIn,
        user: state.user.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}


function Router({isLoggedIn, user}) {
	return (
        <BrowserRouter>
            <Routes>
                {!isLoggedIn && <Route path="/" element={<LayoutContainer/>}>
                    <Route index element={<FrontContainer/>}/>
                    <Route path="register" element={<RegisterUserPage/>}/>
                </Route>}

                {!isLoggedIn && <Route path="/" element={<FrontContainer/>}/>}

                {isLoggedIn && user && !user.approved &&
                        <Route path="/" element={<LayoutContainer/>}>
                        <Route index element={<PendingUserPage/>}/>
                    </Route>
                }

                {isLoggedIn && user && user.approved &&
                    <Route path="/" element={<LayoutContainer/>}>
                        <Route index element={<HomeContainer/>}/>
                        {/* <Route path="chat" element={<ChatContainer/>}/> */}
                        {/* <Route>
                            <Route path="kalender" element={<CalendarContainer/>}/>
                            <Route path="kalender/evenemang/:id" element={<EventContainer/>}/>
                            <Route path="kalender/evenemang/skapa" element={<CreateEventContainer/>}/>
                        </Route> */}
                        <Route>
                            <Route path="noter" element={<SearchArrangementContainer/>}/>
                            <Route path="noter/:id" element={<EditArrangementContainer/>}/>
                            <Route path="noter/lagg-till" element={<CreateArrangementContainer/>}/>
                        </Route>
                        <Route>
                            <Route path="medlemmar" element={<SearchUserContainer/>}/>
                            <Route path="medlemmar/create" element={<CreateUserPage/>}/>
                            <Route path="medlemmar/:id" element={<EditUserContainer/>}/>
                            <Route path="medlemmar/unapproved" element={<UnapprovedUsersConainter/>}/>
                        </Route>
                        <Route>
                            <Route path="logg" element={<LogContainer/>}/>
                        </Route>
                        <Route>
                            <Route path="sheetmusic" element={<CreateSheetMusicPage/>}/>
                        </Route>
                        {/* <Route>
                            <Route path="bilder/album" element={<AlbumsContainer/>}/>
                            <Route path="bilder/album/:id" element={<AlbumContainer/>}/>
                            <Route path="bilder/album/skapa" element={<CreateAlbumContainer/>}/>
                            <Route path="bilder/ladda-upp" element={<UploadImageContainer/>}/>
                        </Route> */}
                        <Route path="notifikationer" element={<NotificationsContainer/>}/> 
                    </Route>
                }
            </Routes>
        </BrowserRouter>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Router)