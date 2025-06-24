import { createContext, useState } from "react";

export const AppContent = createContext();

export const AppContentProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);

    const value = {
        backendUrl,
        isLoggedin,
        userData,
        setIsLoggedin,
        setUserData
    };

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    );
};
