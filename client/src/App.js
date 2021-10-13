import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, useHistory, Link } from "react-router-dom";
import { useContext, useEffect } from "react";

import { Container, Nav, Navbar } from "react-bootstrap";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

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
        <>
            <Navbar bg='dark' variant='dark' expand='lg'>
                <Container>
                    <Navbar.Brand>
                        <Link to='/'>E-COMMS</Link>
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link>
                            <Link to='/cart'>Cart</Link>
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                localStorage.removeItem("auth");
                                history.push("/user");
                            }}>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Switch>
                <PrivateAuthRoute path='/' exact>
                    <Home />
                </PrivateAuthRoute>
                <Route path='/user'>
                    <Auth />
                </Route>
                <Route path='/cart'>
                    <Cart />
                </Route>
            </Switch>
        </>
    );
};

export default App;
