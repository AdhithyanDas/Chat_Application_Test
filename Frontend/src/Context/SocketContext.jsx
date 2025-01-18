import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const socketContext = createContext();

function SocketContext({ children }) {
    const [socket, setSocket] = useState(null);
    const [userId, setUserId] = useState(sessionStorage.getItem('userId'));

    useEffect(() => {
        if (userId) {
            const newSocket = io('http://localhost:3000', {
                query: { userId },
            });
            setSocket(newSocket);

            return () => newSocket.disconnect();
        }
    }, [userId]);

    // login
    const handleLoginSubmit = (newUserId) => {
        setUserId(newUserId);
    };

    // logout
    const handleLogout = () => {
        sessionStorage.clear();
        setUserId(null);
    };

    return (
        <socketContext.Provider value={{ socket, handleLoginSubmit, handleLogout }}>
            {children}
        </socketContext.Provider>
    );
}

export default SocketContext;
