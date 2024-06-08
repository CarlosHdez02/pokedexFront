import { useTable } from "react-table";
import dummyData from "../../data/dummyData.json";
import React from "react";
import { CSVLink } from "react-csv";
import classes from "./TrainersTable.module.css";
import Modal from "../Modal/Modal";

const TrainersTable = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "First Name", accessor: "name" },
      { Header: "Last Name", accessor: "lastname" },
      { Header: "Phone Number", accessor: "phonenumber" },
      { Header: "Medals", accessor: "medals" },
      {
        Header: "Actions",
        Cell: ({ row }: { row: any }) => (
          <div className={classes.actionsContainer}>
            <button
              className={classes.DeleteTrainerButton}
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </button>
            <button
              className={classes.EditTrainerButton}
              onClick={() => setOpenModal(true)}
            >
              Update
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => dummyData, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const csvData = [
    ["ID", "Name", "Last Name", "Phone Number", "Medals"],
    ...data.map(({ id, name, lastname, phonenumber, medals }) => [
      id,
      name,
      lastname,
      phonenumber,
      medals,
    ]),
  ];

  const handleDelete = (id: number) => {
    console.log(`Delete trainer with id: ${id}`);
    // Implement the delete functionality here
  };

  return (
    <>
      <div className={classes.actions}>
        <button
          className={classes.AddTrainerButton}
          onClick={() => setOpenModal(true)}
        >
          Add Trainer
        </button>
        <CSVLink
          className={classes.downloadbutton}
          filename="trainers.csv"
          data={csvData}
        >
          Export to CSV
        </CSVLink>
      </div>

      {openModal && <Modal closeModal={() => setOpenModal(false)} />}

      <div className={classes.tableContainer}>
        <table {...getTableProps()} className={classes.table}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TrainersTable;
