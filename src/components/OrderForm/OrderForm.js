import { useState } from "react";

function OrderForm({addOrder}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const order = {
      name,
      ingredients
    }
    if(name && ingredients.length) {
      addOrder(order)
      clearInputs();      
    } else {
      alert('add a name and ingredients before submitting')
    }
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const handleAddIngredient = (e) => {
    e.preventDefault()
    if(ingredients.every(ingredient => ingredient !== e.target.value)) {
      setIngredients([...ingredients, e.target.value])
    }
  }

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        value={ingredient}
        onClick={handleAddIngredient}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.length ? ingredients.join(", ") : "Nothing selected"}</p>

      <button name ='submit' onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
