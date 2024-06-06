import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { useTranslation } from "contexts/TranslationContext";
import { useCart } from "contexts/CartContext";
import "./drinks.css";

export default function Drinks() {
  const { __ } = useTranslation();
  const { getMenu } = useCart();
  const menu = getMenu();

  return menu === null ? (
    <div>{__("Please wait...")}</div>
  ) : (
    <div className="menu">
      <h2 style={{ margin: "50px" }}>{__("All Drinks")}</h2>
      <div className="accordion" id="accordionDrinks">
        {menu instanceof Object &&
          Object.keys(menu).map((category, i) => (
            <DrinkMainCategory key={i} category={menu[category]} />
          ))}
      </div>
    </div>
  );
}

function DrinkMainCategory(props) {
  const { drinks, subcategory } = props.category;

  // Minden italt egy listába gyűjtünk
  const allDrinks = [
    ...drinks,
    ...Object.values(subcategory).flatMap((subCat) => subCat.drinks),
  ];

  return (
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
        data-bs-parent="#accordionDrinks"
      >
        <div className="accordion-body">
          {allDrinks.map((drink, i) => (
            <DrinkCard key={i} drink={drink} />
          ))}
          {/* {Object.keys(props.category.subcategory).map((subCategoryId, i) => (
              <DrinkSubCategory
                key={i}
                subCategory={props.category.subcategory[subCategoryId]}
              />
            ))}  */}
        </div>
      </div>
    </div>
  );
}

// function DrinkSubCategory(props) {
//   return (
//     <>
//       <h4>{props.subCategory.name}</h4>
//       {props.subCategory.drinks.map((drink, i) => (
//         <DrinkCard key={i} drink={drink} />
//       ))}
//     </>
//   );
// }

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
  const { addToCart } = useCart();

  const handleAddToCart = (unit) => {
    addToCart(props.drink.id, unit.amount, unit.unit, 1, "add"); // Mindig csak 1 ital kerül a kosárba
  };

  return (
    <>
      {units.map((unit, index) => (
        <Card className="card-custom" key={index}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <div>
              {unit.amount} {unit.unit ?? "glass"} {unit.unit_price} Ft
            </div>
            <Card.Img src={props.drink.image_url} />
            <Button
              variant="light"
              onClick={() => handleAddToCart(unit)}
              className="m-1"
            >
              Add to Cart
            </Button>
            <Link to={`/drink/${props.drink.id}`}>
              <Button variant="light">View</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
