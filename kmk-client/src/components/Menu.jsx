import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Role } from "../actions/user";

const MenuDropDown = ({item, onClickOutside, onClickChild, user}) =>{

    // const ref = useOutsideClick(onClickOutside);

    const navigate = useNavigate();

    const menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if(!menuRef.current.contains(e.target)) {
                onClickOutside();
            }
        }

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    })

    const onClick = (event, child) => {
        event.stopPropagation();
        navigate(child.link);
        onClickChild();
    }

    const hasRole = (child) => {
        if (!child.roles || child.roles.length === 0) {
            return true;
        }

        return child.roles.some(childRole => user.roles.includes(childRole));
    };

    return(
            <div ref={menuRef} className='menuDropdown'>
                <div className='dropDownChildren'>
                    {item.children.filter(child => hasRole(child)).map((child, index) => (
                        <div key={index} className='dropDownChild' onClick={(event) => onClick(event, child)}>
                            <div className="text">{child.label}</div>
                        </div>))}
                </div>
            </div>
        );
}


const MenuItem = ({item, onClick, selected, onClickOutsideDropdown, onClickChild, user, active}) => {

    const handleOnClick = (event) => {
        event.stopPropagation();

        if(item.children.length === 0 && item.link) {
            navigate(item.link)
        }

        onClick(item);
    }

    const navigate = useNavigate();

    return (            
        <div className={`menuButton  ${active ? "active" : ""}`} onClick={handleOnClick}>
            <div className={`menuText ${active ? "active" : ""}`}>
                {item.label}
            </div>
            {selected && item.children.length > 0 && <MenuDropDown 
                item={item} 
                onClickChild={onClickChild}
                onClickOutside={onClickOutsideDropdown}
                user={user}
            />}
        </div>)

};


export const Menu = ({isLoggedIn, user}) => {

    const [selectedItem, setSelectedItem] = useState(undefined);

    const location = useLocation();

    const onClickItem = (item) => {
        setSelectedItem(item);
    }

    const onClickOutsideDropdown = () => {
        setSelectedItem(undefined);
    }
    const onClickChild = () => {
        console.log("click child");
        setSelectedItem(undefined);
    }

    const arrangements = {
        label: "Noter",
        login: true,
        base: "noter",
        children: [{
            label: "Sök arrangemang",
            link: "/noter"
        }, {
            label: "Lägg till arrangemang",
            link: "/noter/lagg-till",
            roles: [Role.Admin, Role.Arrangement]
        }]
    };

    const users = {
        label: "Medlemmar",
        login: true,
        base: "medlemmar",
        children: [{
            label: "Sök medlem",
            link: "/medlemmar"
        }, {
            label: "Medlemsansökningar",
            link: "/medlemmar/unapproved",
            roles: [Role.Admin, Role.BoardDeputy]
        }]
    }

    const log = {
        label: "Logg",
        login: true,
        base: "logg",
        children: [{
            label: "Logg",
            link: "/logg",
            roles: [Role.Admin]
        }]
    }

    const images = {
        label: "Bilder",
        login: true,
        base: "bilder",
        children: [{
            label: "Album",
            link: "/bilder/album"
        }, {
            label: "Skapa album",
            link: "/bilder/album/skapa",
            roles: [Role.Admin]
        }, {
            label: "Ladda upp bild",
            link: "/bilder/ladda-upp",
            roles: [Role.Admin]
        }]
    };

    const menuDef = [arrangements, users, log];

    return (<div className='menu'>
        <div className='menuButtons'>
            {menuDef.filter(x => (isLoggedIn && user.approved) || !x.login ).map((item, index) => (
                <MenuItem
                    key={index}
                    item={item}
                    onClick={onClickItem} 
                    selected={selectedItem && item.label === selectedItem.label}
                    onClickOutsideDropdown={onClickOutsideDropdown}
                    onClickChild={onClickChild}
                    user={user}
                    active={location.pathname.includes(item.base)}
                />
            ))}
        </div>
    </div>)
}