import { Table, Button } from "react-bootstrap";
import { useCart } from "contexts/CartContext";
import CounterInput from "react-bootstrap-counter";
import './drinks.css'

export default function ShoppingCart() {
  const { detailedCartItems, removeFromCart, addToCart } = useCart();
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
              <td>{item.name}</td>
              <td>{item.unitPrice} </td>
              <td>
                {item.amount} {item.unit}
              </td>
              <td>
                <div className="counter-input-wrapper">
                  <CounterInput
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(value) =>
                      addToCart(item.id, item.amount, item.unit, value)
                    }
                  />
                </div>
              </td>
              <td>i cant count</td>
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
        Total Price:{" "}
        {detailedCartItems().reduce(
          (total, item) => total + item.unit_price * item.quantity,
          0
        )}
      </p>
    </div>
  );
}
