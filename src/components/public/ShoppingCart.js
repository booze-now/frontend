import { Table, Button } from "react-bootstrap";
import { useCart } from "contexts/CartContext";
import CounterInput from "react-bootstrap-counter";
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
              <td>
                {item.name} <br /> id cause i cant reach name
              </td>
              <td>i cant reach</td>
              <td>
                {item.amount} {item.unit}
              </td>
              <td>
                <CounterInput
                min={1}
                  value={item.quantity}
                  onChange={(value) =>
                    addToCart(item.id, item.amount, item.unit, value)
                  }
                />
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
