import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/public/isLogged', { withCredentials: true })
            .then((response) => {
                console.log("zalogowany?:"+response.data)
                setIsLogged(response.data);
            })
            .catch((error) => {
                console.error('Error checking login status:', error);
                setIsLogged(false);
            });
    }, []);


    const login = () => {
        window.location.href = "http://localhost:8080/login";
    };

    // Logout handler
    const logout = () => {
        window.location.href = "http://localhost:8080/logout";
    };

    return (
        <UserContext.Provider value={{ isLogged, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};