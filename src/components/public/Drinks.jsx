// import Cards from "../components/basics/Cards";
import { Link } from "react-router-dom";
import "./drinks.css";
import { Button, Card, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useApi } from "contexts/ApiContext";
import { useTranslation } from "contexts/TranslationContext";
import { useConfig } from "contexts/ConfigContext";

export default function Drinks() {
  const [drinks, setDrinks] = useState(null);
  const { get } = useApi();
  const { __ } = useTranslation();
  const { realm } = useConfig();

  useEffect(() => {
    if (realm) {
      get("menu-tree")
        .then((response) => {
          const drinks = response.data;
          // console.log(drinks)
          setDrinks(drinks);
        })
        .catch((error) => {
          setDrinks(null);
          console.log(error.response.data);
          // error.response.status == 401
          console.warn(error);
          // addMessage("danger", error.response.data.error);
        });
    }
  }, [realm, get]);
  return drinks === null ? (
    <div>{__("Please wait...")}</div>
  ) : (
    <div className="menu">
      <h2>Drinks</h2>
      <div className="accordion" id="accordionExample">
        {drinks instanceof Object &&
          Object.keys(drinks).map((category, i) => (
            <DrinkMainCategory key={i} category={drinks[category]} />
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


function DrinkUnit(props) {
  return (
    <div>
      {props.unit.amount} {props.unit.unit ?? "pohár"} {props.unit.unit_price}
    </div>
  );
}

function DrinkCard(props) {
  const { name, units } = props.drink;
  const [selectedUnit, setSelectedUnit] = useState(units[0]);

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
  };

  const addToCart = () => {
    const cartItem = { ...props.drink, quantity: `${selectedUnit.amount} ${selectedUnit.unit}`, unit_price: selectedUnit.unit_price };
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    updatedCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`Added ${selectedUnit.amount} ${selectedUnit.unit} of ${name} to cart`);
  };
  
  

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <div className="d-flex flex-wrap">
          {units.map((unit, index) => (
            <Button
              key={index}
              variant={selectedUnit === unit ? "primary" : "light"}
              onClick={() => handleUnitSelect(unit)}
              className="m-1"
            >
              {unit.amount} {unit.unit ?? "pohár"} {unit.unit_price} Ft
            </Button>
          ))}
        </div>
        <Button variant="light" onClick={addToCart}>
          Add to Cart
        </Button>
        <Link to={`/drink/${props.drink.id}`}>
          <Button variant="light">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
