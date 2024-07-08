import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { useTranslation } from "contexts/TranslationContext";
import { useCart } from "contexts/CartContext";
import "./cards.css";
import React from "react";
export default function DrinkCard(props) {
    const { name, units } = props.drink;
    const { addToCart } = useCart();
    const { __ } = useTranslation();
  
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
              {__("Add to Cart")}
            </Button>
            <Link to={`/drink/${props.drink.id}`}>
              <Button
                variant="light"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                {__("View")}
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
  