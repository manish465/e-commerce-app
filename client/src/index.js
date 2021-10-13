import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

import UserContext from "./context/UserContext";
import ProductContext from "./context/ProductContext";

ReactDOM.render(
    <ProductContext>
        <UserContext>
            <Router>
                <App />
            </Router>
        </UserContext>
    </ProductContext>,
    document.getElementById("root"),
);
