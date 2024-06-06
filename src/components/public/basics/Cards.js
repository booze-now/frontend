import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "contexts/CartContext";
import { useTranslation } from "contexts/TranslationContext";
import "./cards.css";

export default function Cards() {
  const { __ } = useTranslation();
  const { getMenu } = useCart();
  const menu = getMenu();

  return (
    menu === null ? (
      <div>{__("Please wait...")}</div>
    ) : (
      <div>
        {menu instanceof Object &&
          Object.keys(menu).map((category, i) => (
            <DrinkMainCategory key={i} category={menu[category]} />
          ))}
      </div>
    )
  );
}

function DrinkMainCategory(props) {
  const { drinks, subcategory } = props.category;

  const allDrinks = [
    ...drinks,
    ...Object.values(subcategory).flatMap((subCat) => subCat.drinks),
  ];

  return (
    <>
      {allDrinks.map((drink, i) => (
        <DrinkCard key={i} drink={drink} />
      ))}
    </>
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
      <Card className="card-custom">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Img src={props.drink.image_url} />
          <div>
            {units.map((unit, index) => (
              <div key={index} className="radio">
                <input
                  type="radio"
                  name={name}
                  value={unit}
                  checked={selectedUnit === unit}
                  onChange={() => setSelectedUnit(unit)}
                  style={{ color: 'gray' }} 
                />
                {unit.amount} {unit.unit ?? "glass"} {unit.unit_price} Ft
              </div>
            ))}
          </div>
          <Button
            variant="light"
            onClick={handleAddToCart}
            className="m-1"
            style={{ fontSize: '1.2em' }} // nagyobb gomb
          >
            Add to Cart
          </Button>
          <Link to={`/drink/${props.drink.id}`}>
            <Button variant="light"  style={{ fontSize: '1.2em' }}>View</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}