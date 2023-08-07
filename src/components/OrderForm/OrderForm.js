import { useState } from "react";

function OrderForm({addOrder}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [fieldsError, setFieldsError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    const order = {
      name,
      ingredients
    }
    if(name && ingredients.length) {
      addOrder(order)
      setFieldsError(false)
      clearInputs();      
    } else {
      setFieldsError(true)
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
        className="ingredients"
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
        className="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}
      {fieldsError && <p>Add a name and at least one ingredient before submitting</p>}
      <p className='order-status'>  Order: {ingredients.length ? ingredients.join(", ") : "Nothing selected"}</p>

      <button className='submit-button' name ='submit' onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
