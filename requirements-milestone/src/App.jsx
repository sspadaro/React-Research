import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [food, setFood] = useState({
    name: "",
    calories: "",
    protein: ""
  });
  const [foods, setFoods] = useState([]);
  const [editingId, setEditingID] = useState(null);

  function addFood() {
    const newFood = {
      id: nanoid(),
      ...food,
      calories: Number(food.calories),
      protein: Number(food.protein)
    };
    
    setFoods([...foods, newFood]);
  }

  function removeFood(id) {
    const newFoods = foods.filter((food) => id !== food.id);
    setFoods(newFoods);
  }

  function startEditing(id) {
    const selectedFood = foods.find((food) => food.id === id);

    setFood({
      name: selectedFood.name,
      calories: String(selectedFood.calories),
      protein: String(selectedFood.protein)
    });

    setEditingId(id);
  }

  function editFood() {
    const updatedFoods = foods.map((item) => {
      if (item.id === editingId) {
        return {
          ...item,
          name: food.name,
          calories: Number(food.calories),
          protein: Number(food.protein)
        };
      }

      return item;
    });

    setFoods(updatedFoods);
    cancelEditing();
  }

  function cancelEditing() {
    setEditingId(null);
    setFood({ name: "", calories: "", protein: "" });
  }

  function handleSubmit(event){
    event.preventDefault();
    if (editingId !== null) {
      editFood();
    } else {
      addFood();
      setFood({
        name: "",
        calories: "",
        protein: ""
      });
    }
  }

  return (
    <>
      <h1>Nutrition Tracker</h1>
      <p>Keep track of what you eat throughout the day!</p>
      <form onSubmit={handleSubmit}>
        <h2>{editingId !== null ? "Edit food" : "Add a food"}</h2>
        <label htmlFor="foodName">Food name</label>
        <input
          type="text"
          id="foodName"
          value={food.name}
          onChange={(event) => setFood({ ...food, name: event.target.value })}
          required
        />
        <label htmlFor="calories">Calories</label>
        <input
          type="text"
          id="calories"
          value={food.calories}
          onChange={(event) => setFood({ ...food, calories: event.target.value})}
          required
        />
        <label htmlFor="protein">Protein(g)</label>
        <input
          type="text"
          id="protein"
          value={food.protein}
          onChange={(event) => setFood({ ...food, protein: event.target.value})}
          required
        />
        <button type="submit">{editingId !== null ? "Save changes" : "Add food"}</button>
        {editingId !== null && (
          <button type="button" onClick={cancelEditing}>
            Cancel
          </button>
        )}
      </form>
      <h2>Your food log</h2>
      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            <strong>{food.name}</strong>
            <p>Calories: {food.calories}</p>
            <p>Protein: {food.protein} g</p>

            <button onClick={() => startEditing(food.id)}>Edit</button>
            <button onClick={() => removeFood(food.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Daily totals</h2>
      <p>
        Calories: {foods.reduce((total, item) => total + item.calories, 0)}
      </p>
      <p>
        Protein: {foods.reduce((total, item) => total + item.protein, 0)} g
      </p>
    </>
  );
}

export default App;