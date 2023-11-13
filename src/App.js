import React, { useState, useEffect } from 'react';
import './App.css';

// Task function for handling a single task in a list
function Task({ task, index, completeTask, deleteTask, editTask }) {
  return (
    <li style={{ textDecoration: task.completed ? 'line-through' : '' }}>
      {task.name}
      <div>
        <button onClick={() => completeTask(index)}>Done</button>
        <button onClick={() => deleteTask(index)}>Delete</button>
        <button onClick={() => editTask(index, task.name)}>Edit</button>
      </div>
    </li>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Restoring data from local storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    // Save data for local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== '') {
      if (editing) {
        // Edit task
        const newTasks = [...tasks];
        newTasks[editIndex].name = task;
        setTasks(newTasks);
        setEditing(false);
        setEditIndex(null);
      } else {
        // Add task
        setTasks([...tasks, { name: task, completed: false }]);
      }
      setTask('');
    }
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const editTask = (index, name) => {
    setTask(name);
    setEditing(true);
    setEditIndex(index);
  };

  // Structure
  return (
    <div className="container">
      <h1>To-do List</h1>
      <div className="add-task-tab">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add task..."
        />
        <button className="add-btn" onClick={addTask}>{editing ? 'Edit' : 'Add'}</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <Task
            key={index}
            index={index}
            task={task}
            completeTask={completeTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
