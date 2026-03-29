import React, { useState } from "react";

const initialTodos = [
  { id: 1, text: "Create the first task", done: true },
  { id: 2, text: "Style the interface", done: false },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [value, setValue] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    const text = value.trim();
    if (!text) return;

    setTodos((current) => [
      { id: Date.now(), text, done: false },
      ...current,
    ]);
    setValue("");
  };

  const toggleTodo = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const remaining = todos.filter((todo) => !todo.done).length;

  return (
    <main className="app-shell">
      <section className="todo-card">
        <p className="eyebrow">Vite + React</p>
        <h1>Todo Application</h1>
        <p className="subtitle">
          A simple starter app that writes code into the editor and shows the
          running result in preview.
        </p>

        <form className="todo-form" onSubmit={addTodo}>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Add a new task"
          />
          <button type="submit">Add task</button>
        </form>

        <div className="todo-meta">
          <span>{remaining} task(s) remaining</span>
          <span>{todos.length} total</span>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.done ? "done" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
