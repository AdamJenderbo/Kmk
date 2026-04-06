import '../style/header.scss';

import { useNavigate } from 'react-router-dom';
import { Menu } from './Menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons'

import { useEffect, useRef, useState } from 'react'


export default function NotificationBell({ notifications, onMarkAsRead }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    
    useEffect(() => {
        async function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    useEffect(() => {
        if (isOpen) {
            const unreadIds = notifications
                .filter(n => !n.isRead)
                .map(n => n.id);

            if (unreadIds.length > 0) {
                onMarkAsRead(unreadIds);
            }
        }
    }, [isOpen]);

    const unreadCount = notifications.filter(x => !x.isRead).length;

    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                display: "inline-block",
                marginRight: 20,
                cursor: "pointer",
            }}
        >
            <div style={{ position: "relative", display: "inline-block" }}>
                <FontAwesomeIcon
                    icon={faBell}
                    size="2x"
                    onClick={() => setIsOpen(o => !o)}
                    style={{
                        color: isOpen ? "#2563eb" : undefined 
                    }}
                />

                {unreadCount > 0 && (
                    <div
                        style={{
                            position: "absolute",
                            top: -4,
                            right: -6,
                            minWidth: 20,
                            height: 20,
                            padding: "0 0px",
                            borderRadius: 999,
                            background: "#ef4444",
                            color: "white",
                            fontSize: 12,
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            lineHeight: 1,
                        }}
                    >
                        {unreadCount}
                    </div>
                )}
        </div>

        {/* Dropdown */}
        {isOpen && (
            <div
                style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: 8,
                    width: 300,
                    background: "white",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    borderRadius: 8,
                    zIndex: 1000,
                }}
            >
                {notifications.map((n, i) => (
                    <div 
                        key={i} 
                        style={{
                        padding: 12,
                        borderBottom: "1px solid #eee",
                        background: n.isRead ? "#f9fafb" : "#eef2ff",
                        fontWeight: n.isRead ? 400 : 600
                    }}>
                        {n.message}
                    </div>
                ))}
            </div>)}
        </div>
    );
}

function ProfileDropdown({ user, logout }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        { label: "Log out", action: logout },
    ];

    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                display: "inline-block",
                marginRight: 20,
                cursor: "pointer",
            }}
        >
            <FontAwesomeIcon
                icon={faUserCircle}
                size="2x"
                onClick={() => setIsOpen(o => !o)}
                style={{ color: isOpen ? "#2563eb" : undefined }}
            />

            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        marginTop: 8,
                        width: 180,
                        background: "white",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                        borderRadius: 8,
                        zIndex: 1000,
                        overflow: "hidden",
                    }}
                >
                    {user && (
                        <div
                            style={{
                                padding: "10px 14px",
                                borderBottom: "1px solid #eee",
                                fontWeight: 600,
                                fontSize: 14,
                                color: "#374151",
                            }}
                        >
                            {`${user.firstName}  ${user.lastName}` }
                        </div>
                    )}
                    {menuItems.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => { setIsOpen(false); item.action(); }}
                            style={{
                                padding: "10px 14px",
                                borderBottom: i < menuItems.length - 1 ? "1px solid #eee" : "none",
                                fontSize: 14,
                                color: "#111827",
                                cursor: "pointer",
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "#f3f4f6"}
                            onMouseLeave={e => e.currentTarget.style.background = "white"}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export const Header = ({ logout, isLoggedIn, notifications, user, readNotifications}) =>
{
    const navigate = useNavigate();

    return (
        <div className="header">
            <div className='title' onClick={() => navigate("/")}>Kungälvs musikkår</div>
            <Menu isLoggedIn={isLoggedIn} user={user}/>
            {isLoggedIn && <div style={{cursor: "pointer", margin: "auto"}}><NotificationBell notifications={notifications} onMarkAsRead={readNotifications}/></div>}
            {isLoggedIn && <div style={{margin: "auto"}}><ProfileDropdown user={user} logout={logout} /></div>}
        </div>
    );
}
