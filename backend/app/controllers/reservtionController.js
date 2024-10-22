const reservationService = require('../services/reservationService')




exports.addReservation = async (req, res) => {
    try {
        const {  userId , seanceId } = req.body;
        console.log(req.body);
        
        if (!userId|| !seanceId) {
            return res.status(400).json({ msg: ' userId, seanceId are required.' });
        }
        const reservationData = {
            userId,
            seanceId,
        };
        const reservation = await reservationService.createReservation(reservationData);
        console.log(reservation);
        res.status(201).json({reservation});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add reservation' });
    }
}


exports.getReservation= async (req, res) => {
    try {
        const reservation = await reservationService
        .getAllReservations(req.params.id)
     
        ;
        res.status(200).json({ reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get reservation' });
    }
}