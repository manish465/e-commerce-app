import { createContext, useState } from "react";

export const userContext = createContext();

const UserContext = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    return (
        <userContext.Provider value={{ authData, setAuthData }}>
            {children}
        </userContext.Provider>
    );
};

export default UserContext;
