import kclogo from "../../img/kclogo.png"
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

function Hero() {

    const { darkMode } = useTheme();

    return (
        <section className={`${darkMode ? "bg-gradient-to-t from-blue-950 via-gray-900 to-gray-950" : "bg-gradient-to-t from-blue-900 via-gray-800 to-gray-900"} text-white relative py-20 overflow-hidden`}>

            <div className="absolute inset-0 flex justify-end items-center opacity-10">
                <img
                    src={kclogo}
                    alt="KaibaCorp Background Logo"
                    className="w-[500px] h-auto"
                />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-blue-400 drop-shadow-lg">
                    Kaiba Corporation Encyclopedia
                </h1>

                <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
                    The ultimate KaibaCorp™ project.
                    The most complete, advanced, and official card database
                    for true duelists around the world.
                </p>

                <Link to={"card"}>
                    <div className="mt-8">
                        <a
                            href="#cards"
                            className={`${darkMode ? "bg-blue-700 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"} text-white px-6 py-3 rounded-2xl font-semibold shadow-md transition-all duration-300`}
                        >
                            Explore the Database
                        </a>
                    </div>
                </Link>
            </div>
        </section>
    );
}

export default Hero;
