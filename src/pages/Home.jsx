import Hero from "../components/Hero";
import CardTable from "../components/CardTable";
import Instructions from "../components/Instructions";

function Home() {
    return (
        <>
            <Hero />
            <Instructions />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <CardTable />
            </div>
        </>
    )
}

export default Home;