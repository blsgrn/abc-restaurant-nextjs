import { useState, useEffect } from "react";

const MenuManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });
  const [menuItems, setMenuItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, description, price, category, imageUrl } = formData;

    if (!name || !description || !price || !category || !imageUrl) {
      alert("Please fill out all fields.");
      return false;
    }

    if (name.length < 2 || name.length > 100) {
      alert("Name must be between 2 and 100 characters.");
      return false;
    }

    if (description.length < 10 || description.length > 500) {
      alert("Description must be between 10 and 500 characters.");
      return false;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      alert("Price must be a positive number.");
      return false;
    }

    const imageUrlPattern = /^\/food-pics\/\w+\.(jpg|jpeg|png|gif)$/;
    if (!imageUrlPattern.test(imageUrl)) {
      alert(
        "Invalid format for Image URL. It should be in the form of /food-pics/foodpic12.jpg."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_API_URL}/hospitalities/${editItemId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/hospitalities`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Menu item ${isEditing ? "updated" : "created"} successfully!`);
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          imageUrl: "",
        });
        setIsEditing(false);
        setEditItemId(null);
        fetchMenuItems();
      } else {
        alert(
          `Failed to ${isEditing ? "update" : "create"} menu item. Status: ${
            response.status
          }`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        `An error occurred while ${
          isEditing ? "updating" : "creating"
        } the menu item.`
      );
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/hospitalities`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/hospitalities/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Menu item deleted successfully!");
          fetchMenuItems();
        } else {
          alert("Failed to delete menu item. Status: " + response.status);
        }
      } catch (error) {
        console.error("Error deleting menu item:", error);
      }
    }
  };

  const handleUpdate = (item) => {
    setFormData(item);
    setIsEditing(true);
    setEditItemId(item.id);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Menu Management
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-info shadow-md rounded-lg p-6 mb-8"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Image URL:
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-info-content text-warning font-bold p-4 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          {isEditing ? "Update" : "Create"} Menu Item
        </button>
      </form>

      <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-gray-600">Description</th>
            <th className="px-4 py-2 text-left text-gray-600">Price</th>
            <th className="px-4 py-2 text-left text-gray-600">Category</th>
            <th className="px-4 py-2 text-left text-gray-600">Image URL</th>
            <th className="px-4 py-2 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2 text-gray-700">{item.name}</td>
              <td className="px-4 py-2 text-gray-700">{item.description}</td>
              <td className="px-4 py-2 text-gray-700">{item.price}</td>
              <td className="px-4 py-2 text-gray-700">{item.category}</td>
              <td className="px-4 py-2 text-gray-700">{item.imageUrl}</td>
              <td className="px-4 py-2 flex">
                <button
                  onClick={() => handleUpdate(item)}
                  className="text-blue-500 mr-4 hover:text-blue-700 transition duration-200"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuManagement;
