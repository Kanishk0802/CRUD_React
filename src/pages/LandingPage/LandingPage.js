import React from "react";
import "./LandingPage.css";
import EmployeeTable from "../../components/EmployeeTable/EmployeeTable";
import Header from "../../components/Header/Header";

function LandingPage() {
  return (
    <div>
      <Header />
      <EmployeeTable />
    </div>
  );
}

export default LandingPage;
