import kclogo from "../img/kclogo.png"

function Hero() {
    return (
        <section className="relative bg-gradient-to-t from-blue-900 via-gray-800 to-gray-900 text-white py-20 overflow-hidden">

            <div className="absolute inset-0 flex justify-end items-center opacity-10">
                <img
                    src={kclogo}
                    alt="KaibaCorp Background Logo"
                    className="w-[500px] h-auto"
                />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 text-center">
                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-extrabold text-blue-400 drop-shadow-lg">
                    Kaiba Corporation Encyclopedia
                </h1>

                {/* Description */}
                <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
                    The ultimate KaibaCorp project.
                    The most complete, advanced, and official card database
                    for true duelists around the world.
                </p>

                {/* Call to action */}
                <div className="mt-8">
                    <a
                        href="#cards"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-md transition-all duration-300"
                    >
                        Explore the Database
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Hero;
