import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Video() {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [movie, setMovie] = useState(null);
    const { id } = useParams();
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`${path}/film/getFilms/${id}`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMovie(response.data);
            } catch (err) {
                console.error('Error fetching movie details:', err);
            }
        };

        if (token) {
            fetchMovieDetails();
        }
    }, [id, token, path]);

    if (!movie) {
        return <div className="text-center text-white">Loading...</div>;
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-900 via-teal-700 to-black">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row lg:space-x-8 items-center">
                    <div className="lg:w-2/3 w-full mb-8 lg:mb-0">
                        <div className="relative shadow-2xl rounded-lg overflow-hidden">
                            <video
                                className="w-full h-auto rounded-lg transition-transform transform hover:scale-105"
                                controls
                                poster={movie.image}
                            >
                                <source src={movie.movies} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>

                    <div className="lg:w-1/3 w-full bg-teal-800 bg-opacity-90 p-6 rounded-lg shadow-lg">
                        <h1 className="text-4xl font-bold text-white mb-2 transition-colors duration-300 hover:text-teal-400">{movie.title}</h1>
                        <p className="text-gray-300 mb-1"><strong>Genre:</strong> {movie.genre}</p>
                        <p className="text-gray-300 mb-3"><strong>Published Date:</strong> {new Date(movie.publishedDate).toLocaleDateString()}</p>
                        <p className="text-gray-400 leading-relaxed">{movie.description}</p>

                        
                        <button
                            onClick={() => window.history.back()}
                            className="mt-4 bg-teal-600 text-white py-2 px-4 rounded-md shadow hover:bg-teal-500 transition-all"
                        >
                            Back
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
