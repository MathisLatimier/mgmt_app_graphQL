import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Clients from "./views/Clients";
import Home from "./components/Home";
import Projects from "./views/Projects";
import Project from "./views/Project";

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
            },
            {
                path: "/projects/:id",
                element: <Project />
            }
        ]
    }
])

export {router}