import Hero from "../components/Hero";
import CardTable from "../components/CardTable";

function Home() {
    return (
        <>
            <Hero />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <CardTable />
            </div>
        </>
    )
}

export default Home;