import { useState, useEffect } from "react";
import axiosService from "../../models/axiosService.js";
import DataTable from "datatables.net-dt";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import $ from 'jquery';
import Employee from "./Employee.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axiosService.get("/employees");
      setUsers(response.data);
      console.log(response.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article>
      <h2>Users list</h2>
      {users?.length ? (
        <Employee data={users} getUser={getUser} />
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
}

