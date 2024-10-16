const reservationModel = require('../models/reservation');


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
            .populate('userId')    

    
        return reservations;
    }
    
    
    // async getReservationById(id) {
    //     const reservation = await reservationModel.findById(id);
    //     if (!reservation) throw new Error('Reservation not found');
    //     return reservation;
    // }
    
    async createReservation(reservationData) {
        const newReservation = new reservationModel(reservationData);
        await newReservation.save();
        return newReservation;
    }

    // async updateReservation(id, data) {
    //     const updatedReservation = await reservationModel.findByIdAndUpdate(id, data, { new: true });
    //     if (!updatedReservation) throw new Error('Reservation not found');
    //     return updatedReservation;
    // }
    
    // async deleteReservation(id) {
    //     const deletedReservation = await reservationModel.findByIdAndUpdate(id, { isDelete: true }, { new: true });
    //     if (!deletedReservation) throw new Error('Reservation not found');
    //     return deletedReservation;
    // }
}


module.exports = new ReservationService();