const Reservation = require('../domain/reservation/reservation.domain');

const reservationRepo = require('../infrastructure/db/reservation/reservation.repo');
const addressRepo = require('../infrastructure/db/reservation/address.repo');


async function createReservation(data) {
  const reservation = new Reservation(data);

  if (!data.client.user_id) {
    throw new Error('User not found');
  }

  const [address, reservationId] = await Promise.all([
    addressRepo.save({
      ...reservation.address,
    }),
    reservationRepo.save({
      ...reservation.booking_details,
    })
  ]);

  if (!address || !reservationId || !data.client.user_id) {
    throw new Error('Error creating reservation');
  }

  return { reservation_id: reservationId };
}
async function editReservation(user_id, reservation_id, data) {
  // 1. Obtener reserva original
  const existing = await reservationRepo.getById(user_id, reservation_id);
  if (!existing) {
    throw new Error('Reservation not found or does not belong to user');
  }

  const updatedReservation = new Reservation({
    ...data,
    client: { user_id },
  });

  const updatedAddress = await addressRepo.update(existing.user_id, {
    ...updatedReservation.address
  });

  const updated = await reservationRepo.update(existing.id, existing.user_id, updatedReservation.booking_details);

  if (!updated || !updatedAddress) {
    throw new Error('Error updating reservation');
  }

  return {
    reservation_id,
    ...updatedReservation.bookingDetails,
    address: updatedReservation.address
  };
}
async function eraseReservation(user_id, reservation_id) {
  const existing = await reservationRepo.getById(user_id, reservation_id);
  if (!existing) {
    throw new Error('Reservation not found');
  }

  const erased = await reservationRepo.erase(reservation_id, user_id);
  if (!erased) {
    throw new Error('Error erasing reservation');
  }

  const addressErased = await addressRepo.erase(user_id);
  if (!addressErased) {
    throw new Error('Error erasing address');
  }

  return true;
}


async function getReservations(id) {
  const result = await reservationRepo.getClientReservations(id);
  return result ? result : [];
}
async function getReservationById(user_id , reservationId) {
  const result = await reservationRepo.getById(user_id, reservationId);
  return result ? result : [];
}


module.exports = { createReservation, editReservation, eraseReservation, getReservations, getReservationById };