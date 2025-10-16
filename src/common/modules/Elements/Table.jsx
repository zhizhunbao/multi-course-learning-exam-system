import React from "react";
import "./Table.css";

const Table = ({
  data = [],
  columns = [],
  loading = false,
  emptyMessage = "No data available",
  className = "",
  striped = false,
  hoverable = false,
  bordered = false,
  ...props
}) => {
  const tableClasses = [
    "table",
    striped ? "table-striped" : "",
    hoverable ? "table-hoverable" : "",
    bordered ? "table-bordered" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (loading) {
    return (
      <div className="table-loading">
        <div className="table-spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="table-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className={tableClasses} {...props}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="table-header">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="table-row">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="table-cell">
                  {column.render
                    ? column.render(row[column.key], row, rowIndex)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
