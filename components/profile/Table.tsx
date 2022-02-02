import React, { useMemo } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { Box } from "@material-ui/core";
import { GlobalFilter } from "./GlobalFilter";
import { Checkbox } from "./Checkbox";

export default function AdminTable({ TableData, COLUMNS }) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => TableData, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setPageSize,
    selectedFlatRows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;

  const handleDelete = async () => {
    const values = selectedFlatRows.map((row) => row.original);

    try {
      const res = await fetch("/api/student", {
        method: "DELETE",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        console.log(data.errors);
      } else {
        // location.assign("/");
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
        <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[10, 20, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>

      <Box display="flex" justifyContent="center">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </Box>
      
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  style={{ fontWeight: 700 }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
        {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>


      <div>
        <span >
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
      <div >
        {/* <button onClick={handleDelete}>Promote</button> */}
        {/* <button onClick={handleDelete}>Demote</button> */}
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

