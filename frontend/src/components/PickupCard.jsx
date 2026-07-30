import { FaTrash, FaRecycle, FaLeaf } from 'react-icons/fa';

const iconMap = {
  trash: FaTrash,
  recycling: FaRecycle,
  yard_waste: FaLeaf,
};

const colorMap = {
  trash: 'bg-red-100 text-red-800 border-red-300',
  recycling: 'bg-blue-100 text-blue-800 border-blue-300',
  yard_waste: 'bg-green-100 text-green-800 border-green-300',
};

export default function PickupCard({ date, type }) {
  const Icon = iconMap[type] || FaTrash;
  const colorClass = colorMap[type] || 'bg-gray-100 text-gray-800 border-gray-300';

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg border ${colorClass} shadow-sm`}>
      <div className="text-2xl">
        <Icon />
      </div>
      <div>
        <p className="font-semibold text-lg">{formattedDate}</p>
        <p className="capitalize text-sm opacity-80">{type.replace('_', ' ')}</p>
      </div>
    </div>
  );
}