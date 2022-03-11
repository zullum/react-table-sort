import React, { useEffect } from "react";
import { useState } from "react";
import mockdata from "../data.json";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://gist.githubusercontent.com/zullum/5850b341782f16c86204eae86a4aa694/raw/d622e19536e90b0b9cafe37688c0a2a4b1c56271/fakejson"
      );
      setTableData(await response.json());
      console.log("fetch data");
    };
    fetchData();
  }, []);

  const columns = [
    { label: "Full Name", accessor: "full_name", sortable: true },
    { label: "Email", accessor: "email", sortable: false },
    { label: "Gender", accessor: "gender", sortable: true },
    { label: "Age", accessor: "age", sortable: true },
    { label: "Start date", accessor: "start_date", sortable: true },
  ];

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  return (
    <>
      <table className="table">
        <caption>
          Developers currently enrolled in this course, column headers are
          sortable.
        </caption>
        {/* <TableHead columns={columns} handleSorting={handleSorting} /> */}
        {/* <TableBody columns={columns} tableData={tableData} /> */}
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, tableData }} />
      </table>
    </>
  );
};

export default Table;
