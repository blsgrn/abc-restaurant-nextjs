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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        // Reset form fields and states
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          imageUrl: "",
        });
        setIsEditing(false);
        setEditItemId(null);
        fetchMenuItems(); // Refresh the list
      } else {
        alert(`Failed to ${isEditing ? "update" : "create"} menu item.`);
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
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/hospitalities/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Menu item deleted successfully!");
          fetchMenuItems(); // Refresh the list
        } else {
          alert("Failed to delete menu item.");
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
    <div>
      <h2>Menu Management</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-400 flex flex-1 flex-col mb-6"
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">
          {isEditing ? "Update" : "Create"} Menu Item
        </button>
      </form>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.imageUrl}</td>
              <td>
                <button
                  onClick={() => handleUpdate(item)}
                  className="text-blue-500 mr-4"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500"
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
