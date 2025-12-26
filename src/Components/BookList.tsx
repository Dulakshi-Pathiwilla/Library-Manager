import { useNavigate } from "react-router-dom";
import { useBooks } from "../BooksContext";

const BookList = () => {
  const navigate = useNavigate();
  const { books, deleteBook } = useBooks();

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this book?")) return;
    deleteBook(id);
  };

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