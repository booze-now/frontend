import React, { useState, useEffect } from "react";
import { useApi } from "contexts/ApiContext";
import { Spinner } from "react-bootstrap";
import TableComponent from "./TableComponent";
export default function Guests() {
  const [isLoading, setIsLoading] = useState(true);
  const [guests, setGuests] = useState([]);
  const { get } = useApi();
  const columns = [
    { label: "ID", type: "text", field: "id", hide: false, modal: true },
    {
      label: "First Name",
      type: "text",
      field: "first_name",
      hide: false,
      modal: true,
    },
    {
      label: "Middle Name",
      type: "text",
      field: "middle_name",
      hide: false,
      modal: true,
    },
    {
      label: "Last Name",
      type: "text",
      field: "last_name",
      hide: false,
      modal: true,
    },
    {
      label: "Table",
      type: "number",
      field: "table",
      hide: false,
      modal: true,
    },
    {
      label: "Reservee",
      type: "checkbox",
      field: "reservee",
      hide: false,
      modal: true,
    },
    {
      label: "Picture",
      type: "text",
      field: "picture",
      hide: false,
      modal: true,
    },
    {
      label: "Active",
      type: "checkbox",
      field: "active",
      hide: false,
      modal: true,
    },
    {
      label: "Created at",
      type: "date",
      field: "created_at",
      hide: true,
      modal: false,
    },
  ];
  const apiEndpoint = "/guests";
  const getGuests = async () => {
    try {
      const response = await get(apiEndpoint);
      setGuests(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGuests();
  }, []);
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Employee Registration</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <a href="index.html">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">Employees</li>
      </ol>
      <div className="card mb-4"></div>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1"></i>
          Employees
        </div>
        {isLoading ? (
          <Spinner />
        ) : guests?.length ? (
          /* <Employee data={users} getGuests={getGuests} /> */
          <TableComponent columns={columns} apiEndpoint={apiEndpoint} />
        ) : (
          <p>No users to display</p>
        )}
      </div>
    </div>
  );
}
