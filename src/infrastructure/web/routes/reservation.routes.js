const express = require('express');
const {authMiddleware, requireAuth} = require("../../../middlewares/auth.middleware");

const authRepo = require("../../db/auth/auth.repo");

const { createReservation, editReservation, getReservations, getReservationById, eraseReservation, getReservation, getAllReservations, getUnavailableDates } = require('../../../application/reservation.service');
const { route } = require('./auth.routes');

const router = express.Router();

// TODO: Before creating a reservation, check if the user is authenticated
// and if the client exists in the database
// This is a temporary solution, it should be done in the auth middleware
// The front should manage firts the registration of the client


router.post('/create-reservation', async (req, res) => {
  try {
    // Validación de datos obligatorios
    if (!req.body.client || !req.body.address || !req.body.booking_details) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const result = await createReservation(req.body);

    res.status(201).json({ message: 'Created Reservation', id: result });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Error en la reserva' });
  }
});


// Client reservation routes
// These routes are protected by the authMiddleware and requireAuth middleware
// They ensure that only authenticated users can access their own reservations
router.post('/client-reservation-list', authMiddleware, requireAuth, async (req, res) => {
  try {
    const result = await getReservations(req.user.id);
    res.status(200).json({ message: 'Client Reservations', data: result });

  } catch (error) {
    res.status(400).json({ error: error.message || 'Error fetching client reservations' }); 
  }
});
router.get('/client-reservation-list/:id', authMiddleware, requireAuth, async (req, res) => {
  try {
    const result = await getReservationById(req.user.id, req.params.id);
    res.status(200).json({ message: 'Client Reservation Detail', data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.patch('/edit-reservation/:id', authMiddleware, requireAuth, async (req, res) => {
  try {
    const result = await editReservation(req.user.id, req.params.id, req.body);
    res.status(200).json({ message: 'Edited full Reservation', data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
 



// router.get('/', async (req, res) => {
//   try {
//     const result = await getAllReservations();
//     res.status(200).json({ message: 'Reservations', data: result });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.get('/unavailable-dates', async (req, res) => {
//   try {
//     const result = await getUnavailableDates();
//     res.status(200).json({ message: 'Unavailable Dates', data: result });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const result = await getReservation(req.params.id);
//     res.status(200).json({ message: 'Reservation', data: result });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });



// router.put('/edit-reservation/:id', async (req, res) => {
//   try {
//     const result = await editFullReservation(req.params.id, req.body);
//     res.status(200).json({ message: 'Edited full Reservation', data: result });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.delete('/erase-reservation/:id', async (req, res) => {
//   try {
//     const result = await eraseReservation(req.params.id);
//     res.status(200).json({ message: 'Erased Reservation', result: [] });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });


module.exports = router;
