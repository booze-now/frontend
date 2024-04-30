import React, { useState, useEffect } from "react";
import { useApi } from "contexts/ApiContext";
import ModalComponent from "./ModalComponent";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsPlus } from "react-icons/bs";

const TableComponent = ({ columns, apiEndpoint }) => {
  const [data, setData] = useState([]);
  const { get, post, put, deleteX } = useApi();
  const [searchText, setSearchText] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  useEffect(() => {
    fetchData();
  }, [apiEndpoint]);

  const fetchData = async () => {
    try {
      const response = await get(apiEndpoint);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (Id) => {
    try {
      await deleteX(apiEndpoint + `/${Id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting ID:", error);
    }
  };

  const handleFilterChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);
  };

  useEffect(() => {
    const filteredData = data.filter((row) => {
      const fullName = `${row.first_name} ${row.last_name}`.toLowerCase();
      const email = row.email.toLowerCase();
      return fullName.includes(searchText) || email.includes(searchText);
    });
    setData(filteredData);
  }, [searchText]);

  const handleEditModalShow = (data) => {
    setSelectedID(data);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedID(null);
  };

  const validateData = async () => {
    await console.log("validateData");
  };

  const handleSave = async (formData) => {
    if (formData.id === undefined) {
      try {
        const response = await post(apiEndpoint, formData);
        console.log('New ID added:', response.data);
        setShowEditModal(false);
        setSelectedID(null);
        fetchData();
      } catch (error) {
        console.error('Error adding new ID:', error);
      }
    } else {
      try {
        await put(apiEndpoint + `/${selectedID.id}`, formData);
        setShowEditModal(false);
        setSelectedID(null);
        fetchData();
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  return (
    <div className="container-fluid">
      <Form.Group controlId="formFilter">
        <Form.Label>Filter</Form.Label>
        <Form.Control
          type="text"
          value={searchText}
          onChange={handleFilterChange}
        />
      </Form.Group>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="success" onClick={() => handleEditModalShow(null)}>
          <BsPlus size={20} />
          Add
        </Button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              {columns.map((column, index) => (
                !column.hide && <th key={index}>{column.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  !column.hide && (
                    <td key={colIndex}>
                      {column.type === 'checkbox' ? (
                        <input type="checkbox" checked={row[column.field]} disabled />
                      ) : (
                        row[column.field]
                      )}
                    </td>
                  )
                ))}
                <td>
                  <Button variant="dark" onClick={() => handleEditModalShow(row)}>
                    Edit
                  </Button>
                  <Button variant="dark" onClick={() => handleDelete(row.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalComponent
        show={showEditModal}
        onHide={handleEditModalClose}
        fields={columns.filter(column => column.modal)}
        data={selectedID}
        validationCallback={(formData) => validateData(formData)}
        save={handleSave}
      />
    </div>
  );
};

export default TableComponent;
