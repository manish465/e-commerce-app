import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Auth = () => {
    const [key, setKey] = useState("signup");
    return (
        <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className='w-100 h-100 mx-auto'>
            <Tab eventKey='signup' title='Sign Up'>
                <Signup />
            </Tab>
            <Tab eventKey='login' title='Login'>
                <Login />
            </Tab>
        </Tabs>
    );
};

export default Auth;
