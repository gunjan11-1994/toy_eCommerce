import Hero from "../components/Hero/Hero";
import CategorySection from "../components/Category/Category";
import Offer from "../components/Offer/Offer";
import SortByAge from "../components/SortByAge/SortByAge";
import SpecialOfferSection from "../components/SpecialOffer/SpecialOffer";
function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <Offer />
      <SortByAge />
      <SpecialOfferSection />
    </>
  );
}

export default Home;
