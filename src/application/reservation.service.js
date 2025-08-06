const Reservation = require('../domain/reservation/reservation.domain');

const reservationRepo = require('../infrastructure/db/reservation/reservation.repo');
const addressRepo = require('../infrastructure/db/reservation/address.repo');

const { calculateTotal } = require('../utils/reservationUtils');

async function createReservation(data) {
  const reservation = new Reservation(data);

  if (!data.client.user_id) {
    throw new Error('User not found');
  }

  const reservationId = await reservationRepo.save({
    ...reservation.booking_details,
  });

  if (!reservationId) {
    throw new Error('Error creating reservation');
  }

  const addressId = await addressRepo.save({
    ...reservation.address,
    reservation_code: reservation.booking_details.reservation_code, 
  });

  if (!addressId) {
    throw new Error('Error creating address');
  }

  if (!addressId || !reservationId) {
    throw new Error('Error creating reservation');
  }

  return { reservation_id: reservationId, reservation_code: reservation.booking_details.reservation_code };
}
async function editReservation(user_id, reservation_id, data) {

  const existing = await reservationRepo.getById(user_id, reservation_id, data.reservation_code);
  if (!existing) {
    throw new Error('Reservation not found or does not belong to user');
  }

  const updatedReservation = new Reservation({
    ...data,
    client: { user_id },
  });

  const updated = await reservationRepo.update(
    existing.id, 
    existing.user_id, 
    updatedReservation.booking_details
  );

  const updatedAddress = await addressRepo.update(
    existing.user_id, 
    existing.reservation_code, 
    {
      ...updatedReservation.address
    }
  );

  if (!updated || !updatedAddress) {
    throw new Error('Error updating reservation');
  }

  return {
    reservation_id,
    bookingDetails: updatedReservation.booking_details,
    address: updatedReservation.address
  };
}
async function eraseReservation(user_id, reservation_code, reservation_id) {
  const existing = await reservationRepo.getById(user_id, reservation_id, reservation_code);
  if (!existing) {
    throw new Error('Reservation not found');
  }

  const erased = await reservationRepo.erase(reservation_id, user_id);
  if (!erased) {
    throw new Error('Error erasing reservation');
  }

  return true;
}


async function getReservations(id) {
  const result = await reservationRepo.getClientReservations(id);
  return result ? result : [];
}
async function getReservationById(user_id, reservationId, reservation_code) {
  const result = await reservationRepo.getById(user_id, reservationId, reservation_code);
  return result ? result : [];
}
async function getAllReservations() {
  const result = await reservationRepo.getAllReservations();
  return result ? result : [];
}

async function changeReservationStatus(reservationId, reservation_code, status) {
  const updated = await reservationRepo.updateReservationStatus(reservationId, reservation_code, status);
  if (!updated) {
    throw new Error('Error changing reservation status');
  }
  return true;
}
async function changeReservationDates(reservationId, reservation_code, data) {
  const existing = await reservationRepo.getById(data.client.user_id, reservationId, reservation_code);
  if (!existing) {
    throw new Error('Reservation not found or does not belong to user');
  }

  const total = calculateTotal(data.booking_details.check_in, data.booking_details.check_out, existing.rate_per_night);
  const updated = await reservationRepo.changeReservationDates(reservationId, reservation_code, {
    ...data.booking_details,
    total
  });
  if (!updated) {
    throw new Error('Error changing reservation dates');
  }
  return {reservation_code, total };
}
async function getUnavailableDates() {
  const unavailableDates = await reservationRepo.getUnavailableDates();

  const result = new Set();
  unavailableDates.forEach(date => {
    result.add(date.check_in.toISOString());
    result.add(date.check_out.toISOString());
  });

  return result ? Array.from(result) : [];
}


module.exports = { createReservation, editReservation, eraseReservation, getReservations, getReservationById, getAllReservations, getUnavailableDates, changeReservationStatus, changeReservationDates };