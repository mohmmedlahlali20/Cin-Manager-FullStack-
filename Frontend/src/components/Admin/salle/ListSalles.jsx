import { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";

export default function ListSalles() {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [salles, setSalles] = useState([]);
    const token = Cookies.get('token');

    const getSalles = async () => {
        try {
            const response = await axios.get(`${path}/salle/getAllSalle`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data.salles);
            setSalles(response.data.salles);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getSalles();
    }, []);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white border border-gray-200">
                <thead>
                    <tr className="bg-purple-200">
                        <th className="py-2 px-4 border-b text-left">Name</th>
                        <th className="py-2 px-4 border-b text-left">Capacite</th>
                        <th className="py-2 px-4 border-b text-left">
                            Action
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    {salles.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4">Aucune salle trouver</td>
                        </tr>
                    ) : (
                        salles.map((salle) => (
                            <tr key={salle._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{salle.name}</td>
                            <td className="py-2 px-4 border-b">{salle.capacite}</td>
                            <td className="py-2 px-4 border-b">
                                <button className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring">
                                    Edit
                                </button>
                                <button className="px-3 py-1 ml-2 bg-purple-800 text-white rounded hover:bg-purple-800 focus:outline-none focus:ring">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
