import PickupCard from './PickupCard';
import { FaCalendarDay } from 'react-icons/fa';

/**
 * PickupFeed – renders a list of upcoming waste pickups.
 * @param {Array} pickups - Array of objects { date: string (YYYY-MM-DD), type: string }
 * @param {string} [title] - Optional heading (default: 'Upcoming Pickups')
 * @param {boolean} [loading] - If true, shows a loading skeleton
 * @param {string} [emptyMessage] - Custom message if no pickups (default: 'No upcoming pickups')
 */
export default function PickupFeed({
  pickups = [],
  title = 'Upcoming Pickups',
  loading = false,
  emptyMessage = 'No upcoming pickups',
}) {
  if (loading) {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <FaCalendarDay className="text-green-500" />
          {title}
        </h3>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
        <FaCalendarDay className="text-green-500" />
        {title}
      </h3>
      {pickups.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-200">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        pickups.map((pickup, index) => (
          <PickupCard key={index} date={pickup.date} type={pickup.type} />
        ))
      )}
    </div>
  );
}