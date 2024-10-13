
import {
    createBrowserRouter
} from "react-router-dom";
import {
    Login, 
    Register

 } from '../auth/index'


const router = createBrowserRouter([

    {
        path: "/login",
        element: <Login />,

    },
    {
        path: "/register",
        element: <Register />,

    }

])



export default router;