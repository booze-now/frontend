import { useState, useEffect } from "react";
import axiosService from "../../models/axiosService.js";
import DataTable from "datatables.net-dt";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./table.css"

export default function Employee(props) {
  let table = new DataTable('#myTable', {
    retrieve: true,
    responsive: true,
});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [userChanged, setUserChanged] = useState(false); // Flag to track if user was added or edited

  const handleEditModalClose = () => setShowEditModal(false);
  const handleAddModalShow = () => setShowAddModal(true);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [editedUserData, setEditedUserData] = useState({
    first_name: "", middle_name: "", last_name: "",
    email: "", role: "", active: false,
  });

  const [newUserData, setNewUserData] = useState({
    first_name: "", middle_name: "", last_name: "", email: "",
    password: "", role: "", active: false,
  });

  const handleEditModalShow = (user) => {
    setSelectedUser(user);
    setEditedUserData({
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      email: user.email,
      role_code: user.role_code,
      active: user.active,
    });
    setShowEditModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setNewUserData({
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      role_code: "",
      active: false,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData({ ...editedUserData, [name]: value });
    setNewUserData({ ...newUserData, [name]: value });
  };

  const handleRoleChange = (event) => {
    const { value } = event.target;
    setEditedUserData({ ...editedUserData, role_code: value });
    setNewUserData({ ...newUserData, role_code: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setEditedUserData({ ...editedUserData, [name]: checked });
    setNewUserData({ ...newUserData, [name]: checked });
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    console.log(newUserData);
    try {
      // Send new user data to the backend
      const response = await axiosService.post("/employees", newUserData);
      console.log("New user added:", response.data);
      // Close modal after successful addition
      handleAddModalClose();
      // Set the flag to indicate user was added
      setUserChanged(true);
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axiosService.delete(`/employees/${userId}`);
      // Set the flag to indicate user was edited
      setUserChanged(true);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send edited user data to the backend
      console.log(editedUserData);
      const response = await axiosService.put(
        `/employees/${selectedUser.id}`,
        editedUserData
      );
      console.log("User data updated:", response.data);
      // Close modal after successful update
      handleEditModalClose();
      // Set the flag to indicate user was edited
      setUserChanged(true);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    // Call getUser only if a user was added or edited
    if (userChanged) {
      props.getUser();
      setUserChanged(false); // Reset the flag
    }
  }, [userChanged, props]);

  return (
    <div>
      <Button variant="primary" onClick={handleAddModalShow}>
        Add User
      </Button>
      <table
        id="myTable"
        className="table, table table-striped, table table-hover"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
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
              <td>{user.first_name}</td>
              <td>{user.middle_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.active ? "Yes" : "No"}</td>
              <td>
                <button
                  className="btn btn-dark"
                  onClick={() => handleEditModalShow(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-dark"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
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
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={editedUserData.first_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formMiddleName">
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type="text"
                name="middle_name"
                value={editedUserData.middle_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={editedUserData.last_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedUserData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role_code"
                value={editedUserData.role_code}
                onChange={handleRoleChange}
              >
                <option value="0">Waiter</option>
                <option value="1">Bartender</option>
                <option value="2">Backoffice</option>
                <option value="3">Admin</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formActive">
              <Form.Check
                type="checkbox"
                name="active"
                label="Active"
                checked={editedUserData.active}
                onChange={handleCheckboxChange}
              />
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
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={newUserData.first_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formMiddleName">
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type="text"
                name="middle_name"
                value={newUserData.middle_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={newUserData.last_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUserData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>

              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={newUserData.password}
                  onChange={handleInputChange}
                />
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role_code"
                value={newUserData.role_code}
                onChange={handleInputChange}
              >
                <option value="0">Waiter</option>
                <option value="1">Bartender</option>
                <option value="2">Backoffice</option>
                <option value="3">Admin</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formActive">
              <Form.Check
                type="checkbox"
                name="active"
                label="Active"
                checked={newUserData.active}
                onChange={handleCheckboxChange}
              />
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

