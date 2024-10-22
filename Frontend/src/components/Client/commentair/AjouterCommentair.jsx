import { useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { AddRate } from "../rates";
import { FaPlus, FaTimes } from 'react-icons/fa'; // Importer les icônes

export default function AjouterCommentair({ filmId }) {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [formData, setFormData] = useState({ comment: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const token = Cookies.get('token');
    let userId;

    if (token) {
        const user = jwtDecode(token);
        userId = user.id;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddComment = async (e) => {
        e.preventDefault();

        if (!userId) {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'You need to be logged in to add a comment.',
            });
            return;
        }

        if (formData.comment.length < 3) {
            Swal.fire({
                icon: 'warning',
                title: 'Comment Too Short',
                text: 'Your comment must be at least 3 characters long.',
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                `${path}/comments/addComment`,
                {
                    commentair: formData.comment,
                    userId,
                    filmId,
                },
                {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Comment Added',
                    text: 'Your comment has been successfully added!',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });
                setFormData({ comment: "" });
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'There was an error adding your comment. Please try again.',
                timer: 2000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            <div className="flex gap-2">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 bg-teal-600 text-white py-2 px-4 rounded-md shadow hover:bg-teal-500 transition-all"
                >
                    Ajouter un Commentaire
                </button>
                
                <AddRate filmId={filmId} />
            </div>
           
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gradient-to-r from-teal-500 to-teal-700 rounded-lg shadow-lg p-6 max-w-lg w-full">
                        <h2 className="text-lg font-semibold text-white mb-4">Ajouter un Commentaire</h2>

                        <form onSubmit={handleAddComment}>
                            <label htmlFor="comment" className="mb-4 block">
                                <textarea
                                    name="comment"
                                    id="comment"
                                    rows="4"
                                    value={formData.comment}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-teal-800 text-white border border-teal-600 rounded-md shadow focus:ring-2 focus:ring-teal-300 outline-none"
                                    placeholder="Écrivez votre commentaire ici"
                                    required
                                />
                            </label>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className={`mt-4 ${isLoading ? 'bg-teal-500' : 'bg-teal-600'} text-white py-2 px-4 rounded-md shadow hover:bg-teal-500 transition-all flex-1 mr-2`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Envoi...' : <FaPlus className="inline-block mr-2" />}
                                    {isLoading ? '' : '+'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="mt-4 text-white py-2 px-4 rounded-md shadow bg-teal-700 hover:bg-teal-600 transition-all flex-1 ml-2"
                                >
                                    <FaTimes className="inline-block mr-2" /> X
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
