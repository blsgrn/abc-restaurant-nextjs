import { useState, useEffect } from "react";

const QueryForm = () => {
  const [formData, setFormData] = useState({
    userId: "", // This will be populated from localStorage
    query: "",
    response: "", // Default empty response
    status: "Open", // Default status
    date: "", // Will be set to the current date
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Use useEffect to load the userId from localStorage when the component mounts
  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      setFormData((prevData) => ({
        ...prevData,
        userId,
        date: new Date().toISOString(), // Set current date
      }));
    } else {
      setError("User ID is missing. Please log in again.");
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/queries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          userId: localStorage.getItem("id") || "", // Keep userId, reset query field
          query: "",
          response: "", // Reset response
          status: "Open", // Reset status
          date: new Date().toISOString(), // Set current date
        });
      } else {
        setError("Failed to submit query.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while submitting the query.");
    }
  };

  return (
    <div className="query-form bg-red-200">
      <h2>Submit a Query</h2>
      {isSubmitted ? (
        <p>Thank you! Your query has been submitted.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Removed userId input field since it's now automatically populated */}
          <div>
            <label htmlFor="query">Query:</label>
            <textarea
              id="query"
              name="query"
              value={formData.query}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit Query</button>
        </form>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default QueryForm;
