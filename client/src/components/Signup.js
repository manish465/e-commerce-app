import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Signup = () => {
    const [emailData, setEmailData] = useState("");
    const [passwordData, setPasswordData] = useState("");
    const [loading, setLoading] = useState(false);
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (emailData === "" || passwordData === "") {
            alert("Please enter your email and password");
        } else {
            setLoading(true);
            const data = { email: emailData, password: passwordData };
            fetch("http://localhost:8000/api/user/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then(() => {
                    setLoading(false);
                    alert("sign up completed");
                });
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
                {loading ? "Loading..." : "Sign up"}
            </Button>
        </Form>
    );
};

export default Signup;
