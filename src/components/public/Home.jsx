import React from "react";
import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./home.css";
import { useTranslation } from "contexts/TranslationContext";
import Cards from "./basics/Cards";

const Home = () => {
  const { __ } = useTranslation();
  return (
   <div className="home">
     <h1 className="gold-text" style={{ margin: "20px" }}>{__("Welcome here!")}</h1> 
    <div className="home-carousel">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/pictures/booze-champage.jpg"
            alt={__("Our finest champagne")}
          />
          <Carousel.Caption>
            <h1>{__("Our finest champagne!")}</h1>
            <p>{__("20% off until July 15")}</p>
            <Link to="/drink/26">
              <Button variant="dark">{__("Order this!")}</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/pictures/booze-beer.jpg"
            alt={__("The strongest beer in the city")}
          />
          <Carousel.Caption>
            <h1>{__("The strongest beers in the city")}</h1>
            <p>{__("Be careful with this!")}</p>
            <Link to="/drink/15">
              <Button variant="dark">{__("I will taste it!")}</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/pictures/booze-wine.jpg"
            alt={__("WINE HOUR!")}
          />
          <Carousel.Caption>
            <h1>{__("WINE HOUR!")}</h1>
            <p>
              {__("What's better than a glass of wine? Two glasses for the price of one.")}
            </p>
            <Link to="/drink/22">
              <Button variant="dark">{__("I want this!")}</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
    <div className="home-cards">
    <h1 style={{ margin: "20px", paddingTop:"20px" }}>{__("Check out the other drinks!")}</h1>
    <Cards /></div>
   </div>
  );
};

export default Home;
