/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

export default function AllMovies() {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [movies, setMovies] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const token = Cookies.get('token');

    useEffect(() => {
        const handleFetchMovies = async () => {
            try {
                const response = await axios.get(`${path}/film/getAllFilms`, {
                    headers: {
                        'accept': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });

                setMovies(response.data.films);
            } catch (err) {
                console.error('Error fetching movies:', err);
            }
        };

        if (token) {
            handleFetchMovies();
        }
    }, [token, path]);

    const togglePopup = (movie) => {
        setSelectedMovie(movie);
        setShowPopup(!showPopup);
    };

    const handleVideoUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('movies', file);

        if (selectedMovie && selectedMovie._id) {
            try {
                const response = await axios.put(`${path}/film/video/${selectedMovie._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log("Vidéo ajoutée avec succès:", response.data);
                setShowPopup(false);
            } catch (error) {
                console.error("Erreur lors de l'ajout de la vidéo:", error);
            }
        } else {
            console.error("Movie ID is missing");
        }
    };

    return (
        <section className="py-16 ">
            <div className="container mx-auto px-4">
                <h2 className="mb-8 text-4xl font-bold text-center text-teal-800">All Movies</h2>

                <div className="overflow-x-auto shadow-lg rounded-lg bg-teal-500">
                    <table className="min-w-full text-left text-gray-600">
                        <thead>
                            <tr className="bg-teal-200">
                                <th className="px-6 py-3 font-bold text-gray-700">Image</th>
                                <th className="px-6 py-3 font-bold text-gray-700">Title</th>
                                <th className="px-6 py-3 font-bold text-gray-700">Release Date</th>
                                <th className="px-6 py-3 font-bold text-gray-700">Description</th>
                                <th className="px-6 py-3 font-bold text-gray-700">Movies</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.length > 0 ? (
                                movies.map((movie) => (
                                    <tr key={movie._id} className="border-b hover:bg-teal-300 transition duration-300 ease-in-out">
                                        <td className="px-6 py-4">
                                            <img
                                                className="w-24 h-36 object-cover rounded-lg shadow-md"
                                                src={`http://localhost:3000/${movie.image}`}
                                                alt={movie.title}
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-lg font-semibold text-gray-800">{movie.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{new Date(movie.publishedDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {movie.description.length > 100 ? `${movie.description.substring(0, 100)}...` : movie.description}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {movie.movies ? (
                                                "Yes"
                                            ) : (
                                                <button
                                                    className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                                    onClick={() => togglePopup(movie)}
                                                >
                                                    Ajouter
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No movies available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-teal-300 p-6 rounded-lg shadow-lg">
                            <h3 className="mb-4 text-xl font-bold">Upload Video for {selectedMovie?.title}</h3>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleVideoUpload}
                                className="mb-4 p-2 border rounded"
                            />
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-200 transition duration-200 ease-in-out"
                                >
                                    <svg fill="#ffffff" height="20px" width="20px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 492 492" xmlSpace="preserve">
                                        <g>
                                            <g>
                                                <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872
                            c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872
                            c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052
                            L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116
                            c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952
                            c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116
                            c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"/>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                                <button
                                    onClick={handleVideoUpload}
                                    className="px-4 py-2 text-white bg-teal-900 rounded hover:bg-teal-200 transition duration-200 ease-in-out"
                                >
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
