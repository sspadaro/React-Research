import { useState } from "react";

function App() {
  return (
    <>
      <h1>Nutrition Tracker</h1>
      <p>Keep track of what you eat throughout the day!</p>
      <form>
        <h2>Add a food</h2>
        <label for="foodName">Food name</label>
        <input
          type="text"
          id="foodName"
          name="foodName">
        </input>
        <label for="calories">Calories</label>
        <input
          type="text"
          id="calories"
          name="calories">
        </input>
        <label for="protein">Protein(g)</label>
        <input
          type="text"
          id="protein"
          name="protein">
        </input>
        <button type="submit">Add food</button>
      </form>
      <h2>Your food log</h2>
    </>
  )
}

export default App;