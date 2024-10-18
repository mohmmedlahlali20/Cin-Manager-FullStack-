import { useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import Swal from 'sweetalert2';
import {AddRate} from "../rates"; 

export default function AjouterCommentair({ filmId }) {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [formData, setFormData] = useState({
        comment: "",
    });

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
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'There was an error adding your comment. Please try again.',
                timer: 2000,
            });
        }
    };

    return (
        <div>
             <form
            onSubmit={handleAddComment}
            className="p-5 md:p-10 shadow-lg rounded-md flex flex-col w-full max-w-lg bg-gray-800"
        >
            <label htmlFor="comment" className="mb-4">
                <span className="block text-white text-lg font-semibold mb-2">
                    Add a Comment
                </span>
                <textarea
                    name="comment"
                    id="comment"
                    rows="4"
                    value={formData.comment}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md shadow focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Write your comment here"
                    required
                />
            </label>

            

            <button
                type="submit"
                className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-md shadow hover:bg-purple-600 transition-all"
            >
                Send
            </button>
        </form>
        <div className="m-5">
        <AddRate filmId={filmId} /> 
        </div>
        
        </div>
       
        
    );
}
