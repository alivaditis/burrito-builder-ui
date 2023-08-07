export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders").then((response) => response.json());
};

export const postOrder = (order) => {
  return fetch("http://localhost:3001/api/v1/orders",
  {
    method: "POST",
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('unsuccesful post')
    } else return (res.json())
  })
}