import { OrdersTable } from "../basics/OrdersTable";


export default function OrdersPage() {
  const ordersData = [
    { date: "2022-03-01", totalPrice: 25.99 },
    { date: "2022-03-02", totalPrice: 19.99 },
    // Add more order objects as needed
  ];
  return (
    <article>
        <h2>Orders</h2>
        <OrdersTable orders={ordersData} />
      </article>
  )
}
