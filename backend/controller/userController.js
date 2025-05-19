// import User from '../models/User.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// // Register a new user (patient or doctor)
// export const registerUser = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   if (!name || !email || !password || !role) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, email, password: hashedPassword, role });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully.' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error.', error: err.message });
//   }
// };



// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

//     if (!process.env.JWT_SECRET) {
//       console.error('JWT_SECRET is not defined!');
//       return res.status(500).json({ message: 'Server error: Missing JWT secret.' });
//     }

//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error.', error: err.message });
//   }
// };


// // Get all doctors
// export const getAllDoctors = async (req, res) => {
//   try {
//     const doctors = await User.find({ role: 'doctor' }).select('-password');
//     res.status(200).json(doctors);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch doctors.', error: err.message });
//   }
// };

// // Get all patients
// export const getAllPatients = async (req, res) => {
//   try {
//     const patients = await User.find({ role: 'patient' }).select('-password');
//     res.status(200).json(patients);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch patients.', error: err.message });
//   }
// };




import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Missing JWT secret.' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-password');
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch doctors.', error: err.message });
  }
};


import Appointment from '../models/Appointment.js';


export const getPatientsOfDoctor = async (req, res) => {
  const doctorId = req.params.doctorId;

  try {
    const patientIds = await Appointment.distinct('patient', {
      doctor: doctorId,
      status: { $ne: 'cancelled' },
    });

    const patients = await User.find({ _id: { $in: patientIds } }).select('name email');

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch patients.', error: error.message });
  }
};
