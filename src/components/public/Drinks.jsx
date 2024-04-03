// import Cards from "../components/basics/Cards";
import { Link } from "react-router-dom";
import "./drinks.css";
import { Button, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useApi } from "contexts/ApiContext";
import { useTranslation } from "contexts/TranslationContext";
import { useConfig } from "contexts/ConfigContext";
import { useCart } from "contexts/CartContext";
import CounterInput from "react-bootstrap-counter";

export default function Drinks() {
//  const [drinks, setDrinks] = useState(null);
  const { get } = useApi();
  const { __ } = useTranslation();
  const { realm } = useConfig();
  const { getMenu, updateDrinkList } = useCart();

  const menu = getMenu();
  return menu === null ? (
    <div>{__("Please wait...")}</div>
  ) : (
    <div className="menu">
      <h2>Drinks</h2>
      <div className="accordion" id="accordionExample">
        {menu instanceof Object &&
          Object.keys(menu).map((category, i) => (
            <DrinkMainCategory key={i} category={menu[category]} />
          ))}
      </div>
    </div>
  );
}

function DrinkMainCategory(props) {
  /*
  state függő osztályok:
  button collapsed (kitörölni, ha kinyitott)
  accordion show (kitörölni, ha összecsukott)
  */
  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#collapseDrink" + props.category.id}
            aria-expanded="true"
            aria-controls={"collapseDrink" + props.category.id}
          >
            {props.category.name}
          </button>
        </h2>
        <div
          id={"collapseDrink" + props.category.id}
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            {props.category.drinks.map((drink, i) => (
              <DrinkCard key={i} drink={drink} />
            ))}

            {Object.keys(props.category.subcategory).map((subCategoryId, i) => (
              <DrinkSubCategory
                key={i}
                subCategory={props.category.subcategory[subCategoryId]}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function DrinkSubCategory(props) {
  return (
    <>
      <h4>{props.subCategory.name}</h4>
      {props.subCategory.drinks.map((drink, i) => (
        <DrinkCard key={i} drink={drink} />
      ))}
    </>
  );
}
// function Drink(props) {
//   return (
//     <>
//       <h5>{props.drink.name}</h5>
//       {Object.keys(props.drink.units).map((idx, i) => (
//         <DrinkUnit key={i} unit={props.drink.units[idx]} />
//       ))}
//     </>
//   );
// }

// function DrinkUnit(props) {
//   const { __ } = useTranslation();
//   return (
//     <div>
//       {props.unit.amount} {props.unit.unit ?? __("glass")} {props.unit.unit_price}
//     </div>
//   );
// }

function DrinkCard(props) {
  const { name, units } = props.drink;
  const [selectedUnit, setSelectedUnit] = useState(units[0]);
  const { __ } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
  };

  return (
    <Card style={{ width: "80%" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <div className="d-flex flex-wrap align-items-center">
          {units.map((unit, index) => (
            <React.Fragment key={index}>
              <Button
                variant={selectedUnit === unit ? "primary" : "light"}
                onClick={() => handleUnitSelect(unit)}
                className="m-1"
              >
                {unit.amount} {unit.unit ?? __("glass")} {unit.unit_price} Ft
              </Button>
              <CounterInput
                min={1}
                value={quantity}
                onChange={(value) => setQuantity(value)}
              />
              <Button
                variant="light"
                onClick={() => {
                  addToCart(props.drink.id, unit.amount, unit.unit, quantity);
                }}
                className="m-1"
              >
                {__("Add to Cart")}
              </Button>
            </React.Fragment>
          ))}
        </div>
        <Link to={`/drink/${props.drink.id}`}>
          <Button variant="light">{__("View")}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
