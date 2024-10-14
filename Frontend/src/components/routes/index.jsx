
import {
    createBrowserRouter
} from "react-router-dom";
import {
    Login, 
    Register

 } from '../auth/index'
import Layouts from "../Layouts/layouts";


const router = createBrowserRouter([


{
    element: <Layouts/>,
    children : [

    ],
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
        element: <h1>Page Not Found</h1>
    }

])



export default router;