import { useNavigate } from "react-router-dom";
import BookForm, { type BookFormValues } from "./BookForm";
import { createBook } from "../Api/BooksApi";

const emptyValues: BookFormValues = {
  title: "",
  author: "",
  publicationYear: "",
  genre: "",
  copiesAvailable: "",
};

const AddBook = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: BookFormValues) => {
    await createBook({
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