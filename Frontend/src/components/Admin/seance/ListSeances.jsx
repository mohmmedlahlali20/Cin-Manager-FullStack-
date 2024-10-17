import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function ListSeances() {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [seances, setSeances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchSeances = async () => {
            try {
                const response = await axios.get(`${path}/seance/getSeance`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                
                setSeances(response.data.seances);
            } catch (err) {
                setError(err.response ? err.response.data : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchSeances();
    }, [path, token]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">Liste des Séances</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">Nom</th>
                        <th className="py-2 px-4 border-b">Film</th>
                        <th className="py-2 px-4 border-b">Salle</th>
                        <th className="py-2 px-4 border-b">capacites des chaise</th>
                        <th className="py-2 px-4 border-b">Date de Début</th>
                        <th className="py-2 px-4 border-b">Date de Fin</th>
                    </tr>
                </thead>
                <tbody>
                    {seances.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4">Aucune séance trouvée</td>
                        </tr>
                    ) : (
                        seances.map((seance) => (
                            <tr key={seance._id}>
                                <td className="py-2 px-4 border-b">{seance.name}</td>
                                <td className="py-2 px-4 border-b">{seance.filmId}</td> 
                                <td className="py-2 px-4 border-b">{seance.salleId}</td> 
                                <td className="py-2 px-4 border-b">{new Date(seance.start_date).toLocaleString()}</td>
                                <td className="py-2 px-4 border-b">{new Date(seance.end_date).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
