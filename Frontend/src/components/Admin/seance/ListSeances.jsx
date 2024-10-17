import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function ListSeances() {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [seances, setSeances] = useState([]);
    const token = Cookies.get("token");

    useEffect(() => {
        const fetchSeances = async () => {
            try {
                const response = await axios.get(`${path}/seance/getSeance`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSeances(response.data.seances);
            } catch (error) {
                console.error("Error fetching seances:", error.response ? error.response.data : error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Erreur lors de la récupération des séances.',
                });
            }
        };

        fetchSeances();
    }, [path, token]);

    return (
        <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border border-gray-200">
            <thead>
                <tr className="bg-purple-200">
                    <th className="py-2 px-4 border-b text-left">Nom</th>
                    <th className="py-2 px-4 border-b text-left">Film</th>
                    <th className="py-2 px-4 border-b text-left">Salle</th>
                    <th className="py-2 px-4 border-b text-left">Capacite</th>
                    <th className="py-2 px-4 border-b text-left">Date de Début</th>
                    <th className="py-2 px-4 border-b text-left">Date de Fin</th>
                </tr>
            </thead>
            <tbody>
                {seances.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center py-4">Aucune séance trouvée</td>
                    </tr>
                ) : (
                    seances.map((seance) => (
                        <tr key={seance._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{seance.name}</td>
                            <td className="py-2 px-4 border-b">{seance.filmId?.title }</td>
                            <td className="py-2 px-4 border-b">{seance.salleId?.name }</td>
                            <td className="py-2 px-4 border-b">{seance.salleId?.capacite }</td>
                            <td className="py-2 px-4 border-b">{new Date(seance.start_date).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">{new Date(seance.end_date).toLocaleDateString()}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
    
    );
}
