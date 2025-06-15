import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MealSection from '../components/MealSection';

const Dashboard = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const url = filterDate 
          ? `http://localhost:5000/api/menu/${filterDate}`
          : 'http://localhost:5000/api/menu';
        
        const response = await axios.get(url);
        setMenuData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load menu data. Please try again later.');
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [filterDate]);

  // Group menu data by date
  const groupByDate = (data) => {
    return data.reduce((acc, item) => {
      const date = item.date.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  const groupedMenuData = groupByDate(menuData);

  return (
    <div className="min-h-screen bg-[#f9f5f0] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Simplified Date Filter */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#7f5539]">Menu Dashboard</h1>
          
          <div className="w-64">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Filter by Date
            </label>
            <DatePicker
              selected={filterDate ? new Date(filterDate) : null}
              onChange={(date) => {
                setFilterDate(date ? date.toISOString().split('T')[0] : '');
              }}
              isClearable
              placeholderText="Select date or clear"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7f5539]"
            />
          </div>
        </div>

        {/* Rest of your dashboard content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7f5539]"></div>
            <p className="mt-4 text-gray-600">Loading menu data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : Object.keys(groupedMenuData).length > 0 ? (
          Object.entries(groupedMenuData).map(([date, items]) => {
            const groupedByMealType = items.reduce((acc, item) => {
              if (!acc[item.type]) {
                acc[item.type] = [];
              }
              acc[item.type].push(...item.items);
              return acc;
            }, {});

            return (
              <div key={date} className="mb-12">
                <h2 className="text-2xl font-bold text-[#7f5539] mb-6 flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h2>
                
                {Object.entries(groupedByMealType).map(([mealType, items]) => (
                  <MealSection
                    key={`${date}-${mealType}`}
                    title={mealType}
                    items={items}
                    icon={<FaClock className="text-[#7f5539]" />}
                  />
                ))}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-gray-500">
            No menu data available {filterDate ? `for ${filterDate}` : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;