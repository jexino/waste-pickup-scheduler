import { FiCalendar, FiMapPin } from 'react-icons/fi';

const ScheduleList = ({ schedule = [], loading = false }) => {
  if (loading) {
    return (
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FiCalendar className="text-emerald-500" />
          Upcoming Collections
        </h2>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse p-4 border border-gray-100 rounded-lg bg-gray-50"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FiCalendar className="text-emerald-500" />
        Upcoming Collections
      </h2>

      <div className="space-y-3 h-80 overflow-y-auto pr-2">
        {schedule.length === 0 ? (
          <p className="text-gray-500 text-sm">No pickups scheduled yet.</p>
        ) : (
          schedule.map((req) => (
            <div
              key={req.id}
              className="p-4 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">{req.name}</h3>
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                  {req.status || "Pending"}
                </span>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                <FiMapPin size={14} /> {req.address}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <FiCalendar size={14} /> {req.pickup_date}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ScheduleList;
