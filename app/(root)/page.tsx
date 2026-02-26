import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";

const Home = () => {
  return (
    <main>
      <Hero imageUrl="/images/hero.png" />
      <Navbar />
      <Footer />
    </main>
  );
};

export default Home;
