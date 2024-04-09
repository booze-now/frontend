import { Table, Button } from "react-bootstrap";
import { useCart } from "contexts/CartContext"; // Az elérési útvonalat javítottam
import CounterInput from "react-bootstrap-counter";
import "./drinks.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ShoppingCart() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const {
    detailedCartItems,
    removeFromCart,
    addToCart,
    calculateCartTotal,
    handleOrder    
  } = useCart();

  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price for one</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Total price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {detailedCartItems().map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                #{item.id} {item.name}
              </td>
              <td>{item.unitPrice} Ft</td>
              <td>
                {item.amount} {item.unit}
              </td>
              <td>
                <div className="counter-input-wrapper">
                  <CounterInput
                    max={99}
                    value={item.quantity}
                    onChange={(value) =>
                      addToCart(item.id, item.amount, item.unit, value, "set")
                    }
                  />
                </div>
              </td>
              <td>{item.total}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() =>
                    removeFromCart(item.id, item.amount, item.unit)
                  }
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <h3 style={{ color: "red" }}>
          Attention! You have to log in to place orders!
        </h3>
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={handleCheckboxChange}
          />{" "}
          I have read the <Link to="/terms-of-use">Terms of Use</Link>
        </label>
      </p>
      <Button
        variant="secondary"
        onClick={() => handleOrder()}
        disabled={!termsAccepted}
      >
        Order for {calculateCartTotal()} Ft !
      </Button>
    </div>
  );
}
