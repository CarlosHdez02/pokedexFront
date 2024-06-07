import { useTable } from "react-table";
import dummyData from "../../data/dummyData.json";
import React from "react";
import { CSVLink } from "react-csv";
import classes from "./TrainersTable.module.css";

//CSV columns
const columns = [
  { Header: "ID", accessor: "id" },
  { Header: "First Name", accessor: "name" },
  { Header: "Last Name", accessor: "lastname" },
  { Header: "Phone Number", accessor: "phonenumber" },
  { Header: "Medals", accessor: "medals" },
];

const TrainersTable = () => {
  //Optimization hook
  const data = React.useMemo(() => dummyData, []);

  //React table hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  //Column headers and table data for csv
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
  return (
    <>
      <button className={classes.AddTrainerButton}>Add Trainer</button>
      <button className={classes.DeleteTrainerButton}>Delete Trainer</button>
      <button className={classes.EditTrainerButton}>Edit Trainer</button>

      <div className={classes.table}>
        <CSVLink
          className={classes.downloadbutton}
          filename="trainers.csv"
          data={csvData}
        >
          Export to CSV
        </CSVLink>
        <table {...getTableProps()}>
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
