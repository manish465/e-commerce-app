import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, useHistory } from "react-router-dom";
import { useContext, useEffect } from "react";

import Auth from "./pages/Auth";
import Home from "./pages/Home";

import { userContext } from "./context/UserContext";
import { PrivateAuthRoute } from "./PrivateRoutes";

const App = () => {
    const { setAuthData } = useContext(userContext);
    const history = useHistory();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("auth"));
        data ? history.push("/") : history.push("/user");
        setAuthData(
            data
                ? {
                      token: data.token,
                      user: data.user,
                      isAuthenticated: true,
                  }
                : null,
        );
    }, [setAuthData, history]);

    return (
        <Switch>
            <PrivateAuthRoute path='/' exact>
                <Home />
            </PrivateAuthRoute>
            <Route path='/user'>
                <Auth />
            </Route>
        </Switch>
    );
};

export default App;
