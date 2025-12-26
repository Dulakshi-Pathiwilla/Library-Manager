import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Book } from "../Types";
import { getBooks, deleteBook } from "../Api/BooksApi";

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError("Failed to load books");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this book?");
    if (!confirmed) return;

    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert("Failed to delete book");
      console.error(err);
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="page-title">Library — Book List</h2>

      {books.length === 0 ? (
        <p>No books found. Click “Add Book” to create one.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Title</th>
              <th style={{ width: "25%" }}>Author</th>
              <th style={{ width: "10%" }}>Year</th>
              <th style={{ width: "20%" }}>Genre</th>
              <th style={{ width: "15%" }}>Copies</th>
              <th style={{ width: "15%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.publicationYear}</td>
                <td>{b.genre}</td>
                <td>{b.copiesAvailable}</td>
                <td>
                  <button
                    className="btn-small"
                    onClick={() => navigate(`/edit/${b.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-small btn-danger"
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookList;