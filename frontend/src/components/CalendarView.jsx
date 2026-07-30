import { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function CalendarView({ pickups }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const pickupDates = pickups.map(p => new Date(p.date));

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 hover:bg-gray-200 rounded-full">
          <FaChevronLeft />
        </button>
        <h3 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h3>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-gray-200 rounded-full">
          <FaChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
          <div key={d} className="text-sm font-medium text-gray-500">{d}</div>
        ))}
        {days.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isPickup = pickupDates.some(d => isSameDay(d, day));
          return (
            <div
              key={i}
              className={`py-2 rounded-md text-sm cursor-default ${
                isCurrentMonth ? 'text-gray-800' : 'text-gray-400'
              } ${isPickup ? 'bg-green-200 font-bold' : ''}`}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
}