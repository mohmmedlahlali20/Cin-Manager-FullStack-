const reservationModel = require('../models/reservation');


class ReservationService {
    async getAllReservations() {
        const reservations = await reservationModel.find({ isDelete: false });
        return reservations;
    }
    
    async getReservationById(id) {
        const reservation = await reservationModel.findById(id);
        if (!reservation) throw new Error('Reservation not found');
        return reservation;
    }
    
    async createReservation(data) {
        const newReservation = new reservationModel(data);
        await newReservation.save();
        return newReservation;
    }

    async updateReservation(id, data) {
        const updatedReservation = await reservationModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedReservation) throw new Error('Reservation not found');
        return updatedReservation;
    }
    
    async deleteReservation(id) {
        const deletedReservation = await reservationModel.findByIdAndUpdate(id, { isDelete: true }, { new: true });
        if (!deletedReservation) throw new Error('Reservation not found');
        return deletedReservation;
    }
}