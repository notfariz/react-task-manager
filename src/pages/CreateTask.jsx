import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function CreateTask() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addTask({ title, description });
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create a New Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Task Title"
            className={`w-full p-2 border rounded ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: "" });
            }}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Task Description"
            className={`w-full p-2 border rounded ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows="4"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors({ ...errors, description: "" });
            }}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className={`px-4 py-2 rounded text-white transition ${
            !title.trim() || !description.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={!title.trim() || !description.trim()}
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;