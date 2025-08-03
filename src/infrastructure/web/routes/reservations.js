const express = require('express');
const { createReservation, editFullReservation, eraseReservation, getReservation, getAllReservations, getUnavailableDates } = require('../../../application/reservationService');

const router = express.Router();

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

router.post('/create-reservation', async (req, res) => {
  try {
    const result = await createReservation(req.body);
    res.status(201).json({ message: 'Created Reservation', id: result.id });
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
