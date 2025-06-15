import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaHome, FaInfoCircle, FaUtensils, FaTachometerAlt } from 'react-icons/fa';
import { GiCook } from 'react-icons/gi';
import { signoutUserFailure, signoutUserStart, signoutUserSuccess } from '../redux/admin/adminSlice';
import axios from 'axios';
import {  toast } from 'react-toastify';


const Navbar = () => {
  const { currentAdmin } = useSelector((state) => state.admin);

  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleLogout = async () => {
    try {
      dispatch(signoutUserStart());

      const res = await axios.get("http://localhost:5000/api/admin/logout", {
        withCredentials: true,
      });

      const data = res.data;

      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }

      dispatch(signoutUserSuccess(data));

      toast.success('Logout successful! Redirecting...', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => navigate('/login'), 1000);

    } catch (error) {
      dispatch(signoutUserFailure(error.message));

      toast.error('Logout failed. Please try again.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };



  return (
    <nav className="bg-[#7f5539] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <GiCook className="h-8 w-8 text-yellow-300" />
            <span className="text-xl font-bold font-serif">
              <span className="text-yellow-300">Cloud</span> Kitchen
            </span>
          </div>


          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-4">
              <NavButton
                icon={<FaHome />}
                text="Home"
                onClick={() => navigate('/')}
              />
              {currentAdmin && (
              <NavButton
                icon={<FaUtensils />}
                text="Menu"
                onClick={() => navigate('/menu')}
              />
              )}
              {currentAdmin && (
                <NavButton
                  icon={<FaTachometerAlt />}
                  text="Dashboard"
                  onClick={() => navigate('/dashboard')}
                />
              )}
              <NavButton
                icon={<FaInfoCircle />}
                text="About"
                onClick={() => navigate('/about')}
              />

            </div>
          </div>


          <div className="flex items-center">
            {currentAdmin ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition duration-300 shadow"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-1 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition duration-300 shadow"
              >
                <FaSignInAlt />
                <span>Admin</span>
              </button>
            )}
          </div>
        </div>

        <div className="md:hidden pb-2">
          <div className="grid grid-cols-3 gap-2">
            <MobileNavButton
              icon={<FaHome />}
              text="Home"
              onClick={() => navigate('/')}
            />
             {currentAdmin && (
            <MobileNavButton
              icon={<FaUtensils />}
              text="Menu"
              onClick={() => navigate('/menu')}
            />
             )}
            {currentAdmin && (
              <MobileNavButton
                icon={<FaTachometerAlt />}
                text="Dashboard"
                onClick={() => navigate('/dashboard')}
              />
            )}
            <MobileNavButton
              icon={<FaInfoCircle />}
              text="About"
              onClick={() => navigate('/about')}
            />

          </div>
        </div>
      </div>
    </nav>
  );
};


const NavButton = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-1 text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
  >
    {icon}
    <span>{text}</span>
  </button>
);


const MobileNavButton = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-2 text-white hover:bg-[#6a452e] rounded transition duration-300"
  >
    <span className="text-lg">{icon}</span>
    <span className="text-xs mt-1">{text}</span>
  </button>
);

export default Navbar;