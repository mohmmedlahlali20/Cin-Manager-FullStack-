import Cookies from 'js-cookie';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useParams} from 'react-router-dom';

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [favorit, setFavorit] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const path = import.meta.env.VITE_BACK_END_URI;
    const [loading, setLoading] = useState(true);
    const {userId} = useParams();
    const token = Cookies.get('token');

    const defaultAvatar = "https://via.placeholder.com/150?text=No+Avatar";

    const userProfil = async () => {
        try {
            const response = await axios.get(`${path}/auth/me/${userId}`, {
                headers: {
                    'accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data.user)
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
            setFavorit(response.data.userFavoris);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `Oops... ${err}`,
                text: 'Something went wrong!',
            });
        }
    };

    useEffect(() => {
        userProfil();
        UserFavorit();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen gap-5">
                <div className="w-4 h-4 rounded-full bg-teal-500 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-teal-500 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-teal-500 animate-bounce [animation-delay:-.5s]"></div>
            </div>
        );
    }

    if (!user) {
        return <div>No user profile found</div>;
    }

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-gray-300">
            <div className="lg:flex gap-12">
                <div
                    className="lg:w-1/3 h-auto bg-teal-800 text-white shadow-2xl rounded-2xl p-8 mb-12 lg:mb-0 transition-transform transform hover:-translate-y-1 hover:shadow-lg">
                    <h1 className="text-4xl font-extrabold mb-8 text-teal-200 tracking-widest uppercase">Profile</h1>

                    <div className="space-y-8">
                        <div className="flex justify-center">
                            <img
                                src={defaultAvatar}
                                alt="User Avatar"
                                className="w-40 h-40 rounded-full shadow-xl object-cover ring-4 ring-teal-300 hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="space-y-6 text-lg">
                            <p className="font-semibold">
                                <span className="text-teal-400">Email:</span> {user.email}
                            </p>
                            <p className="font-semibold">
                                <span className="text-teal-400">First Name:</span> {user.firstname}
                            </p>
                            <p className="font-semibold">
                                <span className="text-teal-400">Last Name:</span> {user.lastname}
                            </p>
                            <p className="font-semibold">
                                <span
                                    className="text-teal-400">Date of Birth:</span> {new Date(user.dateOfBirth).toLocaleDateString()}
                            </p>
                            <p className="font-semibold">
                                <span className="text-teal-400">Verified:</span> {user.isVerified ? 'Yes' : 'No'}
                            </p>
                        </div>


                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={togglePopup}
                                className="bg-teal-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-teal-700 transition-colors">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                    {showPopup && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-teal-500 to-teal-700 w-96">
                                <h2 className="mb-4 text-xl font-semibold text-white text-center">
                                    <span className="text-2xl ">Edit Profile</span>
                                </h2>
                                <div>
                                    <label htmlFor="firstname" className="block mb-2">
                                        First Name:
                                        <input
                                            type="text"
                                            id="firstname"
                                            name="firstname"
                                            value={user.firstname}
                                            onChange={(e) => setUser({...user, firstname: e.target.value})}
                                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </label>

                                    <label htmlFor="lastname" className="block mb-2">
                                        Last Name:
                                        <input
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                            value={user.lastname}
                                            onChange={(e) => setUser({...user, lastname: e.target.value})}
                                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-bottom"/>

                                    </label>
                                    <label htmlFor="lastname" className="block mb-2">
                                        Email :
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={user.email}
                                            onChange={(e) => setUser({...user, email: e.target.value})}
                                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-bottom"/>

                                    </label>
                                    <label htmlFor="dateOfBirth" className="block mb-2">
                                        birth day :
                                        <input
                                            type="text"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            value={new Date(user.dateOfBirth).toLocaleDateString()}
                                            onChange={(e) => setUser({...user, dateOfBirth: e.target.value})}
                                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-bottom"/>

                                    </label>


                                </div>


                                <div className="mt-6 flex justify-end">
                                    <button
                                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition-colors"
                                        onClick={togglePopup}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className="lg:w-2/3 bg-gray-800 text-white shadow-2xl rounded-2xl p-8 transition-transform transform hover:shadow-xl">
                    <h2 className="text-3xl font-extrabold mb-6 text-teal-300 tracking-wide">Favorite Films</h2>

                    <div
                        className="flex flex-wrap gap-8 p-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-600">
                        {favorit.map((film) => (
                            <div key={film._id}
                                 className="bg-gray-800 w-50 sm:w-1/2 lg:w-1/3 p-6 rounded-xl shadow-lg transition-transform transform hover:-rotate-2 hover:scale-105 hover:bg-gray-600">
                                {film.filmId && film.filmId.image ? (
                                    <img
                                        src={`http://localhost:3000/${film.filmId.image}`}
                                        alt={film.title}
                                        className="w-full h-48 object-cover rounded-md mb-4 shadow-md"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-48 bg-gray-500 rounded-md mb-4 flex items-center justify-center">
                                        <span className="text-gray-300">No Image Available</span>
                                    </div>
                                )}

                                <h3 className="text-xl font-bold text-teal-300">{film.title}</h3>
                                <p className="text-sm text-gray-400 mt-1"><strong>Genre:</strong> {film.filmId.genre}
                                </p>
                                <p className="text-sm text-gray-400">
                                    <strong>Published:</strong> {new Date(film.filmId.publishedDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-300 mt-2">{film.description}</p>

                                <a
                                    href={`/watch/${film.filmId._id}`}
                                    className="inline-block mt-4 text-teal-400 hover:text-teal-600 transition-colors font-semibold"
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


        </div>
    );
}
