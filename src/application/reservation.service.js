const Reservation = require('../domain/reservation/reservation.domain');

const reservationRepo = require('../infrastructure/db/reservation/reservation.repo');
const addressRepo = require('../infrastructure/db/reservation/address.repo');

const { parseDate } = require('../utils/reservationUtils');

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


async function getReservations(id) {
  const result = await reservationRepo.getClientReservations(id);
  return result ? result : [];
}
async function getReservationById(user_id , reservationId) {
  const result = await reservationRepo.getById(user_id, reservationId);
  return result ? result : [];
}

// async function getReservation(id) {
//   const result = await reservationRepo.getById(id);
//   return result.length > 0 ? result : [];
// }

// async function getAllReservations() {
//   const result = await reservationRepo.getAll();
//   return result.length > 0 ? result : [];
// }



// async function editFullReservation(id, data) {
//   const existing = await reservationRepo.getById(id);
//   const normalizedData = new Reservation(data)
//   if (!existing) {
//     throw new Error('Reserva no encontrada');
//   }

//   const updatedFields = {};
//   for (const key in data) {
//     if (normalizedData[key] !== undefined && normalizedData[key] !== existing[key]) {
//       updatedFields[key] = normalizedData[key];
//     }
//   }

//   if (Object.keys(updatedFields).length === 0) {
//     return updatedFields;
//   }

//   const updatedReservation = new Reservation(data);
//   await reservationRepo.update(id, updatedReservation);

//   return updatedFields;
// }

// async function eraseReservation(id) {
//   const erased = await reservationRepo.erase(id);
//   return []
// }

// async function getUnavailableDates() {
//   const allReservations = await reservationRepo.getAll();
//   const unavailableDates = [];
//   allReservations.forEach(reservation => {
//     const dates = [reservation.check_in, reservation.check_out].map(date => parseDate(date));
//     unavailableDates.push(...dates);
//   });
//   return unavailableDates;
// }

module.exports = { createReservation, editReservation, getReservations, getReservationById };