import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token);

        if (!token) {
            navigate('/login'); 
        } else {
            try {
                const user = jwtDecode(token);
                if (user.role !== 'admin') {
                    navigate('/authorization'); 
                }
            } catch (error) {
                console.error("Erreur lors du décodage du token :", error);
                navigate('/login'); 
            }
        }
    }, [navigate]); 

    const token = Cookies.get('token');
    try {
        const user = jwtDecode(token);
        if (user.role === 'admin') {
            return children;
        } else {
            return null; 
        }
    } catch (err) {
        console.log(err)

    }
};

export default ProtectedRoute;
