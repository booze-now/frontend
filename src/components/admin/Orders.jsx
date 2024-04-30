import React, { useState, useEffect } from "react";
import { useApi } from "contexts/ApiContext";
import { Card, Button, Spinner, Collapse, Table } from "react-bootstrap";
import { useTranslation } from "contexts/TranslationContext";

const Orders = () => {
  const { __ } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { get, put } = useApi(); // Felhasználjuk az API hookot
  const [openStates, setOpenStates] = useState({}); // Állapotok objektuma
  const al = 0; // Placeholder for 'al'
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await get("/orders-with-guests");
        setOrders(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [get]);

  const handleServeOrder = async (orderId, guest_id) => {
    try {
      const response = await put(`/order-update/${orderId}`, {
        status: "served",
        guest_id: guest_id,
      }); // Valós API hívás
      console.log("Order status updated:", response);
      // Frissítsük a megfelelő order állapotát a UI-ban
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: "served" } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const toggleCollapse = (orderId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId], // Az adott orderId-hez tartozó állapot megfordítása
    }));
  };

  // Filter and map order details based on the condition
  const filteredOrderDetails = (order) =>
    order.order_details
      .filter((detail) => {
        const unitPrice = parseFloat(detail.unit[0].unit_price); 
        return unitPrice === parseFloat(detail.unit_price) - al; // Replace al with the actual value or calculation
      })
      .map((detail) => ({
        drinkName: detail.drink_name,
        unitPrice: parseFloat(detail.unit_price),
        amount: detail.amount,
        unit: detail.unit[0].amount,
        unit_code: detail.unit[0].unit_code,
      }));

  return (
    <div className="container-fluid">
      <h1 className="mt-4 mb-4">{__("Orders")}</h1>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {orders.map((order) => (order.status !== 'served' && (
            <div key={order.id} className="col">
              <Card>
                <Card.Body>
                  <Card.Title>
                    {__("Orders")} #{order.id}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {__("Ordered at")}: {order.created_at}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>{__("Guest")}:</strong> {order.guest_name}
                    <br />
                    <strong>{__("Table")}:</strong> {order.table}
                    <br />
                    <strong>{__("Status")}:</strong> {order.status}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleServeOrder(order.id, order.guest_id)} // Így hívjuk meg a serve függvényt
                  >
                    {__("Served")}
                  </Button>
                  <Button
                    onClick={() => toggleCollapse(order.id)} // Kattintásra megváltoztatjuk az állapotot
                    aria-controls={`collapse-${order.id}`}
                    aria-expanded={openStates[order.id]}
                  >
                    {__("Details")}
                  </Button>
                </Card.Body>
                <Collapse in={openStates[order.id]} id={`collapse-${order.id}`}>
                <div>
                  <Table striped bordered hover>
                    <tbody>
                      {filteredOrderDetails(order).map((detail, index) => (
                        <tr key={index}>
                          <td>{detail.drinkName}</td>
                          <td>{detail.amount}</td>
                          <td>
                          {detail.unit_code === 'bottle' ? detail.unit_code : `${detail.unit} ${detail.unit_code}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Collapse>
              </Card>
            </div>
      )))}
        </div>
      )}
    </div>
  );
};

export default Orders;
