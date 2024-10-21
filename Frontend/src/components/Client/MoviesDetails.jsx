import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { AjouterCommentair, Comments } from './commentair/index';
import { GetRaitingByFilmId } from './rates';

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

    const savedMovies = async () => {
        if (!token) return;

        try {
            const user = jwtDecode(token);
            const response = await axios.post(
                `${path}/favoris/addFavoris/${movie._id}`,
                { userId: user.id },
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Movie Saved',
                    text: 'The movie has been added to your favorites successfully!',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });
            }
        } catch (err) {
            console.error('Error saving movie to favorites:', err);
            Swal.fire({
                icon: 'error',
                title: 'Movie Save Error',
                text: 'Error saving movie to favorites',
                timer: 2000,
            });
        }
    };

    if (!movie) {
        return <div className="text-center text-white">Loading...</div>;
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-r from-blue-900 to-purple-800">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row lg:space-x-10 lg:items-start animate-fadeIn">
                    <div className="mb-8 lg:w-1/3 lg:mb-0">
                        <img
                            src={`http://localhost:3000/${movie.image}`}
                            alt={movie.title}
                            className="object-cover w-full h-96 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                        <div className="mt-4">
                            <AjouterCommentair filmId={movie._id} />
                        </div>
                    </div>

                    <div className="space-y-6 lg:w-2/3">
                        <h1 className="text-5xl font-bold text-gray-100">{movie.title}</h1>
                        <p className="text-lg text-gray-300 leading-relaxed">{movie.description}</p>
                        <div className="flex items-center space-x-4">
                            <span className="px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">{movie.genre}</span>
                            <span className="text-sm text-gray-200">Released: {new Date(movie.publishedDate).toLocaleDateString()}</span>
                            <span className="text-sm text-gray-200">Rating: <GetRaitingByFilmId filmId={movie._id} /></span>
                        </div>
                        <div className="flex mt-6 space-x-4">
                            {movie.vedio && (
                                <a
                                    href={`/watch/${movie._id}`}
                                    className="inline-block px-6 py-2 text-lg font-bold text-white bg-purple-600 rounded-lg shadow-lg transition-transform transform hover:bg-purple-700"
                                >
                                    Watch Now
                                </a>
                            )}
                            <a
                                href={`/seance/${movie._id}`}
                                className="inline-block px-6 py-2 text-lg font-bold text-white bg-purple-600 rounded-lg shadow-lg transition-transform transform hover:bg-gray-800"
                            >
                                Reserve Now
                            </a>
                            <a
                                href={`/saved/${movie._id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    savedMovies();
                                }}
                                className="inline-flex items-center justify-center px-4 py-2 text-lg font-bold text-white bg-purple-600 rounded-lg shadow-lg transition-transform transform hover:bg-gray-800"
                            >
                                <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6.75 6L7.5 5.25H16.5L17.25 6V19.3162L12 16.2051L6.75 19.3162V6ZM8.25 6.75V16.6838L12 14.4615L15.75 16.6838V6.75H8.25Z"
                                        fill="#080341"
                                    />
                                </svg>
                            </a>
                        </div>
                        <Comments filmId={movie._id} />
                    </div>
                </div>
            </div>
        </section>
    );
}
