import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPickups } from "../api/api";
import PickupFeed from "../components/PickupFeed";
import CalendarView from "../components/CalendarView";
import { FaArrowLeft, FaCalendarAlt, FaList } from "react-icons/fa";

export default function SchedulePage() {
  const { zoneId } = useParams();
  const [pickups, setPickups] = useState([]);
  const [zoneName, setZoneName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("list");

  useEffect(() => {
    fetchPickups(zoneId)
      .then((data) => {
        setPickups(data.pickups);
        setZoneName(data.zoneName || `Zone ${zoneId}`);
        setError(null);
      })
      .catch(() =>
        setError("Could not load pickups. Backend might be offline."),
      )
      .finally(() => setLoading(false));
  }, [zoneId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/" className="text-white hover:text-green-200">
            <FaArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-semibold">{zoneName} Pickup Schedule</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* View toggle */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${view === "list" ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
            >
              <FaList className="inline mr-1" /> List
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${view === "calendar" ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
            >
              <FaCalendarAlt className="inline mr-1" /> Calendar
            </button>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* List view using PickupFeed */}
        {view === "list" && (
          <PickupFeed
            pickups={pickups}
            loading={loading}
            emptyMessage="No pickups scheduled for the next 14 days. Check back later!"
          />
        )}

        {/* Calendar view */}
        {view === "calendar" && !loading && !error && (
          <div className="bg-white p-4 rounded-lg shadow">
            <CalendarView pickups={pickups} />
          </div>
        )}
      </main>

      <footer className="text-center py-6 text-gray-400 text-sm">
        Waste Pickup Scheduler – Built by <span 
        className="font-semibold text-gray-600">Zakari Samu</span> for 3MTT
      </footer>
    </div>
  );
}
