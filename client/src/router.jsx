import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Clients from "./components/Clients";
import Home from "./components/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/clients",
                element: <Clients />
            }
        ]
    }
])

export {router}