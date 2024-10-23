/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useParams } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

export default function CreateReservation() {
    const path = import.meta.env.VITE_BACK_END_URI;
    
    const [seances, setSeances] = useState([]);
    const { id } = useParams();
    const token = Cookies.get('token');
    
    const user = jwtDecode(token);
    const userId = user.id;

    const [showPopup, setShowPopup] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [currentSeance, setCurrentSeance] = useState(null);

    const togglePopup = (seance) => {
        setCurrentSeance(seance);
        setShowPopup(!showPopup);
        setSelectedSeats([]);
    };

  

    const fetchSeance = async () => {
        try {
            const response = await axios.get(`${path}/seance/getseance/${id}`, {
                headers: {
                    'accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setSeances(response.data.getSeanceByFilmId);
        } catch (err) {
            console.error('Error fetching fetchSeance:', err);
        }
    };

    const handleSeatClick = (seat) => {
        if (seat.available) {
            setSelectedSeats((prevSelected) =>
                prevSelected.includes(seat.number)
                    ? prevSelected.filter((seatId) => seatId !== seat.number)
                    : [...prevSelected, seat.number]
            );
        } else {
            Swal.fire('Error', `Seat ${seat.number} is not available.`, 'error');
        }
    };

    const handleReserveSeats = async () => {
        if (selectedSeats.length === 0) {
            Swal.fire('Warning', 'Please select at least one seat.', 'warning');
            return;
        }
    
        console.log('data', {
            userId,
            seanceId: currentSeance._id,
            reservedSeats: selectedSeats.length 
        });
    
        try {
            const response = await axios.post(`${path}/reservtion/reserve`, {
                userId,
                seanceId: currentSeance._id,
                reservedSeats: selectedSeats.length 
            }, {
                headers: {
                    'accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
    
            console.log(response.data);
    
            Swal.fire('Success', 'Reservation successful!', 'success');
            setShowPopup(false);
            setSelectedSeats([]);
    
            const updatedSeance = response.data.reservation.seanceId;
    
            setSeances((prevSeances) =>
                prevSeances.map(seance =>
                    seance._id === updatedSeance._id
                        ? updatedSeance
                        : seance
                )
            );
        } catch (error) {
            Swal.fire('Error', 'Error during reservation. Please try again.', 'error');
            console.error('Error during reservation:', error);
        }
    };
    
    
    
    

    useEffect(() => {
        if (token && id) {
            fetchSeance();
        }
    }, [token, id]);

    return (
        <section className='bg-gray-900 min-h-screen'>
            <div className="container px-5 py-12 mx-auto">
                <h1 className="text-3xl font-bold text-center text-teal-700 mb-8">Reserve Your Film</h1>
                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                        {seances.map((seance) => (
                            <div
                                key={seance._id}
                                className="relative p-6 transition-shadow duration-300 ease-in-out transform shadow-lg bg-teal-100 w-72 hover:shadow-2xl rounded-xl hover:-translate-y-2"
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
                                        <strong>Capacity:</strong> {seance.salleId.capacite}
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        className="px-6 py-2 font-semibold text-white transition duration-300 ease-in-out bg-teal-700 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
                                        onClick={() => togglePopup(seance)}
                                    >
                                        Reserve Now
                                    </button>
                                </div>
                            </div>
                        ))}

                        {showPopup && currentSeance && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-teal-500 to-teal-700 w-96">
                                    <button onClick={() => togglePopup(null)} className="text-white">Close</button>
                                    <h2 className="mb-4 text-xl font-semibold text-white">
                                        Select a Seat for <span className="text-2xl">: {currentSeance.name}</span>
                                    </h2>
                                    <div className="grid grid-cols-5 gap-4">
                                        {currentSeance.salleId.seats.map((seat, index) => (
                                            <div
                                                key={index}
                                                className={`flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer transition-colors ${seat.available ? selectedSeats.includes(seat.number) ? 'bg-yellow-500' : 'bg-green-500 hover:bg-green-400' : 'bg-red-500 cursor-not-allowed'} text-white`}
                                                onClick={() => seat.available && handleSeatClick(seat)}
                                            >
                                                <span>{seat.number}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 text-right">
                                        <button
                                            className="px-4 py-2 font-semibold text-white bg-teal-500 rounded-full hover:bg-teal-700"
                                            onClick={handleReserveSeats}
                                        >
                                            Confirm Reservation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
