import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Clients from "./views/Clients";
import Home from "./components/Home";
import Projects from "./views/Projects";
import Project from "./components/Project";
import EditProject from "./components/EditProject";
import Client from "./components/Client";

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
                path: "/clients/:id",
                element: <Client />
            },
            {
                path: "/projects",
                element: <Projects />
            },
            {
                path: "/projects/:id",
                element: <Project />
            },
            {
                path: "/projects/:id/edit",
                element: <EditProject />
            }
        ]
    }
])

export {router}