import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.unit_price} Ft</td>
              <td>{item.quantity}</td> 
              <td>{item.unit_price * item.amount}</td>
              <td>
                <Button variant="danger" onClick={() => removeFromCart(index)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>
        Total Price
        {cartItems.reduce(
          (total, item) => total + item.unit_price * item.quantity,
          0
        )}
      </p>
    </div>
  );
}
