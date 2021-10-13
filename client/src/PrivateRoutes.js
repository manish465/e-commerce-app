import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { userContext } from "./context/UserContext";

export const PrivateAuthRoute = ({ children, ...rest }) => {
    const { authData } = useContext(userContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                authData ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/user",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};
