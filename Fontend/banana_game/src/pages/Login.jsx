import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLogin = async (event) => {
        event.preventDefault();
        setSuccessMessage(''); // Reset success message on new login attempt

        try {
            const response = await fetch('http://127.0.0.1:8000/api/account/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Handle successful login, e.g., save token to localStorage
                console.log('Login successful:', data);

                // Show success message
                setSuccessMessage('Login successful! Redirecting to dashboard...');

                // Redirect to the dashboard after a delay
                setTimeout(() => {
                    navigate('/game'); // Change '/dashboard' to your actual dashboard route
                }, 2000); // 2 seconds delay
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
            }
        } catch (err) {
            console.error('Error logging in:', err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-8 bg-card dark:bg-card-foreground rounded-lg shadow-lg border border-primary">
                <h2 className="text-3xl font-bold text-primary text-center mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-sm font-medium text-primary">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 mt-1 text-primary bg-input dark:bg-input dark:text-primary border border-border rounded-md focus:outline-none focus:ring focus:ring-ring transition duration-200 ease-in-out hover:bg-accent hover:border-accent-foreground"
                            required
                        />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="password" className="block text-sm font-medium text-primary">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 mt-1 text-primary bg-input dark:bg-input dark:text-primary border border-border rounded-md focus:outline-none focus:ring focus:ring-ring transition duration-200 ease-in-out hover:bg-accent hover:border-accent-foreground"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>} {/* Display success message */}
                    <button type="submit" className="w-full bg-blue-500 text-primary-foreground p-3 rounded-md shadow-md hover:bg-primary/80 focus:outline-none focus:ring focus:ring-ring transition duration-200 ease-in-out transform hover:scale-105">Login</button>
                </form>
                <p className="text-sm text-center mt-5 text-muted-foreground">Developed by Ramesh Sah</p>
                <Link to="/register" className="block text-center text-secondary mt-5 hover:underline">Register</Link>
            </div>
        </div>
    );
}