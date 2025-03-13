
import React, { useState, useRef, useEffect } from "react";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Create a ref for the title input field
  const titleInputRef = useRef(null);

  // Focus the title input when the component mounts
  useEffect(() => {
    titleInputRef.current.focus();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Prevent empty task creation

    // Dispatch addTask action with task details
    addTask({
      id: Date.now(), // Unique ID based on timestamp
      title,
      description,
      completed: false, // Default to not completed
    });

    setTitle(""); // Clear input after submission
    setDescription(""); // Clear input after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={titleInputRef} // Attach ref to the title input field
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update title state
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Update description state
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
