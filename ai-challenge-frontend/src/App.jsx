// src/App.jsx

import SearchPage from "./pages/SearchPage";
import './App.css';

function App() {
  // Bọc SearchPage trong một container để dễ dàng căn chỉnh
  return (
    <div className="container mx-auto p-4">
      <SearchPage />
    </div>
  );
}

export default App;