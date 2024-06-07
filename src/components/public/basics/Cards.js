import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "contexts/CartContext";
import { useTranslation } from "contexts/TranslationContext";
import "./cards.css";

export default function Cards() {
  const { __ } = useTranslation();
  const { getMenu } = useCart();
  const menu = getMenu();
  const [loadedDrinks, setLoadedDrinks] = useState([]);
  const [drinkOffset, setDrinkOffset] = useState(0);

  useEffect(() => {
    const allDrinks =
      menu instanceof Object
        ? Object.keys(menu).flatMap((category) => {
            const { drinks, subcategory } = menu[category];
            return [
              ...drinks,
              ...Object.values(subcategory).flatMap((subCat) => subCat.drinks),
            ];
          })
        : [];
    const initialDrinks = allDrinks.slice(0, 4);
    setLoadedDrinks(initialDrinks);
    setDrinkOffset(4); // Set initial offset after loading first 4 drinks
  }, [menu]);

  const handleLoadMore = () => {
    const allDrinks =
      menu instanceof Object
        ? Object.keys(menu).flatMap((category) => {
            const { drinks, subcategory } = menu[category];
            return [
              ...drinks,
              ...Object.values(subcategory).flatMap((subCat) => subCat.drinks),
            ];
          })
        : [];
    const nextDrinks = allDrinks.slice(drinkOffset, drinkOffset + 4);
    if (nextDrinks.length > 0) {
      setLoadedDrinks([...loadedDrinks, ...nextDrinks]);
      setDrinkOffset(drinkOffset + 4);
    }
  };

  return menu === null ? (
    <div>{__("Please wait...")}</div>
  ) : (
    <div>
      {loadedDrinks.map((drink, i) => (
        <DrinkCard key={i} drink={drink} />
      ))}
      <div style={{ textAlign: "center" }}>
        <Button
          variant="light"
          onClick={handleLoadMore}
          style={{
            fontSize: "30px",
            padding: "15px 15px",
            margin: "20px",
            backgroundColor: "#d4af37",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Load More
        </Button>
        <Link to="/drinks">
          <Button
            variant="light"
            style={{
              fontSize: "30px",
              padding: "15px 15px",
              margin: "20px",
              backgroundColor: "#d4af37",
              border: "none",
              borderRadius: "5px",
            }}
          >
            View All Drinks
          </Button>
        </Link>
      </div>
    </div>
  );
}

function DrinkCard(props) {
  const { name, units } = props.drink;
  const { addToCart } = useCart();

  const [selectedUnit, setSelectedUnit] = React.useState(units[0]);

  const handleAddToCart = () => {
    addToCart(props.drink.id, selectedUnit.amount, selectedUnit.unit, 1, "add");
  };

  return (
    <div className="cards">
      <Card
        className="card-custom"
        style={{
          animation: "goldChase 3s infinite",
        }}
      >
        <Card.Body>
          <Card.Title style={{ fontWeight: "bold", fontSize: "30px" }}>
            {name}
          </Card.Title>
          <Card.Img src={props.drink.image_url} />
          <div className="radio-container">
            {units.map((unit, index) => (
              <div key={index} className="radio-wrapper">
                <label className="radio-label" style={{ fontSize: "17px" }}>
                  <input
                    type="radio"
                    name={name}
                    value={unit}
                    checked={selectedUnit === unit}
                    onChange={() => setSelectedUnit(unit)}
                    className="custom-radio"
                  />
                  {unit.amount} {unit.unit ?? "glass"} {unit.unit_price} Ft
                </label>
              </div>
            ))}
          </div>
          <Button
            variant="light"
            onClick={handleAddToCart}
            className="m-1"
            style={{ fontSize: "20px", fontWeight: "bold" }}
          >
            Add to Cart
          </Button>
          <Link to={`/drink/${props.drink.id}`}>
            <Button
              variant="light"
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              View
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}
