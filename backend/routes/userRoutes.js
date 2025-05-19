
import express from 'express';
import { registerUser, loginUser, getAllDoctors, getPatientsOfDoctor } from '../controller/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/doctors', getAllDoctors);
router.get('/doctor-patients/:doctorId', getPatientsOfDoctor);

export default router;
