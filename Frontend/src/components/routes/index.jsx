import { createBrowserRouter } from "react-router-dom";
import { 
    Login, 
    Register 
} from '../auth';

import Layouts from "../Layouts/layouts";

import {
    Dashboard,
    AjouterMovie,
    AllMovies
} from "../Admin";
import {
    CreateReservation
} 
from '../Client/reservation'

import {
    Movies,
    MoviesDetails,
    Video,
    Favorits
} 
from '../Client'

const router = createBrowserRouter([
    {
        element: <Layouts />,
        children: [
            {
                path: "/admin",
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
        path : "/seance/:id",
        element : <CreateReservation />
    },
    {
         path : "/watch/:id",
        element : <Video />
    },

    {
        path : "/favorits",
        element : <Favorits />
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
