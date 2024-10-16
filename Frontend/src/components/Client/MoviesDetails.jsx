import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { AjouterCommentair, Comments } from './commentair/index';
import {GetRaitingByFilmId} from './rates'

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
                    }
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
        <section className="flex flex-col items-center justify-center min-h-screen p-8 text-white bg-gradient-to-r from-indigo-600 to-purple-700">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row lg:space-x-12 lg:items-start animate-fadeIn">
                    <div className="mb-8 lg:w-1/3 lg:mb-0">
                        <img
                            src={`http://localhost:3000/${movie.image}`}
                            alt={movie.title}
                            className="object-cover w-full h-full max-h-[400px] rounded-lg shadow-xl transform hover:scale-105 transition duration-300"
                        />
                        <div className="mt-2">
                            <AjouterCommentair filmId={movie._id} />
                        </div>
                    </div>

                    <div className="space-y-8 lg:w-2/3">
                        <h1 className="text-5xl font-extrabold tracking-tight text-purple-200">{movie.title}</h1>
                        <p className="text-lg leading-relaxed text-gray-200">{movie.description}</p>
                        <div className="flex items-center space-x-6">
                            <span className="px-4 py-1 text-sm font-semibold text-white bg-purple-600 rounded-full shadow-sm">
                                {movie.genre}
                            </span>
                            <span className="text-sm text-gray-300">Released: {new Date(movie.publishedDate).toLocaleDateString()}</span>
                            <span className="text-sm text-gray-300">rating :  <GetRaitingByFilmId filmId={movie._id} />  </span>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <h3 className="text-xl font-semibold text-purple-300">Director</h3>
                                <p className="text-gray-300">{movie.director.firstname} {movie.director.lastname}</p>
                            </div>
                        
                     
                        </div>
                        <div className="flex mt-10 space-x-6">
                            <a
                                href={`/watch/${movie._id}`}
                                className="inline-block px-8 py-3 text-lg font-bold text-white transition-all bg-purple-600 rounded-full shadow-md hover:bg-purple-700 focus:ring-4 focus:ring-purple-400"
                            >
                                Watch Now
                            </a>
                            <a
                                href={`/seance/${movie._id}`}
                                className="inline-block px-8 py-3 text-lg font-bold text-white transition-all bg-gray-600 rounded-full shadow-md hover:bg-gray-700 focus:ring-4 focus:ring-gray-400"
                            >
                                Reserve Now
                            </a>
                            <a
                                href={`/saved/${movie._id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    savedMovies();
                                }}
                                className="inline-block px-8 py-3 text-lg font-bold text-white transition-all bg-gray-600 rounded-full shadow-md hover:bg-gray-700 focus:ring-4 focus:ring-gray-400"
                            >
                                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6.75 6L7.5 5.25H16.5L17.25 6V19.3162L12 16.2051L6.75 19.3162V6ZM8.25 6.75V16.6838L12 14.4615L15.75 16.6838V6.75H8.25Z"
                                        fill="#080341"
                                    />
                                </svg>
                            </a>
                        </div>
                        <div>

                        <Comments filmId={movie._id} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
