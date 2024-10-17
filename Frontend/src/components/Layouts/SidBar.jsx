import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false); 
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/login');
    };
    return (
        <div >
            <button
                className="p-2 m-1 text-black md:hidden"
                onClick={toggleSidebar}
            >
                <span className="material-icons">menu</span>
            </button>

            <div className={`fixed inset-0 z-20 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static w-64 h-full text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg`}>
                <div className="flex items-center justify-center h-16 border-b border-gray-700">
                    <h1 className="text-xl font-bold">Cinema App</h1>
                </div>
                <nav className="flex-1 px-4 py-6">
                    <ul>
                        <li>
                            <Link
                                to="/"
                                className="flex items-center p-2 mb-2 text-gray-300 transition-colors duration-200 rounded-lg hover:bg-gray-700 hover:text-white"
                            >
                                <span className="material-icons">home</span>
                                <span className="ml-3">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Add_Movies"
                                className="flex items-center p-2 mb-2 text-gray-300 transition-colors duration-200 rounded-lg hover:bg-gray-700 hover:text-white"
                            >
                               <span className=" material-icons">add</span>
                                <span className="ml-3">Movies</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Add_Seance"
                                className="flex items-center p-2 mb-2 text-gray-300 transition-colors duration-200 rounded-lg hover:bg-gray-700 hover:text-white"
                            >
                               <span className=" material-icons">add</span>
                                <span className="ml-3">Seance</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/add_salle"
                                className="flex items-center p-2 mb-2 text-gray-300 transition-colors duration-200 rounded-lg hover:bg-gray-700 hover:text-white"
                            >
                               <span className=" material-icons">add</span>
                                <span className="ml-3">Salle</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/List_seances"
                                className="flex items-center p-2 mb-2 text-gray-300 transition-colors duration-200 rounded-lg hover:bg-gray-700 hover:text-white"
                            >
                               <span className=" material-icons">list</span>
                                <span className="ml-3">list des seances</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/List_Movies"
                                className="flex items-center p-2 mb-2 text-gray-300 transition-colors duration-200 rounded-lg hover:bg-gray-700 hover:text-white"
                            >
                                <span className="material-icons">list</span>
                                <span className="ml-3">Movies</span>
                            </Link>
                        </li>
                        
                        <li>
                            <Link
                                to="/profile"
                                className="flex items-center p-2 mb-2 text-gray-300 transition-colors duration-200 rounded-lg hover:bg-gray-700 hover:text-white"
                            >
                                <span className="material-icons">account_circle</span>
                                <span className="ml-3">Profile</span>
                            </Link>
                        </li>
                        
                    </ul>
                </nav>
                <div className="flex items-center justify-center h-16 border-t border-gray-700">
                    <button onClick={handleLogout} className="px-4 py-2 font-bold text-white transition-colors duration-200 bg-red-600 rounded hover:bg-red-500">
                    <i className="material-icons">logout</i>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-10 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>
            )}
        </div>
    );
}
