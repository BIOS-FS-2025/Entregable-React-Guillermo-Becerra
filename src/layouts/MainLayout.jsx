import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

function MainLayout() {

    const { darkMode } = useTheme();

    return (
        <div className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} min-h-screen flex flex-col`}>
            <Navigation />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;
