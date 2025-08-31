import { Link } from "react-router-dom";
import kclogo from "../img/kclogo.png";

function Navigation() {
    return (
        <nav className="bg-gray-900 shadow-md">
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

                    <ul className="text-xl flex space-x-6">
                        <li>
                            <Link
                                to="/"
                                className="text-gray-200 font-semibold hover:text-yellow-400 transition-colors duration-200"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/card"
                                className="text-gray-200 font-semibold hover:text-yellow-400 transition-colors duration-200"
                            >
                                Card Detail
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;
