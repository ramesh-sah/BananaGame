import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const History = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/game/history');
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">{error}</div>;
    }

    return (
        <>
            <Sidebar />
            <section className='ml-[200px]'>
                <div className="max-w-4xl mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4 sticky top-0 bg-white z-10">Game History</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                            <thead className="bg-gray-200 sticky top-0">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Game ID</th>
                                    <th className="border border-gray-300 px-4 py-2">Question</th>
                                    <th className="border border-gray-300 px-4 py-2">Actual Solution</th>
                                    <th className="border border-gray-300 px-4 py-2">Your Solution</th>
                                    <th className="border border-gray-300 px-4 py-2">Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => {
                                    const resultStatus = item.user_solution === item.actual_solution ? 'Win' : 'Loss';
                                    return (
                                        <tr key={item.id} className="hover:bg-gray-100 transition duration-200">
                                            <td className="border border-gray-300 px-4 py-2 text-center">{item.id}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                <img src={item.question} alt="Question" className="w-32 h-auto mx-auto" />
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">{item.actual_solution}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">{item.user_solution || 'N/A'}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">{resultStatus}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default History;