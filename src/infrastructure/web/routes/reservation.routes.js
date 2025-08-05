const express = require('express');
const authRepo = require("../../db/auth/auth.repo");

const { createReservation, getReservations, getReservationById, editFullReservation, eraseReservation, getReservation, getAllReservations, getUnavailableDates } = require('../../../application/reservation.service');
const { route } = require('./auth.routes');

const router = express.Router();

router.post('/create-reservation', async (req, res) => {
  try {
    const { client, address, booking_details, flags } = req.body;

    // Validación de datos obligatorios
    if (!client || !address || !booking_details) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    let user;

    if (flags?.hasAuth) {
      user = await authRepo.findByEmail(client.email);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } else {
      user = await authRepo.save(client);
    }

    // Crear nuevo objeto con datos completos
    const data = {
      client: user,
      address: {
        ...address,
        user_id: user.id,
      },
      booking_details: {
        ...booking_details,
        user_id: user.id,
      },
    };

    const result = await createReservation(data);

    res.status(201).json({ message: 'Created Reservation', id: result });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Error en la reserva' });
  }
});

//It has to be a post because it needs the client id
//There should be a middleware to authenticate the user
//and get the client id from the token
//This is a temporary solution
router.post('/client-reservation-list', async (req, res) => {
  try {

    //Esto habría que cambiarlo por un middleware de autenticación
    if (!req.body.client || !req.body.client.id) {
      return res.status(400).json({ error: 'Faltan datos del cliente' });
    }
    const result = await getReservations(req.body.client.id);
    res.status(200).json({ message: 'Client Reservations', data: result });

  } catch (error) {
    res.status(400).json({ error: error.message || 'Error fetching client reservations' }); 
  }
});
router.get('/client-reservation-list/:id', async (req, res) => {
  try {
    const result = await getReservationById(req.params.id);
    res.status(200).json({ message: 'Client Reservation Detail', data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
 

router.get('/', async (req, res) => {
  try {
    const result = await getAllReservations();
    res.status(200).json({ message: 'Reservations', data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/unavailable-dates', async (req, res) => {
  try {
    const result = await getUnavailableDates();
    res.status(200).json({ message: 'Unavailable Dates', data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await getReservation(req.params.id);
    res.status(200).json({ message: 'Reservation', data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



router.put('/edit-reservation/:id', async (req, res) => {
  try {
    const result = await editFullReservation(req.params.id, req.body);
    res.status(200).json({ message: 'Edited full Reservation', data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/erase-reservation/:id', async (req, res) => {
  try {
    const result = await eraseReservation(req.params.id);
    res.status(200).json({ message: 'Erased Reservation', result: [] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
