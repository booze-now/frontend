import React, { useState, useEffect } from "react";
import { useApi } from "contexts/ApiContext";
import Employee from "./Employee";
import { Spinner } from "react-bootstrap";

export default function EmployeeRegister() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const { get } = useApi();

  const getUser = async () => {
    try {
      const response = await get("/employees");
      setUsers(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    getUser();
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
      <div className="card mb-4">
        <div className="card-body">
          DataTables is a third party plugin that is used to generate the demo
          table below. For more information about DataTables, please visit the
          <a target="_blank" href="https://datatables.net/">
            official DataTables documentation
          </a>
          .
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1"></i>
          Employees
        </div>
        {isLoading ? (
          <Spinner />
        ) : users?.length ? (
          <Employee data={users} getUser={getUser} />
        ) : (
          <p>No users to display</p>
        )}
      </div>
    </div>
  );
}
