import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchRequests } from "../api/api";
import ScheduleList from "../components/ScheduleList"; 
import { FaArrowLeft } from "react-icons/fa";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests()
      .then((data) => setRequests(data))
      .catch(() => setError("Could not load requests."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-emerald-600 text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/" className="text-white hover:text-emerald-200">
            <FaArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-semibold">Your Pickup Requests</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        <ScheduleList schedule={requests} loading={loading} />
      </main>
      <footer className="text-center py-6 text-gray-400 text-sm">
  Waste Pickup Scheduler – Built by <span 
  className="font-semibold text-gray-600">Zakari Samu</span> for 3MTT
</footer>
    </div>
  );
}
