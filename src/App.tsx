import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";
import BookList from "./Components/BookList";
import AddBook from "./Components/AddBook";
import EditBook from "./Components/EditBook";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </Layout>
  );
}

export default App;