// import express from 'express';
// import {
//   registerUser,
//   loginUser,
//   getAllDoctors,
//   getAllPatients
// } from '../controller/userController.js';

// const router = express.Router();

// // Register a new user (patient or doctor)
// router.post('/register', registerUser);

// // Login a user and return JWT
// router.post('/login', loginUser);

// // Get all doctors
// router.get('/doctors', getAllDoctors);

// // Get all patients
// router.get('/patients', getAllPatients);

// export default router;


// routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, getAllDoctors, getPatientsOfDoctor } from '../controller/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/doctors', getAllDoctors);
router.get('/doctor-patients/:doctorId', getPatientsOfDoctor);

export default router;
