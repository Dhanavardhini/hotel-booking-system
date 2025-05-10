import axios from 'axios';
import './userlist.css';
import React, { useEffect, useState } from 'react';

function Userslist() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost/hotelbackend/controllers/api/User/Get/staff.php');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditFormData({
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
    });
  };

  const handleSaveClick = async () => {
    try {
      const { id, name, phone, email } = editFormData;
      await axios.put(
        `http://localhost/hotelbackend/controllers/api/admin/put/staff.php`,
        { id, name, phone, email }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, name, phone, email } : user
        )
      );
      setEditingUserId(null);
      alert('User updated successfully');
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Failed to update user');
    }
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost/hotelbackend/controllers/api/admin/delete/staff.php`,
        { id }
      );
      if (response.data.message === 'success') {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        alert('User deleted successfully');
      } else {
        throw new Error(response.data?.message || 'Unknown error occurred');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="ud">
      <div className="containeruser">
        <table className="users-table">
          <thead>
            <tr className="table-row">
              <th className="table-header">ID</th>
              <th className="table-header">Name</th>
              <th className="table-header">Phone</th>
              <th className="table-header">Email</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="table-row" key={user.id}>
                {editingUserId === user.id ? (
                  <>
                    <td className="table-cell">{user.id}</td>
                    <td className="table-cell">
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td className="table-cell">
                      <input
                        type="text"
                        name="phone"
                        value={editFormData.phone}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td className="table-cell">
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td className="table-cell">
                      <button className="save-btn" onClick={handleSaveClick}>
                        Save
                      </button>
                      <button className="cancel-btn" onClick={handleCancelClick}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="table-cell">{user.id}</td>
                    <td className="table-cell">{user.name}</td>
                    <td className="table-cell">{user.phone}</td>
                    <td className="table-cell">{user.email}</td>
                    <td className="table-cell">
                      <button
                        className="edit-btn"
                        title="Edit user"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        title="Delete user"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Userslist;

