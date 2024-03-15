import { useState, useEffect } from "react";
import axiosService from "../../models/axiosService.js";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const getUser = async () => {
      try {
        const response = await axiosService.get("/employees");

        console.log(JSON.stringify(response.data));
        if (isMounted) {
          setUsers(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
    return () => {
    };
  }, []);

  return (
    <article>
      <h2>Users list</h2>
      {users?.length ? (
        <DisplayUser data={users} />
      ) : (
        <p>No usres to display</p>
      )}
    </article>
  );
}


function DisplayUser(props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: '',
    email: '',
    role: '',
    active: false
  });
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: '',
    active: false
  });

  const handleEditModalClose = () => setShowEditModal(false);
  const handleEditModalShow = (user) => {
    setSelectedUser(user);
    setEditedUserData({
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active
    });
    setShowEditModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setNewUserData({ name: '', email: '', role: '', active: false });
  };
  
  const handleAddModalShow = () => setShowAddModal(true);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData({ ...editedUserData, [name]: value });
    setNewUserData({ ...newUserData, [name]: value })
  };

  
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setEditedUserData({ ...editedUserData, [name]: checked });
    setNewUserData({ ...newUserData, [name]: checked });
    
  };
  const handleAddSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send new user data to the backend
      const response = await axiosService.post("/employees", newUserData);
      console.log('New user added:', response.data);
      // Close modal after successful addition
      handleAddModalClose();
      // You might want to refresh the user list after adding a new user
    } catch (error) {
      console.error('Error adding new user:', error);
      // Handle error, display error message, etc.
    }
  };
  const handleDelete = (userId) => {
    // Implement your delete logic here
    console.log(`Deleting user with ID ${userId}`);
    // After deletion, you might want to update the user list in your state or perform any necessary side effects
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send edited user data to the backend
      const response = await axiosService.put(`/employees/${selectedUser.id}`, editedUserData);
      console.log('User data updated:', response.data);
      // Close modal after successful update
      handleEditModalClose();
      // You might want to refresh the user list after updating a user
    } catch (error) {
      console.error('Error updating user data:', error);
      // Handle error, display error message, etc.
    }
  };
  const handleAddUser = (event) => {
    event.preventDefault();
    handleEditModalClose();
    console.log('Adding a new user');
    // You can show a modal for adding a new user or navigate to an add user page
  };


  return (
    <div>
    <Button variant="primary" onClick={handleAddModalShow}>Add User</Button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.active ? "Yes" : "No"}</td>
              <td>
                <button className="edit" onClick={() => handleEditModalShow(user)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={editedUserData.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" value={editedUserData.email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" name="role" value={editedUserData.role} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formActive">
              <Form.Check type="checkbox" name="active" label="Active" checked={editedUserData.active} onChange={handleCheckboxChange} />
            </Form.Group>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showAddModal} onHide={handleAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={newUserData.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" value={newUserData.email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" name="role" value={newUserData.role} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formActive">
              <Form.Check type="checkbox" name="active" label="Active" checked={newUserData.active} onChange={handleCheckboxChange} />
            </Form.Group>
            <Button variant="secondary" onClick={handleAddModalClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

