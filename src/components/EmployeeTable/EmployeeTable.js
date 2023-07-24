import React from "react";
import "./EmployeeTable.css";
import Employee from "../Employee/Employee";

function EmployeeTable() {
  return (
    <div className="employeeTable">
      <div className="description">
        <h3 className="personnelNo">Personnel No.</h3>
        <h3>Full Name</h3>
        <h3>Job title</h3>
        <h3>Gender</h3>
        <h3>Age</h3>
      </div>
      <Employee />
    </div>
  );
}

export default EmployeeTable;
