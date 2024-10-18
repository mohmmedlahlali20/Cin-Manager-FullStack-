/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import LogoSvg from '../logo/LogoSvg';
import { useNavigate } from 'react-router-dom';

export default function Movies() {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [movies, setMovies] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`${path}/film/getAllFilms`, {
                    headers: {
                        'accept': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Response', response.data.films);
                setMovies(response.data.films);
            } catch (err) {
                console.error('Error fetching movies:', err);
            }
        };

        if (token) {
            fetchMovies();
        }





    }, [token, path, navigate]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/login');
    };
    return (
        <>
            <nav className="bg-gradient-to-r from-blue-300 to-purple-900">
                <div className="container flex items-center justify-between px-4 py-4 mx-auto">

                    <div className="text-xl font-bold text-white">
                        <LogoSvg />
                    </div>


                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                    <ul className={`md:flex md:items-center md:space-x-4 ${isOpen ? 'block' : 'hidden'} md:block  md:bg-transparent absolute md:relative  left-0 w-full md:w-auto border-t md:border-none border-gray-700 `}>
                        <li className="text-center md:text-left">
                            <a href="/" className="block px-4 py-2 text-white hover:bg-gray-700 md:hover:bg-transparent">Home</a>
                        </li>
                        <li className="text-center md:text-left">
                            <a href="/films" className="block px-4 py-2 text-white hover:bg-gray-700 md:hover:bg-transparent">All Movies</a>
                        </li>
                        <li className="text-center md:text-left">
                            <a href="" className="block px-4 py-2 text-white hover:bg-gray-700 md:hover:bg-transparent">
                            <span className="material-icons">account_circle</span>
                            </a>
                        </li>
                        <li className="mt-2">
                            <button
                                onClick={handleLogout}
                                className="block text-white hover:bg-gray-700 md:hover:bg-transparent"
                            >
                                <i className="material-icons">logout</i>
                            </button>
                        </li>

                    </ul>

                </div>


            </nav>


            <section className="bg-gradient-to-r from-blue-400 to-purple-900">
                <div className="container py-16 mx-auto">
                    <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">All Movies</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {movies.map((movie) => (
                            <div
                                key={movie._id}
                                className="relative overflow-hidden transition-transform transform rounded-lg shadow-lg bg-gradient-to-r from-blue-300 to-purple-500 hover:scale-105 hover:shadow-xl min-w-[220px] max-w-full"
                            >
                                <a href={`/films/${movie._id}`} className="block">
                                    <img
                                        src={`http://localhost:3000/${movie.image}`}
                                        alt={movie.title}
                                        className="object-cover w-full h-64 transition-transform duration-300 transform hover:scale-110"
                                    />
                                </a>
                                <div className="p-4">
                                    <h3 className="mb-2 text-xl font-bold text-white">{movie.title}</h3>
                                    <p className="mb-4 text-white">{movie.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded">
                                            {movie.genre}
                                        </span>
                                        <span className="text-xs text-gray-200">{movie.publishedDate}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
