import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function Comments({ filmId }) {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [Comments, SetComments] = useState([]);

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
            console.error("err", err);
        }
    };

    useEffect(() => {
        GetCommentsByFilmId();
    }, []);

    return (
        <div className="max-w-lg border border-gray-700 px-6 py-4 rounded-lg bg-gray-800 shadow-lg">
            {Comments.length === 0 ? (
                <p className="text-center text-gray-400">Aucun commentaire pour ce film.</p>
            ) : (
                <div className="h-96 overflow-y-scroll">
                    {Comments.map((comment, index) => (
                        <div key={index}>
                            <div className="flex items-center mb-4">
                                <img
                                    src={"https://randomuser.me/api/portraits/men/2.jpg"}
                                    alt="Avatar"
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <div className="text-lg font-medium text-gray-200">
                                        {comment.userId?.firstname} {comment.userId?.lastname}
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <p className="text-lg text-gray-200 leading-relaxed mb-4">
                                {comment.commentair}
                            </p>

                            <div className="flex justify-end">
                                <button>
                                    <svg fill="#000000" className="text-red-500" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                        width="30px" height="30px" viewBox="0 0 490.646 490.646"
                                        xmlSpace="preserve">
                                        <g>
                                            <g>
                                                <path d="M399.179,67.285l-74.794,0.033L324.356,0L166.214,0.066l0.029,67.318l-74.802,0.033l0.025,62.914h307.739L399.179,67.285z
                                                    M198.28,32.11l94.03-0.041l0.017,35.262l-94.03,0.041L198.28,32.11z"/>
                                                <path d="M91.465,490.646h307.739V146.359H91.465V490.646z M317.461,193.372h16.028v250.259h-16.028V193.372L317.461,193.372z
                                                    M237.321,193.372h16.028v250.259h-16.028V193.372L237.321,193.372z M157.18,193.372h16.028v250.259H157.18V193.372z"/>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                            <hr className="m-3" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
