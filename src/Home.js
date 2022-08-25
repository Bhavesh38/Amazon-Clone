import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="amazon-body.jpg"
        />
        <div className="home_row">
          <Product
            id={12020002002100}
            title="The Communist Manifesto Paperback – 20 December 2017"
            image="https://m.media-amazon.com/images/I/71Vv+j8FHLS._AC_UY327_FMwebp_QL65_.jpg"
            price={70.99}
            rating={5}
          />

          <Product
            id={12020002002101}
            title="DesiDiya® Hanging Tulip Cone Disc Ceiling Light Lamp Home Decor Items"
            image="https://m.media-amazon.com/images/I/31ANr9o+LoL.jpg"
            price={1399.99}
            rating={5}
          />
        </div>
        <div className="home_row">
          <Product
            id={12020002002102}
            image="https://images-eu.ssl-images-amazon.com/images/I/51UPd5b7Q1L._AC_SR400,600_.jpg"
            title="Amazon Brand - Solimo 3-Door Foldable Wardrobe, 10 Racks, Black"
            price={2445.98}
            rating={4}
          />
          <Product
            id={12020002002103}
            title="boAt Bassheads 100 in Ear Wired Earphones with Mic(Furious Red)"
            image="https://m.media-amazon.com/images/I/61l+14s5QVL._SX679_.jpg"
            price={698.99}
            rating={5}
          />
          <Product
            id={12020002002104}
            title="Pigeon Amaze Plus Electric Kettle"
            image="https://m.media-amazon.com/images/I/31na34LxwmL._AC_SY400_.jpg"
            price={856.99}
            rating={4}
          />
        </div>
        <div className="home_row">
          <Product
            title="Samsung LC49HG90DMUXEN 48.9-inch Ultra Wide Curved Monitor (Black)"
            image="https://m.media-amazon.com/images/I/71MlcO29QOL._SX679_.jpg"
            rating={4}
            price={145000.99}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
