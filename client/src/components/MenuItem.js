import { FaUtensils} from 'react-icons/fa';

const MenuItem = ({ item }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 h-full flex flex-col">
      <div className="flex-grow p-4">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-48 object-cover mb-4 rounded"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=Food+Image';
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center mb-4 rounded">
            <FaUtensils className="text-gray-400 text-3xl" />
          </div>
        )}
        <h4 className="font-bold text-lg mb-2">{item.name}</h4>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{item.quantity}</span>
          <span>{item.sufficientFor}</span>
        </div>
        <div className="mt-4 flex justify-end">
          <span className="inline-block bg-[#ede0d4] text-[#7f5539] font-bold px-3 py-1 rounded-md">
            ₹{item.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;