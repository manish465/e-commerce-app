import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { userContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [emailData, setEmailData] = useState("");
    const [passwordData, setPasswordData] = useState("");
    const [loading, setLoading] = useState(false);
    const { setAuthData } = useContext(userContext);
    const history = useHistory();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (emailData === "" || passwordData === "") {
            alert("Please enter your email and password");
        } else {
            setLoading(true);
            const data = { email: emailData, password: passwordData };
            fetch("http://localhost:8000/api/user/log-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem("auth", JSON.stringify(data));
                    setAuthData((prev) => ({
                        ...prev,
                        user: data.user,
                        isAuthenticated: true,
                    }));
                })
                .then(() => {
                    setLoading(false);
                    history.push("/");
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <Form className='p-5' onSubmit={(e) => onSubmitHandler(e)}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={emailData}
                    onChange={(e) => setEmailData(e.target.value)}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Password'
                    value={passwordData}
                    onChange={(e) => setPasswordData(e.target.value)}
                />
            </Form.Group>
            <Button
                variant='primary'
                type='submit'
                disabled={loading ? true : false}>
                {loading ? "Loading..." : "Login"}
            </Button>
        </Form>
    );
};

export default Login;
