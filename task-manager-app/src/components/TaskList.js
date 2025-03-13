
import React from "react";

const TaskList = ({ tasks, toggleComplete, deleteTask }) => 
{
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className= {`task-item ${task.completed ? "completed" : ""}`}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button className="complete-btn" onClick={() => toggleComplete(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
