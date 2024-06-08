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

  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const { deleteTrainer } = useDeleteTrainer(setData);

  const handleDelete = React.useCallback((id: number) => {
    deleteTrainer(id);
  }, [deleteTrainer]);

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
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
    [handleDelete]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const csvData = [
    ["ID", "First Name", "Last Name", "Phone Number", "Medals"],
    ...data.map(({ id, name, lastName, phoneNumber, medals }) => [
      id,
      name,
      lastName,
      phoneNumber,
      medals,
    ]),
  ];

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }

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
