import React from "react";
import { Carousel, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/pictures/booze-champage.jpg"
            alt="Our finest champagne"
          />
          <Carousel.Caption>
            <h1>Our finest champagne!</h1>
            <p>20% off until March 31st</p>
            <Button variant="dark">Order this!</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/pictures/booze-beer.jpg"
            alt="The strongest beer in the city"
          />
          <Carousel.Caption>
            <h1>The strongest beer in the city</h1>
            <p>Be careful with this!</p>
            <Button variant="dark">I will taste it!</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/pictures/booze-wine.jpg"
            alt="WINE HOUR!"
          />
          <Carousel.Caption>
            <h1>WINE HOUR!</h1>
            <p>
              What's better than a glass of wine? Two glasses for the price of
              one.
            </p>
            <Button variant="dark">I want this!</Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default HomePage;
