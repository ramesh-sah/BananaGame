import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const navigation = [
        { href: '/game/overview', name: 'Overview', icon: <img src="https://i.pinimg.com/736x/c8/b7/7e/c8b77e294bf2c9479a74c9650b6f19b5.jpg" alt="Overview Icon" /> },
        { href: '/game/playgame', name: 'Play Game', icon: <img src="https://cdn-icons-png.flaticon.com/128/16758/16758351.png" alt="Play Game Icon" /> },
        { href: '/game/history', name: 'History', icon: <img src="https://cdn-icons-png.flaticon.com/128/11411/11411453.png" alt="History Icon" /> },
        { href: '/game/settings', name: 'Settings', icon: <img src="https://cdn-icons-png.flaticon.com/128/2698/2698011.png" alt="Settings Icon" /> },
        { href: '/help', name: 'Help', icon: <img src="https://cdn-icons-png.flaticon.com/128/11606/11606782.png" alt="Help Icon" /> },
        { href: '/login', name: 'Logout', icon: <img src="https://cdn-icons-png.flaticon.com/128/16787/16787160.png" alt="Logout Icon" /> }
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full h-full border-r bg-white space-y-8 sm:w-80">
                <div className="flex flex-col h-full">
                    <div className='m-5 h-20 flex items-center px-8'>
                        <Link to="/" className='flex-none'>
                            <img src="https://cdn-icons-png.flaticon.com/128/13543/13543257.png" width={140} className="mx-auto" alt="Logo" />
                        </Link>
                    </div>
                    <div className="flex-1 flex flex-col h-full overflow-auto">
                        <ul className="px-4 text-sm font-medium flex-1">
                            {navigation.map((item, idx) => (
                                <li key={idx}>
                                    <Link to={item.href} className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 duration-150">
                                        <div className="text-gray-500 w-10 h-10">{item.icon}</div>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* User Profile Section */}
                <div className="py-4 px-4 border-t">
                    <div className="flex items-center gap-x-4">
                        <img src="https://randomuser.me/api/portraits/women/79.jpg" className="w-12 h-12 rounded-full" alt="User Avatar" />
                        <div>
                            <span className="block text-gray-700 text-sm font-semibold">Alivika Tony</span>
                            <Link to="/profile" className="block mt-px text-gray-600 hover:text-indigo-600 text-xs">
                                View profile
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;