import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
    const [user, setUser] = useState(null);

    const [favorit, setFavorit] = useState([]);
    const path = import.meta.env.VITE_BACK_END_URI;
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();
    const token = Cookies.get('token');

    const userProfil = async () => {
        try {
            const response = await axios.get(`${path}/auth/me/${userId}`, {
                headers: {
                    'accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            //console.log(response.data.user);

            setUser(response.data.user);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `Oops... ${err}`,
                text: 'Something went wrong!',
            });
        } finally {
            setLoading(false);
        }
    };

    const UserFavorit = async () => {
        try {
            const response = await axios.get(`${path}/favoris/getUserFavori/${userId}`, {
                headers: {
                    'accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data.userFavoris);
            setFavorit(response.data.userFavoris)
        }
        catch (err) {
            Swal.fire({
                icon: 'error',
                title: `Oops... ${err}`,
                text: 'Something went wrong!',
            });

        }


    }













    useEffect(() => {
        userProfil();
        UserFavorit();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen gap-5">
                <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
            </div>
        );
    }



    if (!user) {
        return <div>No user profile found</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>First Name:</strong> {user.firstname}</p>
                        <p><strong>Last Name:</strong> {user.lastname}</p>
                    </div>
                    <div>
                        <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
                        <p><strong>Verified:</strong> {user.isVerified ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Favorite Films</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorit.map((film) => (
                        <div key={film._id} className="bg-gray-100 p-4 rounded-lg shadow-lg">
                            {film.filmId && film.filmId.image ? (
                                <img
                                    src={`http://localhost:3000/${film.filmId.image}`}
                                    alt={film.title}
                                    className="w-full h-38 object-cover rounded-lg mb-4"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                                    <span className="text-gray-500">No Image Available</span>
                                </div>
                            )}
                            <h3 className="text-lg font-bold">{film.title}</h3>
                            <p className="text-sm text-gray-700"><strong>Genre:</strong> {film.filmId.genre}</p>
                            <p className="text-sm text-gray-700"><strong>Director:</strong>{new Date(film.filmId.publishedDate).toLocaleDateString()}</p>
                            <p className="text-sm mt-2">{film.description}</p>
                            <a
                                href={`/watch/${film.filmId._id}`}
                                className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Watch Movie
                            </a>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
