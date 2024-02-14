import { useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const inputRef = useRef();

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleAddTodo = () => {
    const text = inputRef.current.value;
    if (text.trim() === "") {
      return; // Do not add empty todos
    }

    if (editingIndex !== null) {
      // If editing, update the existing todo
      const newTodos = [...todos];
      newTodos[editingIndex].text = text;
      setTodos(newTodos);

      setEditingIndex(null);
    } else {
      const newItem = { completed: false, text };
      setTodos([...todos, newItem]);
    }
    localStorage.setItem("todos", JSON.stringify(todos));

    inputRef.current.value = "";
  };

  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleEditItem = (index) => {
    const textToEdit = todos[index].text;
    inputRef.current.value = textToEdit;
    setEditingIndex(index);
  };

  return (
    <div className="App">
      <h2>To Do List</h2>
      <div className="to-do-container">
        <ul>
          {todos.map(({ completed, text }, index) => (
            <div className="item" key={index}>
              <li className={completed ? "done" : ""}>
                <input
                  type="checkbox"
                  className="cbox"
                  onClick={() => handleItemDone(index)}
                />
                {text}
              </li>
              <span onClick={() => handleEditItem(index)} className="edit">
                ✏️
              </span>
              <span onClick={() => handleDeleteItem(index)} className="trash">
                ❌
              </span>
            </div>
          ))}
        </ul>
        <input
          ref={inputRef}
          placeholder="Enter item ..."
          className="input-items"
        />
        <button onClick={handleAddTodo} className="button-add" type="submit">
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default App;
