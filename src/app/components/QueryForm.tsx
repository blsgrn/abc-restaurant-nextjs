import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const QueryForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    query: "",
    response: "",
    status: "Open",
    date: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      setFormData((prevData) => ({
        ...prevData,
        userId,
        date: new Date().toISOString(),
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

  const sendEmailNotification = async () => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      customer_name: localStorage.getItem("name"),
      user_id: formData.userId,
      query: formData.query,
      date: new Date().toLocaleString(),
    };

    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      console.log("Email successfully sent!", result.text);
    } catch (error) {
      console.error("Error sending email:", error);
      setError("Failed to send email notification.");
    }
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
        // Send email notification
        await sendEmailNotification();

        setIsSubmitted(true);
        setFormData({
          userId: localStorage.getItem("id") || "",
          query: "",
          response: "",
          status: "Open",
          date: new Date().toISOString(),
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
    <div className="query-form bg-info p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Submit a Query</h2>
      {isSubmitted ? (
        <p className="text-base-100">
          Thank you! Your query has been submitted.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="query"
              className="block text-sm font-medium text-gray-700"
            >
              Query:
            </label>
            <textarea
              id="query"
              name="query"
              value={formData.query}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-info-content text-white rounded hover:bg-blue-600"
          >
            Submit Query
          </button>
        </form>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default QueryForm;
