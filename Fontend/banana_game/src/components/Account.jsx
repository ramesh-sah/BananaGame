import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

function Account({ userId }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/game/120/`, {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            });
            setSuccess('Profile updated successfully!');
            console.log('Profile updated:', response.data);
        } catch (err) {
            setError('Error updating profile. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Sidebar />
            <section className='ml-[200px]'>
                <main className="relative bg-white"> {/* Changed bg-gray-900 to bg-white */}
                    <div className="relative z-10 max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8">
                        <div className="max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0">
                            <h3 className="text-cyan-400 font-semibold">Profile Update</h3>
                            <p className="text-gray-900 text-3xl font-semibold sm:text-4xl">Update your information</p>
                            <p className="text-gray-600">Please fill out the form below to update your profile.</p>
                        </div>
                        <div className="mt-12 mx-auto px-4 p-8 bg-white sm:max-w-lg sm:px-8 sm:rounded-xl">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="font-medium">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="font-medium">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="font-medium">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="font-medium">Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150"
                                    disabled={loading}
                                >
                                    {loading ? 'Updating...' : 'Update Profile'}
                                </button>
                            </form>
                            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                            {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
                        </div>
                    </div>
                    <div className='absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]'></div>
                </main>
            </section>
        </>
    );
}

export default Account;