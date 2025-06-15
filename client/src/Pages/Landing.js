import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUtensils, FaCalendarAlt, FaClock } from 'react-icons/fa';
import MealSection from '../components/MealSection';

const Landing = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/menu`);
        setMenuData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load menu. Please try again later.');
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Organize menu data
  const organizeMenuData = () => {
    const todayMenu = {};
    const upcomingMenus = {};

    menuData.forEach(item => {
      const itemDate = item.date.split('T')[0];
      const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });

      if (itemDate === today) {
        if (!todayMenu[item.type]) {
          todayMenu[item.type] = [];
        }
        todayMenu[item.type].push(...item.items);
      } else {
        if (!upcomingMenus[itemDate]) {
          upcomingMenus[itemDate] = {
            formattedDate,
            meals: {}
          };
        }
        if (!upcomingMenus[itemDate].meals[item.type]) {
          upcomingMenus[itemDate].meals[item.type] = [];
        }
        upcomingMenus[itemDate].meals[item.type].push(...item.items);
      }
    });

    return { todayMenu, upcomingMenus };
  };

  const { todayMenu, upcomingMenus } = organizeMenuData();

  return (
    <div className="min-h-screen bg-[#f9f5f0]">

      <div className="relative bg-[#6a452e] text-white py-8 px-4 overflow-hidden">
    
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-yellow-400 mix-blend-multiply filter blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-amber-500 mix-blend-multiply filter blur-xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
            Welcome to <span className="text-yellow-400">Cloud Kitchen</span>
          </h1>

          <div className="inline-block mb-8">
            <p className="text-xl md:text-2xl relative inline-block">
              Delicious meals prepared with love
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center ${activeTab === 'today'
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg transform hover:scale-105'
                : 'border-2 border-white hover:bg-white hover:text-[#7f5539] text-white shadow-md'
                }`}
            >
              <FaClock className="mr-2" />
              Today's Specials
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center ${activeTab === 'upcoming'
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg transform hover:scale-105'
                : 'border-2 border-white hover:bg-white hover:text-[#7f5539] text-white shadow-md'
                }`}
            >
              <FaCalendarAlt className="mr-2" />
              Upcoming Menus
            </button>
          </div>

          <div className="mt-12 flex justify-center space-x-8 opacity-80">
            <FaUtensils className="text-3xl animate-float delay-100" />
            <div className="text-3xl animate-float delay-200">🍕</div>
            <div className="text-3xl animate-float delay-300">🍔</div>
            <div className="text-3xl animate-float delay-400">🥗</div>
          </div>
        </div>

        <div className="mt-8 py-4 bg-black bg-opacity-20 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            <span className="mx-8">🍳 Chef's Special Daily 🍳</span>
            <span className="mx-8">🥘 100% Fresh Ingredients 🥘</span>
            <span className="mx-8">🍜 Made With Love 🍜</span>
            <span className="mx-8">🥗 Healthy & Delicious 🥗</span>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        {activeTab === 'today' ? (
          <div className="py-12 px-4">
            <h2 className="text-3xl font-bold text-[#7f5539] mb-8 text-center">
              Today's Menu - {new Date(today).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7f5539]"></div>
                <p className="mt-4 text-gray-600">Loading today's menu...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">{error}</div>
            ) : Object.keys(todayMenu).length > 0 ? (
              Object.entries(todayMenu).map(([mealType, items]) => (
                <MealSection
                  key={mealType}
                  title={mealType}
                  items={items}
                  icon={<FaClock className="text-[#7f5539]" />}
                />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No menu available for today. Check back later!
              </div>
            )}
          </div>
        ) : (
          <div className="py-12 px-4">
            <h2 className="text-3xl font-bold text-[#7f5539] mb-8 text-center">Upcoming Menus</h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7f5539]"></div>
                <p className="mt-4 text-gray-600">Loading upcoming menus...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">{error}</div>
            ) : Object.keys(upcomingMenus).length > 0 ? (
              Object.entries(upcomingMenus).map(([date, { formattedDate, meals }]) => (
                <div key={date} className="mb-12">
                  <h3 className="text-2xl font-bold text-[#7f5539] mb-4 border-b pb-2">
                    {formattedDate}
                  </h3>
                  {Object.entries(meals).map(([mealType, items]) => (
                    <MealSection
                      key={`${date}-${mealType}`}
                      title={mealType}
                      items={items}
                      icon={<FaCalendarAlt className="text-[#7f5539]" />}
                    />
                  ))}
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No upcoming menus available. Check back later!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


export default Landing;