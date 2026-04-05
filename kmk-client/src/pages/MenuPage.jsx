import '../style/menu.scss';
import '../style/card.scss';

import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions/authentication';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';


function Item({item}) {
    return (
        <div className="menuItem">
            <Link to={item.path}>
                <Icon type={item.icon}></Icon>
                <div className="text">{item.text}</div>
            </Link>
        </div>
    )
}

function Group({group}) {
    return (
        <div className='page'>
            <div className="menuGroupHeader">{group.group}</div>
            <div className="menuItemGroup">
                {group.items.map((item, index) => <Item key={index} item={item}/>)}
            </div>
        </div>
    )
}

class MenuPage extends React.Component
{

    render() {

        const menuDef = [{group: "Händelser", items: [
            {icon: "calendar", text: "Kalender", path: "/calendar"}, 
            {icon: "calendar-plus", text: "Skapa händelse", path: "/calendar/event/create"}
        ]}]

        return (
            <div className="page">
                {/* <Header title={"Meny"}/> */}
                {menuDef.map((group, index) => <Group key={index} group={group}/>)}
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        form: state.user.register.form,
        isLoggedIn: state.authentication.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: (email, password) => dispatch(logIn(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage)