/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CreateReservation() {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [seances, setSeances] = useState([]);
    const { id } = useParams();
    const token = Cookies.get('token');

    const [showPopup, setShowPopup] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [currentSeance, setCurrentSeance] = useState(null);

    const togglePopup = (seance) => {
        setCurrentSeance(seance);
        setShowPopup(!showPopup);
        setSelectedSeats([]); 
    };

    useEffect(() => {
        const fetchSeance = async () => {
            try {
                const response = await axios.get(`${path}/seance/getseance/${id}`, {
                    headers: {
                        'accept': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSeances(response.data.getSeanceByFilmId || []);
            } catch (err) {
                console.error('Error fetching fetchSeance:', err);
            }
        };

        if (token && id) {
            fetchSeance();
        }
    }, [token, id, path]);

    const handleSeatClick = (seat) => {
        console.log(seat.available);
        
        if (seat.available) {
            setSelectedSeats((prevSelected) =>
                prevSelected.includes(seat.number) 
                    ? prevSelected.filter((seatId) => seatId !== seat.number)
                    : [...prevSelected, seat.number] 
            );
        } else {
            console.log(`Seat ${seat.number} is not available.`);
        }
    };

    return (
        <div className="container px-5 py-12 mx-auto">
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                    {seances.map((seance) => (
                        <div
                            key={seance._id}
                            className="relative p-6 transition-shadow duration-300 ease-in-out transform shadow-lg bg-gradient-to-r from-blue-300 to-purple-900 w-72 hover:shadow-2xl rounded-xl hover:-translate-y-2"
                        >
                            <div className="seance-item">
                                <h2 className="mb-2 text-xl font-semibold text-gray-800">{seance.name}</h2>
                                <p className="text-sm text-gray-600">
                                    <strong>Start Date:</strong> {new Date(seance.start_date).toLocaleDateString()}
                                </p>
                                <p className="mb-4 text-sm text-gray-600">
                                    <strong>End Date:</strong> {new Date(seance.end_date).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Salle:</strong> {seance.salleId.name}
                                </p>
                                <p className="mb-6 text-sm text-gray-600">
                                    <strong>Capacity du salle:</strong> {seance.salleId.capacite}
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="px-6 py-2 font-semibold text-white transition duration-300 ease-in-out bg-purple-900 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                    onClick={() => togglePopup(seance)}
                                >
                                    Reserve Now
                                </button>
                            </div>
                        </div>
                    ))}

                    {showPopup && currentSeance && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-700 to-purple-900 w-96">
                                <h2 className="mb-4 text-xl font-semibold">
                                    Selectionner un siege pour {currentSeance.name}
                                </h2>
                                <div className="grid grid-cols-5 gap-4">
                                    {currentSeance.salleId.seats.map((seat, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer transition-colors ${seat.available ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                            onClick={() => handleSeatClick(seat)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-16 h-16">
                                                <g>
                                                    <path
                                                        d="M48 4h-8v16h8c1.1 0 2 .9 2 2v16H14V22c0-1.1.9-2 2-2h8V4h-8C9.1 4 4 9.1 4 16v40c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-6h40v6c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V16c0-6.9-5.1-12-12-12zM24 4h16v16H24V4zm32 52H8V22h48v34z" />
                                                    <path d="M10 46h44v4H10zM10 38h44v4H10z" />
                                                </g>
                                            </svg>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 text-right">
                                    <button
                                        className="px-4 py-2 font-semibold text-white bg-purple-500 rounded-full hover:bg-purple-700"
                                        onClick={() => togglePopup(null)}
                                    >
                                        reserve now 
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
