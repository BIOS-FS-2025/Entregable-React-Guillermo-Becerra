import { Link } from "react-router-dom";
import kclogo from "../img/kclogo.png";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Navigation() {

    const { darkMode, toggleTheme } = useTheme();

    return (
        <nav className={`${darkMode ? "bg-gray-950" : "bg-gray-900"} shadow-md`}>
            <div className="pl-8 pr-12">
                <div className="flex justify-between h-20 items-center">

                    <Link to="/">
                        <div className="flex items-center space-x-3">
                            <img
                                src={kclogo}
                                alt="Kaiba Corp Logo"
                                className="h-14 w-auto" // 👈 altura fija, ancho automático
                            />
                            <span className="text-xl font-bold tracking-wide text-blue-400">KAIBAPEDIA</span>
                        </div>
                    </Link>

                    <div className="flex items-center space-x-6">
                        <ul className="text-xl flex space-x-6">
                            <li>
                                <Link
                                    to="/"
                                    className="text-gray-200 font-semibold hover:text-blue-400 transition-colors duration-200"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/card"
                                    className="text-gray-200 font-semibold hover:text-blue-400 transition-colors duration-200"
                                >
                                    Card Detail
                                </Link>
                            </li>
                        </ul>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                        >
                            {darkMode ? (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-blue-400" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;
