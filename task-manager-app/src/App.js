
import React, { useState, useContext, useEffect, useReducer, useMemo, useCallback } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ThemeContext } from "./context/ThemeContext"; // Theme context
import { taskReducer } from "./reducers/taskReducer"; // Import reducer
import "./styles/styles.css";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Dark mode context

  // ✅ Initialize useReducer
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks;
  });

  // ✅ Filter state for filtering tasks (All, Completed, Incomplete)
  const [filter, setFilter] = useState("all");

  // ✅ Save tasks to localStorage when they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (tasks.length > 0) {
      alert("Task list updated!"); // Alert user when tasks change
    }
  }, [tasks]);

  // ✅ Dispatch actions instead of using setState
  const addTask = (task) => {
    dispatch({ type: "ADD_TASK", payload: task });
  };

  // ✅ Memoized toggleComplete using useCallback
  const toggleComplete = useCallback((id) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  }, []); // Empty dependency array ensures this is only created once

  // ✅ Memoized deleteTask using useCallback
  const deleteTask = useCallback((id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  }, []); // Empty dependency array ensures this is only created once

  // Memoize the filtered tasks based on filter type
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "incomplete":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]); // Recompute only when tasks or filter change

  return (
    <div className={`app-container ${theme}`}>
      <h1>Task Manager</h1>
      <button onClick={toggleTheme}>
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>

      {/* Task Form to add new tasks */}
      <TaskForm addTask={addTask} />

      {/* Filter buttons */}
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>
      
      {/* Task List with filtered tasks */}
      <TaskList tasks={filteredTasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
