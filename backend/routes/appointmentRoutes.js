// import express from 'express';
// import { bookAppointment, cancelAppointment, getAllAppointments } from '../controllers/appointmentController.js';

// const router = express.Router();

// router.post('/', bookAppointment);            // POST /api/appointments
// router.delete('/:id', cancelAppointment);      // DELETE /api/appointments/:id
// router.get('/', getAllAppointments);           // GET /api/appointments

// export default router;


// routes/appointmentRoutes.js
import express from 'express';
import { bookAppointment, cancelAppointment, getAllAppointments } from '../controller/appointmentController.js';

const router = express.Router();

router.post('/book', bookAppointment);
router.delete('/:id', cancelAppointment);
router.get('/', getAllAppointments);

export default router;
