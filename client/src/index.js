import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import UserContext from "./context/UserContext";

ReactDOM.render(
    <UserContext>
        <Router>
            <App />
        </Router>
    </UserContext>,
    document.getElementById("root"),
);
