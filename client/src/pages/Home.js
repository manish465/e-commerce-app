import { useContext, useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";

import { productContext } from "../context/ProductContext";

const Home = () => {
    const [data, setData] = useState(null);
    const { dispatch } = useContext(productContext);
    useEffect(() => {
        fetch("http://localhost:8000/api/products/show", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setData(data));
    }, [data]);
    return (
        <Container fluid className='d-flex flex-wrap shadow'>
            {data
                ? data.products.map((product, key) => (
                      <Card
                          key={key}
                          style={{ width: "18rem" }}
                          className='m-5'>
                          <Card.Img variant='top' src={product.imgUrl} />
                          <Card.Body>
                              <Card.Title>{product.title}</Card.Title>
                              <Card.Text>{product.decs}</Card.Text>
                              <Card.Text>price : ${product.price}</Card.Text>
                              <Button
                                  onClick={() => {
                                      dispatch({
                                          type: "ADD_TO_CART",
                                          payload: {
                                              id: product._id,
                                              title: product.title,
                                              price: product.price,
                                              quantity: 1,
                                          },
                                      });
                                      alert("item added to cart");
                                  }}
                                  variant='primary'>
                                  Add To Cart
                              </Button>
                          </Card.Body>
                      </Card>
                  ))
                : "Loading..."}
        </Container>
    );
};

export default Home;
