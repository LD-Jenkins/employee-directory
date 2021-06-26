import React from "react";

function Table(props) {
  const tableHeaderStyle = {
    cursor: "pointer",
  }

  const iconStyle = {
    marginLeft: "6px",
  }

  const firstHeader = (
    <th 
      scope="col"
      onClick={() => props.sortList("first")}
      style={tableHeaderStyle}
    >
      First
      {
        props.sortKey === "first"
          ? props.sortDir === "A"
            ? <i className="fas fa-sort-up" style={iconStyle}></i>
            : <i className="fas fa-sort-down" style={iconStyle}></i>
          : null
      }
    </th>
  )

  const lastHeader = (
    <th 
      scope="col"
      onClick={() => props.sortList("last")}
      style={tableHeaderStyle}
    >
      Last
      {
        props.sortKey === "last"
          ? props.sortDir === "A"
            ? <i className="fas fa-sort-up" style={iconStyle}></i>
            : <i className="fas fa-sort-down" style={iconStyle}></i>
          : null
      }
    </th>
  )
  return (
    <table className="table">
      <thead>
        <tr>
          {firstHeader}  
          {lastHeader}
          <th scope="col">Phone</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        {props.filteredEmpData.map((emp, idx) => (
          <tr key={`emp_${idx}`}>
            <td>{emp.name.first}</td>
            <td>{emp.name.last}</td>
            <td>{emp.phone}</td>
            <td>{emp.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;