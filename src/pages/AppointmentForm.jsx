import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { createBooking, clearBookingState } from '../redux/actions/booking';

// Import Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppointmentForm() {
  const dispatch = useDispatch();
  const { success, error } = useSelector(state => state.booking);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  });

  useEffect(() => {
    if (success) {
      toast.success('Appointment booked successfully!');
      const timeout = setTimeout(() => dispatch(clearBookingState()), 4000);
      return () => clearTimeout(timeout);
    }
    if (error) {
      toast.error(error);
      const timeout = setTimeout(() => dispatch(clearBookingState()), 4000);
      return () => clearTimeout(timeout);
    }
  }, [success, error, dispatch]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBooking(formData));
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: '',
    });
  };

  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Book an Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Phone Number"
            className="w-full border rounded px-4 py-2"
          />
          <div className="flex gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="flex-1 border rounded px-4 py-2"
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="flex-1 border rounded px-4 py-2"
            />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Optional notes..."
            rows="4"
            className="w-full border rounded px-4 py-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
      <Footer />

      {/* Add ToastContainer once in your app (can be here or higher up) */}
      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
}
