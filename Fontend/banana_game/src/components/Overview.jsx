import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Overview = () => {
  const features = [
    { name: "Trusted", icon: <img src="https://cdn-icons-png.flaticon.com/128/3967/3967544.png" alt="Trusted Feature" /> },
    { name: "See Videos", icon: <img src="https://cdn-icons-png.flaticon.com/128/18288/18288196.png" alt="Videos Feature" /> },
    { name: "400 ratings", icon: <img src="https://cdn-icons-png.flaticon.com/128/9732/9732828.png" alt="Ratings Feature" /> }
  ];

  const [isVideoPoppedUp, setVideoPopUp] = useState(false);

  return (
    <>
      <Sidebar />

      {/* Main Section for Banana Game Introduction */}
      <section className="ml-[320px]  p-4 md:p-8">
        <div className="max-w-screen-xl mx-auto py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-2xl text-center md:text-left space-y-5">
            <h1 className="text-4xl text-gray-800 font-extrabold md:text-5xl">Welcome to the Banana Game!</h1>
            <p className="text-gray-600">
              The Banana Game is an exciting and interactive game where players must guess answers based on provided questions.
              You can enter your guesses using digits up to 9. The objective is to score points by answering correctly!
            </p>
            <p className="text-gray-600">
              This project is part of a CIS assignment prepared by Ramesh Kumar Sah. It includes all necessary functionalities and an API for seamless interaction.
            </p>

            {/* Features List */}
            <h2 className="text-2xl text-gray-700 font-bold ">Game Features:</h2>
            <div className="flex flex-wrap justify-center gap-6 md:justify-start">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-center h-20 w-20 gap-x-2 text-gray-500 text-sm">
                  {item.icon}
                </div>
              ))}
            </div>

            {/* Call-to-Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-20">
              <a href="#" className="flex items-center justify-center gap-x-2 py-2 px-4 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg transition duration-150">
                Start Playing

              </a>
              <a href="#" className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium border rounded-lg transition duration-150">
                Learn More

              </a>
            </div>
          </div>

          {/* Right-aligned image section */}
          <div className="mt-14 md:mt-0 md:flex-none max-w-xl mx-auto">
            <div className="relative h-auto">
              <img
                src="https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
                className="rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 w-full"
                alt="Banana Game"
              />
              <button
                className="absolute w-16 h-16 rounded-full inset-0 m-auto bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 text-white"
                onClick={() => setVideoPopUp(true)}
              >
                <img src='https://via.placeholder.com/20' alt='Play Video' />
              </button>
            </div>
          </div>
        </div>

        {/* Video Popup */}
        {isVideoPoppedUp && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={() => setVideoPopUp(false)}></div>
            <div className="relative z-10 p-4">
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white"
                onClick={() => setVideoPopUp(false)}
              >
                <img src='https://via.placeholder.com/20' alt='Close' />
              </button>
              <video className="rounded-lg w-full max-w-xl mx-auto" controls autoPlay>
                <source src='https://raw.githubusercontent.com/sidiDev/remote-assets/main/FloatUI.mp4' type='video/mp4' />
              </video>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Overview;