import { useTable } from "react-table";
import { useDeleteTrainer } from "../../hooks/useDeleteTrainer";
import React from "react";
import { CSVLink } from "react-csv";
import classes from "./TrainersTable.module.css";
import Modal from "../Modal/Modal";
import useFetchTrainers from "../../hooks/useFetchTrainers";
import Loader from "../../UI/Loader/Loader";
import { TrainerInterface } from "../../interfaces/TrainerInterface";

const TrainersTable = () => {
  const { trainers, loading, error } = useFetchTrainers();
  const [data, setData] = React.useState<TrainerInterface[]>(trainers);

  React.useEffect(() => {
    setData(trainers);
  }, [trainers]);

  const [openModal, setOpenModal] = React.useState<{
    open: boolean;
    id: string;
  }>({ open: false, id: "" });
  const { deleteTrainer } = useDeleteTrainer(setData);

  const handleDelete = React.useCallback(
    (_id: string) => {
      deleteTrainer(_id);
    },
    [deleteTrainer]
  );

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "_id" },
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Phone Number", accessor: "phoneNumber" },
      { Header: "Medals", accessor: "medals" },
      {
        Header: "Actions",
        Cell: ({ row }: { row: any }) => (
          <div className={classes.actionsContainer}>
            <button
              className={classes.DeleteTrainerButton}
              onClick={() => handleDelete(row.original._id)}
            >
              Delete
            </button>
            <button
              className={classes.EditTrainerButton}
              onClick={() =>
                setOpenModal({
                  open: true,
                  id: row.original._id,
                })
              }
            >
              Update
            </button>
          </div>
        ),
      },
    ],
    [handleDelete]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const csvData = [
    ["ID", "First Name", "Last Name", "Phone Number", "Medals"],
    ...data.map(({ _id, firstName, lastName, phoneNumber, medals }) => [
      _id,
      firstName,
      lastName,
      phoneNumber,
      medals,
    ]),
  ];

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <>
      <div className={classes.actions}>
        <button
          className={classes.AddTrainerButton}
          onClick={() =>
            setOpenModal({
              open: true,
              id: "",
            })
          }
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

      {openModal.open && (
        <Modal
          setData={setData}
          trainer={trainers.find((el) => el._id === openModal.id)}
          closeModal={() =>
            setOpenModal({
              open: false,
              id: "",
            })
          }
        />
      )}

      <div className={classes.tableContainer}>
        <table {...getTableProps()} className={classes.table}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <th {...column.getHeaderProps()} key={columnIndex}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={rowIndex}>
                  {row.cells.map((cell, cellIndex) => (
                    <td {...cell.getCellProps()} key={cellIndex}>
                      {cell.render("Cell")}
                    </td>
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
