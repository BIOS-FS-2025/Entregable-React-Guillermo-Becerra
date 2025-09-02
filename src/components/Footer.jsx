import kcLogo from "../img/kclogo.png";
import { useTheme } from "../context/ThemeContext";

function Footer() {

    const { darkMode } = useTheme();

    return (
        <footer className={`${darkMode ? "bg-gray-950 text-gray-500" : "bg-gray-900 text-gray-400"} mt-10`}>
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">

                    {/* Logo + Nombre */}
                    <div className="flex items-center space-x-3">
                        <img
                            src={kcLogo}
                            alt="KaibaCorp Logo"
                            className="h-8 w-auto"
                        />
                        <span className="text-lg font-semibold text-blue-400">
                            Kaiba Corporation Systems
                        </span>
                    </div>

                    {/* Texto creativo */}
                    <p className="text-sm text-center sm:text-right">
                        © {new Date().getFullYear()} KaibaCorp™.
                        All rights reserved.
                        <span className="block italic text-gray-500">
                            “For true duelists.”
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
