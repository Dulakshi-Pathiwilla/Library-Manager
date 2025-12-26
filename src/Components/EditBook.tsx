import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookForm, { type BookFormValues } from "./BookForm";
import { getBook, updateBook } from "../Api/BooksApi";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<BookFormValues | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const book = await getBook(id);
        setInitialValues({
          title: book.title,
          author: book.author,
          publicationYear: String(book.publicationYear),
          genre: book.genre,
          copiesAvailable: String(book.copiesAvailable),
        });
      } catch (err) {
        setError("Failed to load book");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleSubmit = async (values: BookFormValues) => {
    if (!id) return;
    await updateBook(id, {
      title: values.title,
      author: values.author,
      publicationYear: Number(values.publicationYear),
      genre: values.genre,
      copiesAvailable: Number(values.copiesAvailable),
    });
    navigate("/books");
  };

  if (loading) return <p>Loading...</p>;
  if (error || !initialValues) return <p>{error ?? "Book not found"}</p>;

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