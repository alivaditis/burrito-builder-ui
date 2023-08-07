import { useState, useEffect } from "react";
import "./App.css";
import { getOrders, postOrder } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders] = useState([])
  
  useEffect(() => {
    getOrders()
      .then(data => setOrders(data.orders))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  const addOrder = (order) => {
    postOrder(order)
      .then(res => {
        setOrders([...orders, order])
      })
  }

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder}/>
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
