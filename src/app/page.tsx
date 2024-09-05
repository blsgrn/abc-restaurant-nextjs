import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import OffersPage from "./components/Offers";

export default function Home() {
  return (
    <>
      <Navbar />;
      <Hero />
      <OffersPage />
      <Footer />
    </>
  );
}
