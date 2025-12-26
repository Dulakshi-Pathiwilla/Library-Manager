import { useState, type FormEvent } from "react";

export interface BookFormValues {
  title: string;
  author: string;
  publicationYear: string;
  genre: string;
  copiesAvailable: string;
  shelfLocation: string;        
}

interface BookFormProps {
  initialValues: BookFormValues;
  onSubmit: (values: BookFormValues) => Promise<void> | void;
  submitLabel: string;
  cancelLabel?: string;
  onCancel?: () => void;
}

const BookForm = ({
  initialValues,
  onSubmit,
  submitLabel,
  cancelLabel = "Cancel",
  onCancel,
}: BookFormProps) => {
  const [values, setValues] = useState<BookFormValues>(initialValues);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Title
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Author
        <input
          name="author"
          value={values.author}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Publication Year
        <input
          name="publicationYear"
          type="number"
          value={values.publicationYear}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Genre
        <input
          name="genre"
          value={values.genre}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Copies Available
        <input
          name="copiesAvailable"
          type="number"
          min={0}
          value={values.copiesAvailable}
          onChange={handleChange}
          required
        />
      </label>

      {/* NEW FIELD */}
      <label>
        Shelf Location
        <input
          name="shelfLocation"
          value={values.shelfLocation}
          onChange={handleChange}
          placeholder="e.g. A-3"
        />
      </label>

      <div className="form-buttons">
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
            disabled={submitting}
          >
            {cancelLabel}
          </button>
        )}
      </div>
    </form>
  );
};

export default BookForm;