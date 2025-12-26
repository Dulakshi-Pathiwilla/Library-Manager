import { useNavigate } from "react-router-dom";
import BookForm, { type BookFormValues } from "./BookForm";
import { useBooks } from "../BooksContext";

const emptyValues: BookFormValues = {
  title: "",
  author: "",
  publicationYear: "",
  genre: "",
  copiesAvailable: "",
  shelfLocation: "",          
};

const AddBook = () => {
  const navigate = useNavigate();
  const { addBook } = useBooks();

  const handleSubmit = (values: BookFormValues) => {
    addBook({
      title: values.title,
      author: values.author,
      publicationYear: Number(values.publicationYear),
      genre: values.genre,
      copiesAvailable: Number(values.copiesAvailable),
      shelfLocation: values.shelfLocation.trim(),  // NEW
    });
    navigate("/books");
  };

  return (
    <div>
      <h2 className="page-title">Add Book</h2>
      <BookForm
        initialValues={emptyValues}
        onSubmit={handleSubmit}
        submitLabel="Save Book"
        onCancel={() => navigate("/books")}
      />
    </div>
  );
};

export default AddBook;