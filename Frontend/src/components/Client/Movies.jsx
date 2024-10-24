import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import LogoSvg from '../logo/LogoSvg';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaFilm, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { jwtDecode } from 'jwt-decode';



export default function Movies() {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const navigate = useNavigate();
    const token = Cookies.get('token');

    const user = jwtDecode(token)
    const userId = user.id 
    console.log(userId);
    


    const Genres = ['Action', 'Drama', 'Thriller', 'Comedy', 'Fantasy'];

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`${path}/film/getAllFilms`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMovies(response.data.films);
                setFilteredMovies(response.data.films);
            } catch (err) {
                console.error('Error fetching movies:', err);
            }
        };

        if (token) {
            fetchMovies();
        }
    }, [token, path]);

    useEffect(() => {
        const filtered = movies.filter(movie => {
            const matchesTitle = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesGenre = selectedGenre ? movie.genre === selectedGenre : true;
            return matchesTitle && matchesGenre;
        });
        setFilteredMovies(filtered);
    }, [searchQuery, selectedGenre, movies]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/login');
    };

    return (
        <main className="bg-gray-900 min-h-screen">
            <nav className="bg-teal-300 bg-opacity-20 backdrop-blur-lg shadow-lg rounded-br-3xl rounded-bl-3xl sticky top-0 z-50">
                <div className="container flex items-center justify-between px-6 mx-auto">
                    <div className="text-2xl font-extrabold text-teal-400">
                        <LogoSvg />
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-teal-400 focus:outline-none">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                    <ul className={`md:flex md:items-center md:space-x-8 ${isOpen ? 'block' : 'hidden'} md:block`}>
                        <li>
                            <a href="/" className="text-teal-400 hover:text-teal-300 transition duration-200 ease-in-out transform hover:scale-105 flex items-center">
                                <FaHome className="mr-2" />
                                
                            </a>
                        </li>
                        <li>
                            <a href="/films" className="text-teal-400 hover:text-teal-300 transition duration-200 ease-in-out transform hover:scale-105 flex items-center">
                                <FaFilm className="mr-2" />
                            </a>
                        </li>
                        <li>
                            <a href={`/me/${userId}`} className="text-teal-400 hover:text-teal-300 transition duration-200 ease-in-out transform hover:scale-105 flex items-center">
                                <FaUserCircle className="mr-2" />
                            </a>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="text-teal-400 hover:text-teal-300 transition duration-200 ease-in-out transform hover:scale-105 flex items-center">
                                <FaSignOutAlt className="mr-2" />
                                
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <h2 className="mb-12 text-4xl font-extrabold text-center text-teal-400 m-5">All Movies</h2>
            <section className="py-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
                <div className="container mx-auto flex items-center justify-center mb-8">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="w-full max-w-md p-2 rounded bg-gray-800 border border-teal-400 text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 mr-4"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select
                        className="p-2 rounded bg-gray-800 border border-teal-400 text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <option value="">All Genres</option>
                        {Genres.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="container mx-auto">

                    {filteredMovies.length === 0 ? (
                        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                            <h3 className="mb-4 text-2xl font-bold text-teal-400">No Movies Found</h3>
                            <p className="text-gray-400">There are currently no movies available to display.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {filteredMovies.map((movie) => (
                                <div
                                    key={movie._id}
                                    className="relative overflow-hidden transition-transform transform rounded-lg shadow-lg hover:scale-105 hover:shadow-xl min-w-[220px] max-w-full group"
                                >
                                    <a href={`/films/${movie._id}`}>
                                        <div className='text-center'>
                                            <span className="text-lg font-bold text-teal-400 text-center">{movie.title}</span>
                                            <img
                                                src={`http://localhost:3000/${movie.image}`}
                                                alt={movie.title}
                                                className="object-cover w-full h-96      transition-transform duration-300 transform group-hover:scale-110 rounded-t-lg"
                                            />
                                        </div>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 opacity-0 bg-gray-900 bg-opacity-70 group-hover:opacity-100">
                                            <span className="text-lg font-bold text-teal-400">{movie.title}</span>
                                            <span className="px-2 py-1 text-xs font-bold text-gray-900 bg-teal-400 rounded">
                                                {movie.genre}
                                            </span>
                                            <span className="text-xs text-teal-400">
                                                {new Date(movie.publishedDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
