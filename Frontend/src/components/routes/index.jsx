import { createBrowserRouter } from "react-router-dom";
import {
    Login,
    Register,
    ForgetPassword,
    ResetPassword,

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

import {
    CreateSalle,
    ListSalles
} from "../Admin/salle";


import {
    AddSeance,
    ListSeances
}
    from '../Admin/seance'


import {
    NotFound ,
    Home
} 
from "../pages"

import {
    UserProfile
}
from "../Client/profile"

import Authorization from "./authorization";





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
                path: "/List_Movies",
                element: <AllMovies />
            },
            {
                path: "/Add_Seance",
                element: <AddSeance />
            },
            {
                path: "/List_seances",
                element: <ListSeances />
            },
            {
                path: "/add_salle",
                element: <CreateSalle />
            },
            {
                path : "/listSalle",
                element : <ListSalles />
                
            }
        ],
    },
    {
        path : "/authorization",
        element : <Authorization />

    },
    {
        path : "/",
        element: <Home />

    },
    {
        path: "/me/:userId",
        element : <UserProfile />

    },
    {
        path: "/films/:id",
        element: <MoviesDetails />
    },
    {
        path: "/me/:id",
        element: <UserProfile />
    },
    {
        path: "/seance/:id",
        element: <CreateReservation />
    },
    {
        path: "/watch/:id",
        element: <Video />
    },

    {
        path: "/favorits",
        element: <Favorits />
    },


    {
        path: "/movies",
        element: <Movies />
    },

    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/forgot_password",
        element: <ForgetPassword />,
    },
    {
        path: "/reset_password/:token",
        element: <ResetPassword />,
    },

    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/*",
        element: <NotFound />,
    },
]);

export default router;
