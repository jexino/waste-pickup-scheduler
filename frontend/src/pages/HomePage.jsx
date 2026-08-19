import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchZones } from "../api/api";
import AddressSearch from "../components/AddressSearch";
import PickupRequestForm from "../components/PickupRequestForm"; // from your earlier component
import { FaClipboardList, FaTrash } from "react-icons/fa";

export default function HomePage() {
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchZones()
      .then((data) => setZones(data))
      .catch(() => setError("Could not load zones. Backend might be offline."))
      .finally(() => setLoading(false));
  }, []);

  const handleZoneChange = (e) => {
    const id = e.target.value;
    setSelectedZone(id);
    if (id) navigate(`/schedule/${id}`);
  };

  const handleAddressFound = (zoneId) => {
    navigate(`/schedule/${zoneId}`);
  };

  // Function to refresh requests list after submission (optional, but we can just console.log)
  const handleRequestSuccess = () => {
    // You could navigate to the requests page, but for now just log
    console.log("Request submitted – redirecting to requests page...");
    // Optionally: navigate('/requests');
  };

  return (
    <div className="min-h-screen  bg-gradient-to-b from-green-50 to-white flex  ">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
      <div className="mb-8 sm:mb-10 text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          <div className="bg-green-100 p-4 rounder-full">
            <FaTrash className="text-green-600 text-2xl sm:text-4xl" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-2">
          Waste Pickup Scheduler
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Never miss a collection day again.
        </p>
      </div>

      <div className="w-full max-w-md space-y-8">
        {/* Schedule finder card */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Find Your Schedule</h2>
          {loading ? (
            <p className="text-gray-500">Loading zones...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <select
              value={selectedZone}
              onChange={handleZoneChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 mb-4"
            >
              <option value="">-- Select your zone --</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}
                </option>
              ))}
            </select>
          )}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">
                or search by address
              </span>
            </div>
          </div>
          <AddressSearch onZoneFound={handleAddressFound} />
        </div>

        {/* Pickup request form card */}
        <div className="mb-6">
          <PickupRequestForm onSubmissionSuccess={handleRequestSuccess} />
        </div>

        {/* Link to view all submitted requests */}
        <Link
          to="/requests"
          className="flex items-center justify-center gap-2 sm:gap-3 
                    w-full bg-white p-4 sm:p-5 rounded-xl shadow-sm border 
                    border-gray-100 hover:bg-gray-50 transition group"
        >
          <FaClipboardList className="text-emerald-500" />
          <span className="text-gray-700 font-medium">
            View Your Pickup Requests
          </span>
        </Link>
       </div> 
      </div>
    </div>
  );
}
