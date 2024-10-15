import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function MovieDetails() {
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
        <>
            <section className="flex flex-col items-center justify-center min-h-screen p-8 text-white bg-gradient-to-r from-blue-400 to-purple-500">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row lg:space-x-10 lg:items-start animate-fadeIn">
                        <div className="mb-6 lg:w-1/3 lg:mb-0">
                            <img
                                src={`http://localhost:3000/${movie.image}`}
                                alt={movie.title}
                                className="object-cover w-full h-full max-h-[600px] rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                            />
                        </div>

                        <div className="space-y-6 lg:w-2/3">
                            <h1 className="text-4xl font-bold tracking-wide text-purple-300">{movie.title}</h1>
                            <p className="text-lg text-gray-300">{movie.description}</p>

                            <div className="flex items-center space-x-4">
                                <span className="px-4 py-1 text-sm font-semibold text-white bg-purple-600 rounded-full">{movie.genre}</span>
                                <span className="text-sm text-gray-400">Released: {movie.publishedDate}</span>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <h3 className="text-xl font-bold">Director</h3>
                                    <p className="text-gray-300">{movie.director}</p>
                                </div>
                              
                            </div>

                            <div className="mt-8">
                                <a
                                    href={`/films`}
                                    className="inline-block px-6 py-3 text-lg font-bold text-white transition bg-purple-600 rounded-full hover:bg-purple-700 focus:ring-4 focus:ring-purple-400"
                                >
                                   watch now
                                </a>
                                <a
                                    href={`/films`}
                                    className="inline-block px-6 py-3 text-lg font-bold text-white transition bg-purple-600 rounded-full hover:bg-purple-700 focus:ring-4 focus:ring-purple-400"
                                >
                                    Back to Movies
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
