import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import Header from "./components/Header";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Header />
        <div className="p-6 max-w-3xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;