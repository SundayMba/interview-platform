import Feature from "../components/Feature";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div className="bg-linear-to-br from-base-100 via-base-200 to-base-300">
      <Navbar />
      <main className="max-w-310 mx-auto">
        <HeroSection />
        <Feature />
      </main>
    </div>
  )
}

export default HomePage;