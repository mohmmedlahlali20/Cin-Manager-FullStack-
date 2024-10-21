import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function Comments({ filmId }) {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [Comments, SetComments] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const token = Cookies.get('token');

    const GetCommentsByFilmId = async () => {
        try {
            const response = await axios.get(`${path}/comments/getComments/${filmId}`, {
                headers: {
                    'accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            SetComments(response.data.comments);
        } catch (err) {
            console.error("Error fetching comments:", err);
        }
    };

    useEffect(() => {
        GetCommentsByFilmId();
    }, [filmId]);

    return (
        <div className="mx-auto  rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full text-left text-lg font-semibold text-gray-100 py-2 px-4 rounded-md bg-gray-800 hover:bg-gray-700 transition duration-300"
                >
                    {isOpen ? "Cacher les commentaires" : "Afficher les commentaires"}
                </button>
                {isOpen && (
                    <div className="mt-4 h-96 overflow-y-auto border-t border-gray-700 pt-4">
                        {Comments.length === 0 ? (
                            <p className="text-center text-gray-500 italic">Aucun commentaire pour ce film.</p>
                        ) : (
                            Comments.map((comment, index) => (
                                <div key={index} className="p-4 border-b border-gray-700 last:border-b-0 transition-colors duration-300 hover:bg-gray-800">
                                    <div className="flex items-start mb-4">
                                        <img
                                            src={"https://randomuser.me/api/portraits/men/2.jpg"}
                                            alt="Avatar"
                                            className="w-14 h-14 rounded-full mr-4 shadow-md transition-transform transform hover:scale-110 duration-300"
                                        />
                                        <div className="flex-1">
                                            <div className="text-lg font-semibold text-gray-100">
                                                {comment.userId?.firstname} {comment.userId?.lastname}
                                            </div>
                                            <div className="text-gray-400 text-sm mb-2">
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </div>
                                            <p className="text-gray-200 leading-relaxed mb-2">
                                                {comment.commentair}
                                            </p>
                                            <div className="flex justify-end mt-2">
                                                <button className="flex items-center text-sm text-red-500 hover:bg-red-500 hover:text-white rounded-full p-1 transition duration-300">
                                                    <svg fill="#FF4D4F" className="w-5 h-5" viewBox="0 0 490.646 490.646">
                                                        <g>
                                                            <path d="M399.179,67.285l-74.794,0.033L324.356,0L166.214,0.066l0.029,67.318l-74.802,0.033l0.025,62.914h307.739L399.179,67.285z M198.28,32.11l94.03-0.041l0.017,35.262l-94.03,0.041L198.28,32.11z"/>
                                                            <path d="M91.465,490.646h307.739V146.359H91.465V490.646z M317.461,193.372h16.028v250.259h-16.028V193.372z M237.321,193.372h16.028v250.259h-16.028V193.372z M157.18,193.372h16.028v250.259H157.18V193.372z"/>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
