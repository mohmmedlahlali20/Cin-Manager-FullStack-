const reservationService = require('../services/reservationService')
const seanceModel = require('../models/seance')




exports.addReservation = async (req, res) => {
    try {
        const { userId, seanceId, reservedSeats } = req.body;

        if (!userId || !seanceId || reservedSeats === undefined) {
            return res.status(400).json({ msg: 'userId, seanceId, and reservedSeats are required.' });
        }

        const reservationData = {
            userId,
            seanceId,
            reservedSeats 
        };

        const reservation = await reservationService.createReservation(reservationData);

        const seance = await seanceModel.findById(seanceId).populate('salleId'); 
        const salleId = seance.salleId._id;

        await reservationService.updateSeatAvailability([reservedSeats], salleId);
        res.status(201).json({ reservation });
    } catch (error) {
        res.status(500).json({ msg: 'Failed to add reservation' });
    }
};









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