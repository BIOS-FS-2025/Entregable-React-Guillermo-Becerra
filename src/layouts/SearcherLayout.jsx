import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import kclogo from "../img/kclogo.png";
import { useTheme } from "../context/ThemeContext";

function SearcherLayout() {

    const { darkMode } = useTheme();

    return (
        <div className={`${darkMode ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" : "bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"} min-h-screen flex flex-col relative overflow-hidden`}>

            <Navigation />
            <main className="flex-grow relative overflow-hidden">
                {/* Logo de fondo confinado al main */}
                <div className="absolute inset-0 flex justify-end items-center opacity-10 pointer-events-none">
                    <img
                        src={kclogo}
                        alt="KaibaCorp Background Logo"
                        className="w-[700px] h-auto"
                    />
                </div>

                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default SearcherLayout;

