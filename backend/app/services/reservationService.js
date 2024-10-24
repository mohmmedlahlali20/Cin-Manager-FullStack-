const salleModel = require('../models/salle'); 
const reservationModel = require('../models/reservation')

class ReservationService {
    async getAllReservations() {
        const reservations = await reservationModel
            .find({ isDelete: false })
            .populate({
                path: 'seanceId',   
                populate: {        
                    path: 'filmId',
                    model: 'Film'     
                },
                populate: {        
                    path: 'salleId',
                    model: 'Salle'     
                }
            })
            .populate('userId');    

        return reservations;
    }
    
    async updateSeatAvailability(reservedSeatNumber, salleId) {
        const salle = await salleModel.findById(salleId);
        
        if (!salle) throw new Error('Salle not found');
    
        salle.seats.forEach(seat => {
            if (seat.number === reservedSeatNumber) {
                seat.available = false; 
            }
        });
    
        await salle.save();
        return salle;
    }
    
    

    async createReservation(reservationData) {
        const newReservation = new reservationModel(reservationData);
        await newReservation.save();
        return newReservation;
    }
}

module.exports = new ReservationService();
