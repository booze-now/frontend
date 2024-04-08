import { Table, Button } from "react-bootstrap";
import { useCart } from "contexts/CartContext";
import CounterInput from "react-bootstrap-counter";
import "./drinks.css";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
  const { detailedCartItems, removeFromCart, addToCart, calculateCartTotal } = useCart();
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
              <td>#{item.id} {item.name}</td>
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
      <p>
        Total Price: {calculateCartTotal()}
      </p>
      <Button
        variant="secondary"
        //onClick={() => order()}
      >
        Order for ___ Ft !
      </Button>
      <p>
        {" "}
        <Link to="/terms-of-use">{`Felhasználási feltételek`}</Link>et
        elolvastam
      </p>
    </div>
  );
}
