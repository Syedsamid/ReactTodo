import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

  const saveEdit = (id) => {
    if (!editValue.trim()) return;
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editValue } : todo
    ));
    setEditingId(null);
  };

  return (
    <div className="app">
      <div className="background-animation">
        <div className="gradient-layer"></div>
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="particle" style={{
              '--i': i,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}></span>
          ))}
        </div>
      </div>
      <div className="todo-container">
        <h1 className="title">To Do List</h1>
        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button type="submit" className="add-btn">Add</button>
        </form>
        
        <ul className="todo-list">
          {todos.map(todo => (
            <li 
              key={todo.id} 
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              {editingId === todo.id ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="edit-input"
                    autoFocus
                  />
                  <button 
                    onClick={() => saveEdit(todo.id)}
                    className="save-btn"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <span onDoubleClick={() => startEditing(todo.id, todo.text)}>
                    {todo.text}
                  </span>
                  <div className="todo-actions">
                    <button
                      onClick={() => startEditing(todo.id, todo.text)}
                      className="edit-btn"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="delete-btn"
                    >
                      ×
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;