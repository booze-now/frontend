import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useApi } from 'contexts/ApiContext';
import Employee from "./Employee";


export default function EmployeeRegister() {
  const navigate = useNavigate();

  function logout() {
    navigate("/");
  }
  return (
    <section>
      <h1>Employee Register</h1>
      <br />
      <Employees />

      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
      </section>
  );
}


function Employees() {
  const [users, setUsers] = useState([]);
  const { get } = useApi();

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    try {
      const response = await get("/employees");
      setUsers(response.data);

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
