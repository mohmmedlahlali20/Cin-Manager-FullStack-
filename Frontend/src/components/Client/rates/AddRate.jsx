import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';  
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function AddRate({ filmId }) {
    const path = import.meta.env.VITE_BACK_END_URI;

    const [formData, setFormData] = useState({ note: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const token = Cookies.get('token');
    const userId = jwtDecode(token)?.id;

    const handleInputChange = (e) => {
        setFormData({ ...formData, note: e.target.value });
    };

    const handleAddRating = async (e) => {
        e.preventDefault();

        const ratingData = {
            filmId,  
            userId, 
            note: formData.note
        };

        try {
            const response = await axios.post(`${path}/rating/addRaiting`, ratingData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Your rating has been added!',
                });
                setFormData({ note: '' });
                setIsModalOpen(false); 
            }
            console.log(response.data, "Rating added");

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add your rating. Please try again!',
            });
            console.error('Error adding rating:', error);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-md shadow hover:bg-purple-600 transition-all"
            >
                Rate the Movie
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-lg w-full">
                        <h2 className="text-lg font-semibold text-white mb-4">Rate the Movie</h2>
                        <form onSubmit={handleAddRating}>
                            <label htmlFor="note" className="mb-4 block">
                                <input
                                    type="number"
                                    name="note"
                                    id="note"
                                    value={formData.note}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md shadow focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="Enter your rating 0 - 10"
                                    required
                                    min="0"
                                    max="10"
                                />
                            </label>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-md shadow hover:bg-purple-600 transition-all"
                                >
                                    Submit Rating
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
