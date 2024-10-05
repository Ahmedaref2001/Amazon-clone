import React from "react";
import ProductList from "../components/ProductList";
import banner1 from "../images/Discounts-banner-img/2407GH097_BTS_EG_L2_ATF_Generic_1500x247_AR.jpg";
import banner2 from "../images/Discounts-banner-img/2407GH098_BTS24_Merch__EG_DO_Partners_TCs_VISA_1500x150_AR.jpg";
import homeStyle from "../style/homeStyle.module.css";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useContextData } from "../store/useContextData";
import Loader from "../components/Loader";
import CarouselImg from "../components/CarouselImg";

const Home = () => {
  const { loading } = useContextData().state;
    


  return (
    <>
      {loading && <Loader />}
      <Header />

      <div className={homeStyle.img_box}>
        <CarouselImg/>
      </div>

      <div className={homeStyle.banner1_box}>
        <img src={banner2} alt="home-img" className="w-100" loading="lazy"/>
      </div>

      <div>
        <Categories />
        <div className={homeStyle.banner2_box}>
          <img src={banner1} alt="home-img" className="w-100" loading="lazy"/>
        </div>
        <ProductList />
        <Footer />
      </div>
    </>
  );
};

export default Home;
