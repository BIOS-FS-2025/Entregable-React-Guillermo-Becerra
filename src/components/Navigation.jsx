import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav className="bg-gray-900 shadow-md">
            <div className="pl-8 pr-12">
                <div className="flex justify-between h-20 items-center">

                    {/* Logo */}
                    <Link to="/">
                        <div className="flex-shrink-0">
                            <span className="text-xl tracking-wide font-bold text-yellow-400">KAIBAPEDIA</span>
                        </div>
                    </Link>

                    {/* Links */}
                    <ul className="flex space-x-6">
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
