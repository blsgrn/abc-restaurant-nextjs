import { useState, useEffect } from "react";
import Image from "next/image";

const ManageGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGalleries();
    fetchRestaurants();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/galleries`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch galleries.");
      }
      const data = await response.json();
      setGalleries(data);
    } catch (error) {
      console.error("Error fetching galleries:", error);
      setError("Failed to load galleries.");
    }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurants`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch restaurants.");
      }
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setError("Failed to load restaurants.");
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("restaurantId", restaurantId);
    formData.append("description", description);
    formData.append("file", imageFile);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/galleries/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to upload gallery.");
      }
      await fetchGalleries();
      setImageFile(null);
      setDescription("");
      setRestaurantId("");
    } catch (error) {
      console.error("Error uploading gallery:", error);
      setError("Failed to upload gallery.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/galleries/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete gallery.");
      }
      await fetchGalleries();
    } catch (error) {
      console.error("Error deleting gallery:", error);
      setError("Failed to delete gallery.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Gallery Management</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Restaurant</label>
          <select
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Image File</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Gallery List</h2>
      <div className="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-2 gap-4">
        {galleries.map((gallery) => (
          <div key={gallery._id} className="border rounded p-4">
            <Image
              src={`http://localhost:9090${gallery.imageUrl}`}
              alt={gallery.description}
              width={600}
              height={600}
              className="w-full h-48 object-cover mb-2"
            />
            <p className="text-gray-700">{gallery.description}</p>
            <p className="text-gray-500">
              Restaurant ID: {gallery.restaurantId}
            </p>
            <button
              onClick={() => handleDelete(gallery.id)}
              className="bg-red-500 text-white py-1 px-2 rounded mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageGallery;
