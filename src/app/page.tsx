import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import OffersPage from "./components/Offers";
import Gallery from "./components/Gallery";

export default function Home() {
  return (
    <>
      <Navbar />;
      <Hero />
      <OffersPage />
      <Gallery />
      <Footer />
    </>
  );
}
