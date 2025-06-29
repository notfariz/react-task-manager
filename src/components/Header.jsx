import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="max-w-3xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">Task Manager</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/create" className="hover:underline">Create Task</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;