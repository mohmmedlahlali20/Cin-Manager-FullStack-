import { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import Swal from 'sweetalert2';



export default function CreateSalle() {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [formData, setFormData] = useState({
        name: '',
        capacite: ''
    });

    const token = Cookies.get('token')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${path}/salle/createSalle`, formData , {
                headers: {
                    'accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log();
            if (response.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Séance ajoutée avec succès!',
                });
                
            }
           
                setFormData(response.data);
           
        } catch (error) {
            console.error('Erreur:', error);
       
        }
    };

    return (
        <div className="w-full p-8 shadow-sm">
            <h2 className="mb-6 font-serif text-3xl text-center text-purple-300">Ajouter une salle</h2>

            <div className="flex justify-center">
                <form className="w-full max-w-lg p-8 rounded-lg shadow-md bg-gradient-to-r from-blue-400 to-purple-500" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block mb-2 font-bold text-gray-700">Nom de la salle:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Entrez le nom de la salle"
                                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-bold text-gray-700">Capacité:</label>
                            <input
                                type="number"
                                name="capacite"
                                value={formData.capacite}
                                onChange={handleChange}
                                placeholder="Entrez la capacité de la salle"
                                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-4 py-2 font-bold text-white bg-purple-600 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        >
                            Ajouter une salle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
