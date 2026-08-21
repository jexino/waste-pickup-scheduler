import { useState } from "react";
import { FiAlertCircle, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { createRequest } from "../api/api";

const PickupRequestForm = ({ onSubmissionSuccess }) => {
  const [formData, setFormData] = useState({ name: "", address: "", date: "" });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createRequest({
        name: formData.name,
        address: formData.address,
        pickup_date: formData.date,
      });
      setStatusMessage('Pickup requested successfully!');
      setFormData({ name: '', address: '', date: '' });
      if (onSubmissionSuccess) onSubmissionSuccess();
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      console.error('Failed to submit request:', err);
      setStatusMessage('Failed to submit request. Please try again.');
      setTimeout(() => setStatusMessage(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FiAlertCircle className="text-emerald-500" />
        Request a Special Pickup
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="Enter Your Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Pickup Address
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Enter Pickup Address"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Preferred Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          {isSubmitting ? 'Scheduling...' : 'Schedule Pickup'}
        </button>
      </form>

      {statusMessage && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
          <FiCheckCircle size={18} />
          {statusMessage}
        </div>
      )}
    </section>
  );
};

export default PickupRequestForm;
