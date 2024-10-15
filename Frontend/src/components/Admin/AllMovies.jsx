/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

export default function AllMovies() {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [movies, setMovies] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
        const hundelFetchMovies = async () => {
            try {
                const response = await axios.get(`${path}/film/getAllFilms`, {
                    headers: {
                        'accept': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });

                console.log('Response', response.data.films);
                setMovies(response.data.films);

            } catch (err) {
                console.error('Error fetching movies:', err);
            }
        };

        if (token) {
            hundelFetchMovies();
        }
    }, [token, path]);

    return (
<section className="py-16">
    <div className="container mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">All Movies</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {movies.map((movie) => (
                <div
                    key={movie._id}
                    className="relative overflow-hidden transition-transform transform rounded-lg shadow-lg bg-gradient-to-r from-blue-300 to-purple-500 hover:scale-105 hover:shadow-xl"
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
                            <span className="px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded">{movie.genre}</span>
                            <span className="text-xs text-gray-200">{movie.publishedDate}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>




    
    );
}
