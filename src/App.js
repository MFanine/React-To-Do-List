import {useRef, useState} from "react";
import './App.css';

function App() {
  const [todos, setTodos] = useState([])

  const inputRef = useRef()

  const handleAddTodo = () => {
    const text = inputRef.current.value;
    const newItemv = {comleted: false , text}
    setTodos([...todos, newItemv])
    inputRef.current.value = "";
  }

  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].comleted= !newTodos[index].comleted
    setTodos(newTodos);
  }

  const handleDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index,1)
    setTodos(newTodos)

  }
  return (
    <div className="App">
      <h2>To Do List</h2>
      <div className="to-do-container">
      <ul>
        {todos.map(({comleted ,text} , index) => {
          return (
          <div className="item">
            <li className={comleted ? "done": ""} key={index}  ><input type="checkbox" className="cbox"  onClick={() => handleItemDone(index)}/> {text}</li>
            <span onClick={() => handleDeleteItem(index)} className="trash">
            ❌
            </span>
            </div>
          );
        })}
      </ul>
      <input ref={inputRef} placeholder="Enter item ..." className="input-items"/>
      <button onClick={handleAddTodo} className="button-add">Add</button>
      </div>
    </div>
  );
}

export default App;
