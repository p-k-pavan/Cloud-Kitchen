import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaFilter, FaClock } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MealSection from '../components/MealSection';

const Dashboard = () => {
  const { currentAdmin } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Redirect to login if no admin is authenticated
  useEffect(() => {
    if (!currentAdmin) {
      navigate('/admin/login');
    }
  }, [currentAdmin, navigate]);

  useEffect(() => {
    if (!currentAdmin) return; // Don't fetch data if not authenticated

    const fetchMenuData = async () => {
      try {
        const url = filterDate 
          ? `http://localhost:5000/api/menu/${filterDate}`
          : 'http://localhost:5000/api/menu';
        
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setMenuData(response.data.data);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/login');
        } else {
          setError('Failed to load menu data. Please try again later.');
        }
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [filterDate, currentAdmin, navigate]);

  const handleDateFilter = (e) => {
    e.preventDefault();
    setShowDatePicker(false);
  };

  const clearFilter = () => {
    setFilterDate('');
    setShowDatePicker(false);
  };

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

  if (!currentAdmin) {
    return (
      <div className="min-h-screen bg-[#f9f5f0] flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-[#7f5539] mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please login as admin to access the dashboard</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-[#7f5539] text-white px-6 py-2 rounded-lg hover:bg-[#6a452e] transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f5f0] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#7f5539]">Menu Dashboard</h1>
          
          <div className="relative">
            <button 
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center bg-[#7f5539] text-white px-4 py-2 rounded-lg hover:bg-[#6a452e] transition"
            >
              <FaFilter className="mr-2" />
              {filterDate ? `Showing: ${filterDate}` : 'Filter by Date'}
            </button>
            
            {showDatePicker && (
              <div className="absolute right-0 mt-2 bg-white p-4 rounded-lg shadow-lg z-10">
                <form onSubmit={handleDateFilter} className="flex items-center">
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 mr-2"
                  />
                  <button 
                    type="submit" 
                    className="bg-[#7f5539] text-white px-3 py-2 rounded hover:bg-[#6a452e]"
                  >
                    Apply
                  </button>
                  {filterDate && (
                    <button
                      type="button"
                      onClick={clearFilter}
                      className="ml-2 text-gray-600 hover:text-[#7f5539]"
                    >
                      Clear
                    </button>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>

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