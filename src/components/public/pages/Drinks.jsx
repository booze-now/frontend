// import Cards from "../components/basics/Cards";
import { Link } from "react-router-dom";
import "./drinks.css";
import drinks from "./menu.json";
import { Button, Card } from "react-bootstrap";

export default function DrinksPage() {
  console.log(drinks);
  return (
    <div className="menu">
      <h2>Drinks</h2>
      <div  className="accordion" id="accordionExample">
        {Object.keys(drinks).map((category, i) => (
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
  console.log(props);
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

function Drink(props) {
  console.log(props.drink);
  return (
    <>
      <h5>{props.drink.name}</h5>
      {Object.keys(props.drink.units).map((idx, i) => (
        <DrinkUnit key={i} unit={props.drink.units[idx]} />
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
  const { name, description, units } = props.drink;
  const price = units[0].unit_price;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Price: ${price}</Card.Text>
        <Link
          to={{
            pathname: `/drink/${props.drink.id}`,
            state: { drinks: props.drinks },
          }}
        >
          <Button variant="light">View</Button>
        </Link>
        <Button variant="light">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}
