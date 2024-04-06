import React, { useState, useEffect } from "react";
import { useConfig } from "contexts/ConfigContext";
import { useTranslation } from "contexts/TranslationContext";
import { useApi } from "contexts/ApiContext";
import TableComponent from "./TableComponent";
import { Spinner } from "react-bootstrap";

export default function Drinks() {
  const [isLoading, setIsLoading] = useState(true);
  const { __ } = useTranslation();
  const { realm } = useConfig();
  const [drinks, setDrinks] = useState([]);
  const { get } = useApi();
  const columns = [
    { label: "ID", type: "text", field: "id", hide: false, modal: true },

    {
      label: "Name",
      type: "text",
      field: "name",
      hide: false,
      modal: true,
    },
    {
      label: "Category",
      type: "text",
      field: "category_id",
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
  const apiEndpoint = "/drinks";

  const getDrinks = async () => {
    try {
      const response = await get(apiEndpoint);
      setDrinks(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDrinks();
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
        ) : drinks?.length ? (
          /* <Employee data={users} getDrinks={getDrinks} /> */
          <TableComponent columns={columns} apiEndpoint={apiEndpoint} />
        ) : (
          <p>No users to display</p>
        )}
      </div>
    </div>
  );
}
