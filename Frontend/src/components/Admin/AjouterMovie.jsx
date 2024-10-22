/* eslint-disable no-unused-vars */
import { useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';



export default function AjouterMovie() {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [PublishedDate, setPublishedDate] = useState('');
    const [Genre, setGenre] = useState('');
    const [Image, setImage] = useState(null);
    const [Director, setDirector] = useState('');
    const [message, setMessage] = useState(''); 
    const [error, setError] = useState(''); 

    const token = Cookies.get('token');
    const Genres = ['Action', 'Drama', 'Thriller', 'Comedy', 'Fantasy'];

    const hundelSubmit = async (e) => {
        e.preventDefault();

        let creatorId = '';

        if (token) {
            try {
                const user = jwtDecode(token);
                creatorId = user.id;
            } catch (err) {
                console.error('Échec du décodage du token', err);
            }
        }

        try {
            const formData = new FormData();
            formData.append('title', Title);
            formData.append('description', Description);
            formData.append('publishedDate', PublishedDate);
            formData.append('genre', Genre);
            formData.append('image', Image);
            formData.append('director', creatorId);

            const response = await axios.post(`${path}/film/createFilms`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            });

            console.log(response.data);
            

            setError('');
            setTitle('');
            setDescription('');
            setPublishedDate('');
            setGenre('');
            setImage(null);
            setDirector('');



            Swal.fire({
                title: 'Film Added!',
                text: 'The film has been successfully added.',
                icon: 'success',
                confirmButtonText: 'OK',
            });

        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
            Swal.fire({
                title: 'Error!',
                text: error.response ? error.response.data.msg : error.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="w-full p-8 shadow-sm">
        <h2 className="mb-6 font-serif text-3xl text-center text-teal-300">Ajouter un film</h2>
       
        <div className="flex justify-center">
            <form
                encType='multipart/form-data'
                className="w-full max-w-lg p-8 rounded-lg shadow-md bg-gradient-to-r from-teal-400 to-teal-600"
                onSubmit={hundelSubmit}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block mb-2 font-bold text-gray-700">Titre du film:</label>
                        <input
                            type="text"
                            name="Title"
                            value={Title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Entrez le titre du film"
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-bold text-gray-700">Genre:</label>
                        <select
                            name="genre"
                            onChange={(e) => setGenre(e.target.value)}
                            className="block w-full px-4 py-2 m-1 border rounded-sm shadow-sm"
                            id="genre"
                        >
                            <option value="" disabled>Select genre</option>
                            {Genres.map((genre) => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-bold text-gray-700">Date de publication:</label>
                        <input
                            type="date"
                            onChange={(e) => setPublishedDate(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-bold text-gray-700">Réalisateur:</label>
                        <input
                            type="text"
                            onChange={(e) => setDirector(e.target.value)}
                            placeholder="Entrez le nom du réalisateur"
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-bold text-gray-700">Affiche du film:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-bold text-gray-700">Description:</label>
                        <textarea
                            value={Description}
                            rows="3"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Entrez la description du film"
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="px-4 py-2 font-bold text-white bg-teal-600 rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    >
                        Ajouter le film
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    
    );
}
