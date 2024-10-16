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
        <section className="flex flex-col items-center justify-center min-h-screen p-8 text-white bg-gradient-to-r from-indigo-600 to-purple-700">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row lg:space-x-12 lg:items-start animate-fadeIn lg:animate-none">
                    <div className="mb-8 lg:w-1/3 lg:mb-0">
                        <img
                            src={`http://localhost:3000/${movie.image}`}
                            alt={movie.title}
                            className="object-cover w-full h-full max-h-[400px] rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
                        />
                    </div>

                    <div className="space-y-8 lg:w-2/3">
                        <h1 className="text-5xl font-extrabold tracking-tight text-purple-200">{movie.title}</h1>
                        <p className="text-lg leading-relaxed text-gray-200">{movie.description}</p>

                        <div className="flex items-center space-x-6">
                            <span className="px-4 py-1 text-sm font-semibold text-white bg-purple-600 rounded-full shadow-sm">{movie.genre}</span>
                            <span className="text-sm text-gray-300">Released: {movie.publishedDate}</span>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <h3 className="text-xl font-semibold text-purple-300">Director</h3>
                                <p className="text-gray-300">{movie.director.firstname} {movie.director.lastname}</p>
                            </div>
                        </div>

                        <div className="flex mt-10 space-x-6">
                            <a
                                href={`/films`}
                                className="inline-block px-8 py-3 text-lg font-bold text-white transition-all bg-purple-600 rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg focus:ring-4 focus:ring-purple-400"
                            >
                                Watch Now
                            </a>
                            <a
                                href={`/films`}
                                className="inline-block px-8 py-3 text-lg font-bold text-white transition-all bg-gray-600 rounded-full shadow-md hover:bg-gray-700 hover:shadow-lg focus:ring-4 focus:ring-gray-400"
                            >
                                Back to Movies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
