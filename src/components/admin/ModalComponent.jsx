import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ModalComponent = ({
  show,
  onHide,
  fields,
  data,
  validationCallback,
  save,
}) => {
  const [formData, setFormData] = useState({ ...data });
  const [validationError, setValidationError] = useState(null); // Állapot a validációs hiba tárolására

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

const handleSave = () => {
  const isValid = validationCallback(formData); // Paraméterként add át a form adatokat
  if (isValid) {
    console.log("Mentés:", formData);
    save(formData);
    onHide(); // Modal bezárása a mentés után
  } else {
    setValidationError("Érvénytelen adatok");
  }
};

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields.map((field, index) => {
            if (field.field === "id") {
              return null;
            }
            if (field.field === "role_code") {
              return (
                <Form.Group key={index} controlId={field.field}>
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Select
                    name={field.field}
                    value={formData[field.field]}
                    onChange={handleInputChange}
                  >
                    <option value="0">Waiter</option>
                    <option value="1">Bartender</option>
                    <option value="2">Backoffice</option>
                    <option value="3">Admin</option>
                  </Form.Select>
                </Form.Group>
              );
            }
            if (field.type === "checkbox") {
              return (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={field.label}
                  name={field.field}
                  checked={formData[field.field]}
                  onChange={handleInputChange}
                />
              );
            }
            return (
              <Form.Group key={index} controlId={field.field}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  name={field.field}
                  value={formData[field.field]}
                  onChange={handleInputChange}
                />
              </Form.Group>
            );
          })}
        </Form>
        {validationError && <p className="text-danger">{validationError}</p>}{" "}
        {/* Hibajelzés megjelenítése */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
