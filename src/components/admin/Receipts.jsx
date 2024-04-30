import React, { useState, useEffect } from "react";
import { useApi } from "contexts/ApiContext";
import { Spinner } from "react-bootstrap";
import TableComponent from "./TableComponent";

export default function Receipts() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
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
    { label: "Email", type: "email", field: "email", hide: false, modal: true },
    {
      label: "Active",
      type: "checkbox",
      field: "active",
      hide: false,
      modal: true,
    },
  ];
  const apiEndpoint = "/employees";
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
        ) : users?.length ? (
          /* <Employee data={users} getUser={getUser} /> */
          <TableComponent columns={columns} apiEndpoint={apiEndpoint} />
        ) : (
          <p>No users to display</p>
        )}
      </div>
    </div>
  );
}
