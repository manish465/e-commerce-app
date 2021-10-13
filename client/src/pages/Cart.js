import { useContext, useEffect, useState } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";

import { productContext } from "../context/ProductContext";

const Cart = () => {
    const { cart, dispatch } = useContext(productContext);
    const [totalPrice, setTotalPrice] = useState(0.0);

    useEffect(() => {
        setTotalPrice(
            cart
                .reduce(
                    (total, product) =>
                        total + product.price * product.quantity,
                    0,
                )
                .toFixed(2),
        );
    }, [cart]);

    return (
        <Container className='m-2'>
            <h1>Your Order : </h1>
            {cart.length === 0 ? (
                <h3>No Item Added</h3>
            ) : (
                cart.map((item, key) => (
                    <ListGroup key={key} horizontal>
                        <ListGroup.Item>{key + 1}</ListGroup.Item>
                        <ListGroup.Item>{item.title}</ListGroup.Item>
                        <ListGroup.Item>${item.price}</ListGroup.Item>
                        <ListGroup.Item>{item.quantity}</ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                variant='secondary'
                                onClick={() =>
                                    dispatch({
                                        type: "REMOVE_FROM_LIST",
                                        payload: { id: item.id },
                                    })
                                }>
                                REMOVE
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                ))
            )}
            <h2>TOTAL : ${totalPrice}</h2>
            <Button variant='primary'>CHECKOUT</Button>
        </Container>
    );
};

export default Cart;
