import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUtensils, FaPlus, FaMinus, FaCalendarAlt, FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';

const AddMenu = () => {
    const navigate = useNavigate();
    const fileInputRefs = useRef([]);
    const [formData, setFormData] = useState({
        type: 'Breakfast',
        date: new Date(),
        items: [{
            name: '',
            quantity: '',
            sufficientFor: '',
            price: '',
            image: ''
        }]
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState([]);
    const { currentAdmin } = useSelector((state) => state.admin);

    useEffect(() => {
        if (!currentAdmin) {
            navigate('/login');
        }
        setUploading(Array(formData.items.length).fill(false));
    }, [formData.items.length,currentAdmin, navigate]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({ ...prev, date }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const newItems = [...formData.items];
        newItems[index] = {
            ...newItems[index],
            [name]: name === 'price' ? Number(value) : value
        };
        setFormData(prev => ({ ...prev, items: newItems }));
    };

    const addItem = () => {
        if (formData.items.length >= 10) {
            toast.warning('Maximum 10 items allowed per menu');
            return;
        }
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, {
                name: '',
                quantity: '',
                sufficientFor: '',
                price: '',
                image: ''
            }]
        }));
    };

    const removeItem = (index) => {
        if (formData.items.length <= 1) {
            toast.warning('At least one item is required');
            return;
        }
        const newItems = [...formData.items];
        newItems.splice(index, 1);
        setFormData(prev => ({ ...prev, items: newItems }));
    };

    const handleImageUpload = async (index, e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
            toast.error('Only JPG/JPEG/PNG images are allowed');
            return;
        }


        if (file.size > 1 * 1024 * 1024) {
            toast.error('Image size should be less than 1MB');
            return;
        }

        const newUploading = [...uploading];
        newUploading[index] = true;
        setUploading(newUploading);

        try {
            const uploadData = new FormData();
            uploadData.append('image', file);

            const response = await axios.post(
                'http://localhost:5000/api/menu/upload',
                uploadData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );

            const newItems = [...formData.items];
            newItems[index].image = response.data.url;
            setFormData(prev => ({ ...prev, items: newItems }));

            toast.success('Image uploaded successfully!');
        } catch (err) {
            console.error('Upload error:', err);
            toast.error(err.response?.data?.message || 'Failed to upload image');
        } finally {
            const newUploading = [...uploading];
            newUploading[index] = false;
            setUploading(newUploading);
        }
    };

    const validateForm = () => {
        if (!formData.type || !formData.date) return false;

        return formData.items.every(item =>
            item.name &&
            item.quantity &&
            item.sufficientFor &&
            !isNaN(item.price) &&
            item.image
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fill all fields and upload images for all items');
            return;
        }

        setLoading(true);

        try {
            const menuData = {
                type: formData.type,
                date: formData.date.toISOString().split('T')[0],
                items: formData.items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    sufficientFor: item.sufficientFor,
                    price: item.price,
                    image: item.image
                }))
            };

            const response = await axios.post(
                'http://localhost:5000/api/menu/add',
                menuData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            toast.success('Menu added successfully!');
            navigate('/dashboard');
        } catch (err) {
            console.error('Submission error:', err);
            toast.error(err.response?.data?.message || 'Failed to add menu');
        } finally {
            setLoading(false);
        }
    };

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
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h1 className="text-3xl font-bold text-[#7f5539] mb-6 flex items-center">
                    <FaUtensils className="mr-2" />
                    Add New Menu
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Meal Type
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7f5539]"
                                required
                            >
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Date
                            </label>
                            <DatePicker
                                selected={formData.date}
                                onChange={handleDateChange}
                                minDate={new Date()}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7f5539]"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-[#7f5539]">Menu Items</h2>
                            <button
                                type="button"
                                onClick={addItem}
                                className="flex items-center bg-[#7f5539] text-white px-3 py-1 rounded-lg hover:bg-[#6a452e] transition"
                            >
                                <FaPlus className="mr-1" /> Add Item
                            </button>
                        </div>

                        {formData.items.map((item, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 relative">
                                <button
                                    type="button"
                                    onClick={() => removeItem(index)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                    title="Remove item"
                                >
                                    <FaMinus />
                                </button>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-1">
                                            Item Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={item.name}
                                            onChange={(e) => handleItemChange(index, e)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7f5539]"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-1">
                                            Quantity
                                        </label>
                                        <input
                                            type="text"
                                            name="quantity"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, e)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7f5539]"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-1">
                                            Sufficient For
                                        </label>
                                        <input
                                            type="text"
                                            name="sufficientFor"
                                            value={item.sufficientFor}
                                            onChange={(e) => handleItemChange(index, e)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7f5539]"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-1">
                                            Price (₹)
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={item.price}
                                            onChange={(e) => handleItemChange(index, e)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7f5539]"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 text-sm font-medium mb-1">
                                            Image
                                        </label>
                                        <div className="flex items-center">
                                            <input
                                                type="file"
                                                ref={el => fileInputRefs.current[index] = el}
                                                onChange={(e) => handleImageUpload(index, e)}
                                                accept="image/jpeg, image/jpg, image/png"
                                                className="hidden"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => fileInputRefs.current[index]?.click()}
                                                className="flex items-center bg-[#ede0d4] text-[#7f5539] px-3 py-2 rounded-lg hover:bg-[#e0d0c0] transition"
                                                disabled={uploading[index]}
                                            >
                                                <FaUpload className="mr-2" />
                                                {uploading[index] ? 'Uploading...' : item.image ? 'Change Image' : 'Upload Image'}
                                            </button>
                                            {item.image && (
                                                <span className="ml-3 text-sm text-gray-600 truncate">
                                                    {item.image.split('/').pop()}
                                                </span>
                                            )}
                                        </div>
                                        {item.image && (
                                            <div className="mt-2">
                                                <img
                                                    src={item.image}
                                                    alt="Preview"
                                                    className="h-20 object-cover rounded"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/100x100?text=Image+Error';
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="px-6 py-2 border border-[#7f5539] text-[#7f5539] rounded-lg hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !validateForm()}
                            className={`px-6 py-2 bg-[#7f5539] text-white rounded-lg hover:bg-[#6a452e] transition ${loading || !validateForm() ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Saving...' : 'Save Menu'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMenu;