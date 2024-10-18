import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';  
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
        const token = Cookies.get('token');

        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded);
                
                setUser(decoded);  
            } catch (err) {
                console.error("Failed to decode token", err);
                Swal.fire('Error', 'Invalid token', 'error');
            } finally {
                setLoading(false);
            }
        } else {
            Swal.fire('Error', 'No token found', 'error');
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>No user profile found</div>;
    }

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Add more fields as needed */}
        </div>
    );
}
