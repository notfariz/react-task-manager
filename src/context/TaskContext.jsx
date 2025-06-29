import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...updatedTask, id } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const getTask = (id) => tasks.find((t) => t.id === parseInt(id));

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, getTask }}>
      {children}
    </TaskContext.Provider>
  );
};