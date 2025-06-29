import { useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function Home() {
  const { tasks, deleteTask } = useTasks();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Filter tasks by search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Tasks</h2>
        <Link
          to="/create"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Task
        </Link>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* Task Table */}
      {currentTasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-300 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{task.title}</td>
                  <td className="py-2 px-4 border-b">{task.description}</td>
                  <td className="py-2 px-4 border-b text-center space-x-4">
                    <Link
                      to={`/edit/${task.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;