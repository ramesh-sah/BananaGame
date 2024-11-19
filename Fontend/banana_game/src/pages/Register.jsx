import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate(); // Hook for navigation
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/account/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed. Please check your input.');
            } else {
                const data = await response.json();
                setSuccess('Registration successful! You can now log in.');
                console.log('Registration successful:', data);

                // Show success message for a short time before redirecting
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page after success
                }, 2000); // Redirect after 2 seconds
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="first_name" className="block text-sm font-medium">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring transition"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="last_name" className="block text-sm font-medium">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring transition"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring transition"
                            required
                        />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring transition"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring transition transform hover:scale-105"
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-center mt-5">Developed by Ramesh Sah</p>
                <a href="/login" className="block text-center text-blue-500 mt-5 hover:underline">
                    Login
                </a>
            </div>
        </div>
    );
}