import React, { useState } from 'react';

const AddHotelForm: React.FC = () => {
    const [hotelName, setHotelName] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // For now, just log the data
        setTimeout(() => {
            console.log({ hotelName, location, details, photo });
            setSubmitting(false);
            alert('Hotel posted! (API integration pending)');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg space-y-6">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">Add a New Hotel</h2>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Hotel Photo</label>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                    {preview && <img src={preview} alt="Preview" className="mt-4 rounded-xl w-full h-48 object-cover border" />}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Hotel Name</label>
                    <input type="text" value={hotelName} onChange={e => setHotelName(e.target.value)} required className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Enter hotel name" />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Location</label>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} required className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Enter location" />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Details</label>
                    <textarea value={details} onChange={e => setDetails(e.target.value)} required className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Describe the hotel, amenities, etc." rows={4} />
                </div>
                <button type="submit" disabled={submitting} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50">
                    {submitting ? 'Posting...' : 'Post Hotel'}
                </button>
            </form>
        </div>
    );
};

export default AddHotelForm; 