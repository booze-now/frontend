import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import differenceBy from 'lodash/differenceBy';
import { Add, ArrowDownward, Delete } from "@mui/icons-material";
import { Card, Checkbox, IconButton } from "@mui/material";

/* <Table data={users} selectableRows={selectableRows} expandableRows={expandableRows}  />  */

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
const actions = (
	<IconButton color="primary">
		<Add />
	</IconButton>
);
const contextActions = deleteHandler => (
	<IconButton color="secondary" onClick={deleteHandler}>
		<Delete />
	</IconButton>
);


export default function Table(props) {
  const [records, setRecords] = useState();
  const [pending, setPending] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  console.log(props)
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Middle Name",
      selector: (row) => row.middle_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: false,
      grow: 3,
    },
    {
      name: "Active",
      selector: (row) => String(row.active),
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
  ];
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRecords(props.data);
      setPending(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [props.data]);



  const handleChange = () => {
    setSelectedRows(selectedRows);
  };

  const handleRowClicked = (row) => {
    console.log(`${row.id} was clicked!`);
  };

  const deleteAll = () => {
    const rows = selectedRows.map((r) => r.id);

    if (window.confirm(`Are you sure you want to delete:\r ${rows}?`)) {
      setToggleCleared(!toggleCleared);
      setRecords(differenceBy(records, selectedRows, "id"));
    }
  };

  function handleFilter(event) {
    const newData = props.data.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

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
          <div className="text-end">
            <input type="text" onChange={handleFilter} />
          </div>
        </div>
        <Card>
          <DataTable
            columns={columns}
            data={records}
            defaultSortFieldId={1}
            selectableRows={props.selectableRows}
            defaultSortField="name"
            actions={actions}
            contextActions={contextActions(deleteAll)}
            highlightOnHover
            sortIcon={sortIcon}
            selectableRowsComponent={Checkbox}
            selectableRowsComponentProps={selectProps}
            onSelectedRowsChange={handleChange}
            clearSelectedRows={toggleCleared}
            onRowClicked={handleRowClicked}
            expandableRows={props.expandableRows}
            fixedHeader
            progressPending={pending}
            pagination
          ></DataTable></Card>
      </div>
    </div>
  );
}

