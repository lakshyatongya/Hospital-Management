
import express from 'express';
import { bookAppointment, cancelAppointment, getAllAppointments } from '../controller/appointmentController.js';

const router = express.Router();

router.post('/book', bookAppointment);
router.delete('/:id', cancelAppointment);
router.get('/', getAllAppointments);

export default router;
