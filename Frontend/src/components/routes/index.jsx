import { createBrowserRouter } from "react-router-dom";
import { 
    Login, 
    Register 
} from '../auth/index';

import Layouts from "../Layouts/layouts";

import {
    Dashboard,
    AjouterMovie,
    AllMovies
} from "../Admin/index";

import {
    Movies,
    MoviesDetails,
    Vedio
} 
from '../Client/index'

const router = createBrowserRouter([
    {
        element: <Layouts />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/Add_Movies",
                element: <AjouterMovie />
            },
            {
                path : "/List_Movies",
                element : <AllMovies />
            }
        ],
    },
    {
            path : "/films/:id",
            element : <MoviesDetails />
    },
    {
         path : "/watch/:id",
        element : <Vedio />
    },
   

    {
        path : "/movies",
        element : <Movies />
    },  

    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/*",
        element: <h1>Page Not Found</h1>,
    },
]);

export default router;
