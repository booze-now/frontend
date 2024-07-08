import { Table, Button } from "react-bootstrap";
import { useCart } from "contexts/CartContext"; 
import CounterInput from "react-bootstrap-counter";
import "./drinks.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "contexts/TranslationContext";
import "./cart.css";

export default function ShoppingCart() {
  const { __ } = useTranslation();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const {
    detailedCartItems,
    removeFromCart,
    addToCart,
    calculateCartTotal,
    handleOrder,
  } = useCart();

  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const filteredCartItems = detailedCartItems().filter(
    (item) => !isNaN(parseFloat(item.total))
  );
  

  const cartTotal = calculateCartTotal(filteredCartItems);


  return (
    <div>
      <h1 className="gold-text" style={{ margin: "50px" }}>
        {__("Cart")}
      </h1>
      <Table striped bordered hover className="table-header">
        <thead>
          <tr>
            <th className="table-header">#</th>
            <th className="table-header">{__("Name")}</th>
            <th className="table-header">{__("Price for one")}</th>
            <th className="table-header">{__("Unit")}</th>
            <th className="table-header">{__("Quantity")}</th>
            <th className="table-header">{__("Total price")}</th>
            <th className="table-header">{__("Remove from cart")}</th>
          </tr>
        </thead>
        <tbody>
          {detailedCartItems().map((item, index) => (
            <tr key={index}>
              <td className="table-cell">{index + 1}</td>
              <td className="table-cell">{item.name}</td>
              <td className="table-cell">{item.unitPrice} Ft</td>
              <td className="table-cell">
                {item.amount} {item.unit}
              </td>
              <td className="table-cell">
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
              <td className="table-cell">{item.total}</td>
              <td className="table-cell">
                <Button
                  variant="danger"
                  style={{
                    fontSize: "20px",
                    padding: "5px 5px",
                    width: "90px",
                    margin: "20px",
                  }}
                  onClick={() =>
                    removeFromCart(item.id, item.amount, item.unit)
                  }
                >
                  {__("Remove")}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <h3 className="h3-red">
          {__("Attention! You have to log in to place orders!")}
        </h3>
      </div>
      <p>
        <label style={{ margin: 20 }}>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={handleCheckboxChange}
          />{" "}
          {__("I have read the")}{" "}
          <Link to="/terms-of-use" className="link">
            {__("terms of use")}
          </Link>
        </label>
      </p>
      <Button
        variant="secondary"
        onClick={() => handleOrder()}
        disabled={!termsAccepted}
        className="button-secondary"
        style={{
          fontSize: "25px",
          padding: "15px 15px",
          margin: "20px",
          backgroundColor: "#d4af37",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {__("Order for ")}
        {cartTotal} Ft !
      </Button>
    </div>
  );
}
