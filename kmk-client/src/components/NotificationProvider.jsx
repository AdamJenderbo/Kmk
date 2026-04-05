import { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

export function useNotifications() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    
    async function loadNotifications() {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        setNotifications(data);
    }

    // Load once when app starts
    useEffect(() => {
        loadNotifications();
    }, []);

    // Poll every 30s (simple & very effective)
    useEffect(() => {
        const interval = setInterval(loadNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    function markAsRead(id) {
        setNotifications(n =>
            n.map(x => (x.id === id ? { ...x, read: true } : x))
        );

        fetch(`/api/notifications/${id}/read`, { method: "POST" });
    }
    
    const unreadCount = notifications.filter(n => !n.read).length;
    
    return (
        <NotificationContext.Provider
            value={{ notifications, unreadCount, markAsRead }}
        >
        {children}
    </NotificationContext.Provider>);
}