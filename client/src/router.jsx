import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Clients from "./components/Clients";
import Home from "./components/Home";
import Projects from "./components/Projects";

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
            },
            {
                path: "/projects",
                element: <Projects />
            }
        ]
    }
])

export {router}