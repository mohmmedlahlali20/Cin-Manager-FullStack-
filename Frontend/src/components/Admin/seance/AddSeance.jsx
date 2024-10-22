import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AddSeance() {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [formData, setFormData] = useState({
        name: "",
        start_date: "",
        end_date: "",
        filmId: "",
        salleId: ""
    });
    const [Films, setFilms] = useState([]);
    const [salles, setSalles] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
        hundelGetFilms();
        hundelGetSalles();
    }, []);

    const hundelGetSalles = async () => {
        try {
            const response = await axios.get(`${path}/salle/getAllSalle`, {
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.salles);
            setSalles(response.data.salles);
        } catch (err) {
            console.error("Error fetching salles:", err.response ? err.response.data : err.message);
        }
    };

    const hundelGetFilms = async () => {
        try {
            const response = await axios.get(`${path}/film/getAllFilms`, {
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setFilms(response.data.films);
        } catch (err) {
            console.error("Error fetching films:", err.response ? err.response.data : err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (new Date(formData.end_date) < new Date(formData.start_date)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La date de fin doit être après la date de début!',
            });
            return;
        }

        console.log(formData);

        try {
            const response = await axios.post(`${path}/seance/addSeance`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Séance ajoutée avec succès!',
            });

            setFormData({
                name: "",
                start_date: "",
                end_date: "",
                filmId: "",
                salleId: ""
            });

        } catch (err) {
            console.error("Error adding séance:", err.response ? err.response.data : err.message);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de l\'ajout de la séance!',
            });
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">Ajouter une Séance</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-200" htmlFor="filmId">Sélectionnez un Film</label>
                    <select
                        id="filmId"
                        name="filmId"
                        value={formData.filmId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-300"
                    >
                        <option value="">Sélectionnez un film</option>
                        {Films.map((film) => (
                            <option key={film._id} value={film._id}>
                                {film.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200" htmlFor="salleId">Sélectionnez une Salle</label>
                    <select
                        id="salleId"
                        name="salleId"
                        value={formData.salleId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-300"
                    >
                        <option value="">Sélectionnez une salle</option>
                        {salles.map((salle) => (
                            <option key={salle._id} value={salle._id}>
                                {salle.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200" htmlFor="name">Nom</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200" htmlFor="start_date">Date de Début</label>
                    <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200" htmlFor="end_date">Date de Fin</label>
                    <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-300"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-teal-800 text-white rounded py-2 hover:bg-teal-700 transition duration-200"
                >
                    Ajouter
                </button>
            </form>
        </div>

    );
}
