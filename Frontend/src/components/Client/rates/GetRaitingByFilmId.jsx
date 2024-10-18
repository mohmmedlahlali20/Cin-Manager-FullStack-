import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function GetRatingByFilmId({ filmId }) {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [Rate, setRating] = useState([]);

    const token = Cookies.get('token');

    const getRateByFilmId = async () => {
        try {
            const response = await axios.get(`${path}/rating/getRaiting/${filmId}`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            setRating(response.data.raitings); 
            console.log('Rating data:', response.data.raitings);
        } catch (err) {
            console.error('Error fetching ratings:', err);
        }
    };

    useEffect(() => {
        getRateByFilmId();
    }, []);

    return (
        <>
         
            {Rate ? (
               <span>{Rate}</span>
            ) : (
                <p>No ratings available for this film.</p>
            )}
        </>
    );
}
