import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaList, FaUserCircle, FaSignOutAlt, FaBars  } from 'react-icons/fa';
import LogoSvg from '../logo/LogoSvg'
import {jwtDecode} from "jwt-decode";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const token = Cookies.get('token');
    const user = jwtDecode(token)
const userId= user.id;
    console.log(user)
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/login');
    };
    return (



        <div className=''>
            <button
                className="p-2 m-1 text-teal-300 md:hidden"
                onClick={toggleSidebar}
            >
                <FaBars className="text-xl" />
            </button>
        
            <div className={`fixed inset-0 z-20 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static w-64 h-full text-white bg-teal-600 shadow-lg`}>
                            <div className="flex items-center justify-center     border-b border-gray-300 text-bold  shadow-sm">
            <LogoSvg />
            </div>

                <nav className="flex-1 px-4 py-6">
                    <ul>
                        {[
                            { to: "/", label: "Home", icon: <FaHome className="text-lg" /> },
                            { to: "/Add_Movies", label: "Movies", icon: <FaPlus className="text-lg" /> },
                            { to: "/Add_Seance", label: "Seance", icon: <FaPlus className="text-lg" /> },
                            { to: "/add_salle", label: "Salle", icon: <FaPlus className="text-lg" /> },
                            { to: "/List_seances", label: "List des Seances", icon: <FaList className="text-lg" /> },
                            { to: "/List_Movies", label: "Movies", icon: <FaList className="text-lg" /> },
                            { to: "/listSalle", label: "Salles", icon: <FaList className="text-lg" /> },
                            { to: `/me/${userId}`, label: "Profile", icon: <FaUserCircle className="text-lg" /> }
                        ].map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.to}
                                    className="flex items-center p-2 mb-2 text-gray-300 transition-colors duration-200 rounded-lg hover:bg-teal hover:text-teal-900"
                                >
                                    {item.icon}
                                    <span className="ml-3">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex items-center justify-center h-16 border-t border-gray-700">
                    <button onClick={handleLogout} className="flex items-center px-4 py-2 font-bold text-white transition-colors duration-200 bg-teal-600 rounded hover:bg-gray-900">
                        <FaSignOutAlt />
                        
                    </button>
                </div>
            </div>
        
            {isOpen && (
                <div className="fixed inset-0 z-10 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>
            )}
        </div>
        


    );
}
