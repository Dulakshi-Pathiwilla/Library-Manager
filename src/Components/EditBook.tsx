import { useNavigate, useParams } from "react-router-dom";
import BookForm, { type BookFormValues } from "./BookForm";
import { useBooks } from "../BooksContext";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById, updateBook } = useBooks();

  if (!id) return <p>Invalid book id</p>;

  const book = getBookById(id);
  if (!book) return <p>Book not found</p>;

  const initialValues: BookFormValues = {
    title: book.title,
    author: book.author,
    publicationYear: String(book.publicationYear),
    genre: book.genre,
    copiesAvailable: String(book.copiesAvailable),
  };

  const handleSubmit = (values: BookFormValues) => {
    updateBook(id, {
      title: values.title,
      author: values.author,
      publicationYear: Number(values.publicationYear),
      genre: values.genre,
      copiesAvailable: Number(values.copiesAvailable),
    });
    navigate("/books");
  };

  return (
    <div>
      <h2 className="page-title">Edit Book</h2>
      <BookForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="Update"
        onCancel={() => navigate("/books")}
      />
    </div>
  );
};

export default EditBook;