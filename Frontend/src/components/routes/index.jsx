
import {
    createBrowserRouter
} from "react-router-dom";
import {
    Login, 
 } from '../auth/index'


const router = createBrowserRouter([

    {
        path: "/login",
        element: <Login />,

    }

])



export default router;