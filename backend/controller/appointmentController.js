// import Appointment from '../models/Appointment.js';

// export const bookAppointment = async (req, res) => {
//   const { patientId, doctorId, date, reason } = req.body;

//   if (!patientId || !doctorId || !date) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     const appointment = new Appointment({
//       patient: patientId,
//       doctor: doctorId,
//       date: new Date(date),
//       reason
//     });

//     await appointment.save();
//     res.status(201).json({ message: 'Appointment booked successfully.' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error.', error: err.message });
//   }
// };

// export const cancelAppointment = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const appointment = await Appointment.findById(id);
//     if (!appointment) return res.status(404).json({ message: 'Appointment not found.' });

//     appointment.status = 'cancelled';
//     await appointment.save();

//     res.status(200).json({ message: 'Appointment cancelled.' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error.', error: err.message });
//   }
// };

// export const getAllAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find({ status: { $ne: 'cancelled' } })
//       .populate('patient', 'name email')
//       .populate('doctor', 'name email')
//       .sort({ date: -1 });

//     res.status(200).json(appointments);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch appointments.', error: err.message });
//   }
// };


import Appointment from '../models/Appointment.js';


export const bookAppointment = async (req, res) => {
  const { patientId, doctorId, date, reason } = req.body;

  // Validation
  if (!patientId || !doctorId || !date) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      date: new Date(date),
      reason: reason || '',
      status: 'booked',
    });

    await appointment.save();

    return res.status(201).json({ message: 'Appointment booked successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};




export const cancelAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found.' });

    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({ message: 'Appointment cancelled.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: { $ne: 'cancelled' } })
      .populate('patient', 'name email')
      .populate('doctor', 'name email')
      .sort({ date: -1 });

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments.', error: err.message });
  }
};
