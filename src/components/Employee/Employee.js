import React, { useEffect, useState } from "react";
import "./Employee.css";
import { useNavigate } from "react-router-dom";

const getDataFromLS = () => {
  const data = localStorage.getItem("employeeData");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function Employee() {
  const [storageEmployee, setStorageEmployee] = useState(getDataFromLS());

  const [personnelNo, setPersonnelNo] = useState("");
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const [clickAdd, setClickAdd] = useState(false);
  const [clickEdit, setClickEdit] = useState(false);

  const [personnelNoEdit, setPersonnelNoEdit] = useState("");
  const [fullNameEdit, setFullNameEdit] = useState("");
  const [jobTitleEdit, setJobTitleEdit] = useState("");
  const [genderEdit, setGenderEdit] = useState("");
  const [ageEdit, setAgeEdit] = useState("");

  const [index, setIndex] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);
  const [idSample, setIdSample] = useState("");
  const [error, setError] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  //const history = useNavigate();

  useEffect(() => {
    localStorage.setItem("employeeData", JSON.stringify(storageEmployee));
  }, [storageEmployee]);

  const handlePersonnelNoChange = (e) => {
    const value = e.target.value;
    setPersonnelNo(value);
  };

  const handleEmployeeSubmit = (e) => {
    e.preventDefault();
    let employee = {
      personnelNo,
      fullName,
      jobTitle,
      gender,
      age,
    };
    if (employee.personnelNo > 23 || employee.personnelNo < 1) {
      setErrorModal(true);
      setError("Invalid Personnel No");
    } else if (
      employee.fullName.length < 3 ||
      employee.fullName.length > 24 ||
      typeof employee.fullName == Number
    ) {
      setErrorModal(true);
      setError("Invalid Name");
    } else if (
      employee.jobTitle.length < 3 ||
      employee.jobTitle.length > 24 ||
      typeof employee.jobTitle == Number
    ) {
      setErrorModal(true);
      setError("Invalid Job title");
    } else {
      setStorageEmployee([...storageEmployee, employee]);
      setPersonnelNo("");
      setFullName("");
      setJobTitle("");
      setGender("");
      setAge("");
      setClickAdd(false);
      setError("");
      setErrorModal(false);
    }
  };

  const handleEditEmployeeSubmit = (e) => {
    e.preventDefault();
    let employeeEdit = {
      personnelNo: personnelNoEdit,
      fullName: fullNameEdit,
      jobTitle: jobTitleEdit,
      gender: genderEdit,
      age: ageEdit,
    };

    // setStorageEmployee([...storageEmployee, employeeEdit]);
    const tempEmployeeStorage = [...storageEmployee];
    tempEmployeeStorage.splice(index, 0, employeeEdit);
    setStorageEmployee(tempEmployeeStorage);
    setPersonnelNoEdit("");
    setFullNameEdit("");
    setJobTitleEdit("");
    setGenderEdit("");
    setAgeEdit("");
    console.log(storageEmployee);
    setClickEdit(false);
  };

  const handleEdit = (id) => {
    //employee object to be edited
    const editEmployee = storageEmployee.filter((element, index) => {
      return element.personnelNo === id;
    });

    const index = (function () {
      for (let i = 0; i < storageEmployee.length; i++) {
        if (storageEmployee[i].personnelNo === editEmployee[0].personnelNo) {
          return i;
        }
      }
    })();

    setIndex(index);

    const filteredEmployees = storageEmployee.filter((element, index) => {
      return element.personnelNo !== id;
    });

    //console.log(editEmployee[0]);
    setPersonnelNoEdit(editEmployee[0].personnelNo);
    setFullNameEdit(editEmployee[0].fullName);
    setJobTitleEdit(editEmployee[0].jobTitle);
    setGenderEdit(editEmployee[0].gender);
    setAgeEdit(editEmployee[0].age);
    //console.log(personnelNoEdit);
    setClickEdit(true);
    setClickAdd(false);
    // history("/");
    setStorageEmployee(filteredEmployees);
  };

  const handleDelete = (id) => {
    setDeleteModal(true);
    setIdSample(id);
  };

  const handlePermission = (x) => {
    const filteredEmployees = storageEmployee.filter((element, index) => {
      return element.personnelNo !== idSample;
    });
    setStorageEmployee(filteredEmployees);
    setDeleteModal(false);
  };

  const handleDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleDeleteAll = () => {
    setStorageEmployee([]);
  };

  // const handleGenderBlur = () => {
  //       alert("hello");
  // }

  return (
    <div>
      {errorModal && (
        <div className="errorModal">
          <h3 style={{ textAlign: "center", margin: "auto", width: "100%" }}>
            {error}
          </h3>
        </div>
      )}
      {deleteModal && (
        <div className="overlayDeleteModal">
          <div className="deleteModal">
            <p>Do you want to delete this row ?</p>
            <div className="deleteModalBtns">
              <button
                className="btnEmployee"
                onClick={() => handlePermission(true)}
              >
                Yes
              </button>
              <button
                className="btnEmployee"
                onClick={() => handleDeleteModal()}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {storageEmployee.length &&
        !clickEdit &&
        storageEmployee.map((item) => {
          return (
            <div className="employee" key={item.personnelNo}>
              <div className="employeeSub">
                <div className="employeeDetails">
                  <p className="personnelNo">{item.personnelNo}</p>
                  <p className="fullName">{item.fullName}</p>
                  <p className="jobTitle">{item.jobTitle}</p>
                  <p className="gender">{item.gender}</p>
                  <p className="age">{item.age}</p>
                </div>
                <button
                  className="edit btnEmployee"
                  onClick={() => handleEdit(item.personnelNo)}
                >
                  Edit
                </button>
                <button
                  className="delete btnEmployee"
                  onClick={() => handleDelete(item.personnelNo)}
                >
                  Delete
                </button>
              </div>
              <hr />
            </div>
          );
        })}
      {clickAdd && (
        <div className="form-container">
          <form
            autoComplete="off"
            className="form-group"
            onSubmit={handleEmployeeSubmit}
          >
            <input
              type="number"
              className="form-control personnelNo"
              required
              minLength="1"
              maxLength="20"
              value={personnelNo}
              onChange={(e) => handlePersonnelNoChange(e)}
            />

            <input
              type="text"
              className="form-control fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              className="form-control jobTitle"
              required
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <input
              type="text"
              className="form-control gender"
              required
              value={gender}
              // onBlur={handleGenderBlur}
              onChange={(e) => setGender(e.target.value)}
            />
            <input
              type="number"
              className="form-control age"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <button type="submit" className="btnEmployee submitBtn">
              Submit
            </button>
            <hr />
          </form>
        </div>
      )}

      {clickEdit && (
        <>
          {storageEmployee.slice(0, index).map((item) => {
            return (
              <div className="employee" key={item.personnelNo}>
                <div className="employeeSub">
                  <div className="employeeDetails">
                    <p className="personnelNo">{item.personnelNo}</p>
                    <p className="fullName">{item.fullName}</p>
                    <p className="jobTitle">{item.jobTitle}</p>
                    <p className="gender">{item.gender}</p>
                    <p className="age">{item.age}</p>
                  </div>
                  <button
                    className="edit btnEmployee"
                    onClick={() => handleEdit(item.personnelNo)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete btnEmployee"
                    onClick={() => handleDelete(item.personnelNo)}
                  >
                    Delete
                  </button>
                </div>
                <hr />
              </div>
            );
          })}
          <div className="form-container">
            <form
              autoComplete="off"
              className="form-group"
              onSubmit={handleEditEmployeeSubmit}
            >
              <input
                type="text"
                className="form-control personnelNo"
                required
                value={personnelNoEdit}
                onChange={(e) => setPersonnelNoEdit(e.target.value)}
              />
              <input
                type="text"
                className="form-control fullName"
                required
                value={fullNameEdit}
                onChange={(e) => setFullNameEdit(e.target.value)}
              />
              <input
                type="text"
                className="form-control jobTitle"
                required
                value={jobTitleEdit}
                onChange={(e) => setJobTitleEdit(e.target.value)}
              />

              <input
                type="text"
                className="form-control gender"
                required
                value={genderEdit}
                onChange={(e) => setGenderEdit(e.target.value)}
              />
              <input
                type="text"
                className="form-control age"
                required
                value={ageEdit}
                onChange={(e) => setAgeEdit(e.target.value)}
              />
              <button type="submit" className="btnEmployee submitBtn">
                Save
              </button>
              <hr />
            </form>
          </div>
          {storageEmployee.slice(index, storageEmployee.length).map((item) => {
            return (
              <div className="employee" key={item.personnelNo}>
                <div className="employeeSub">
                  <div className="employeeDetails">
                    <p className="personnelNo">{item.personnelNo}</p>
                    <p className="fullName">{item.fullName}</p>
                    <p className="jobTitle">{item.jobTitle}</p>
                    <p className="gender">{item.gender}</p>
                    <p className="age">{item.age}</p>
                  </div>
                  <button
                    className="edit btnEmployee"
                    onClick={() => handleEdit(item.personnelNo)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete btnEmployee"
                    onClick={() => handleDelete(item.personnelNo)}
                  >
                    Delete
                  </button>
                </div>
                <hr />
              </div>
            );
          })}
        </>
      )}

      <button className="addButton addRowBtn" onClick={() => setClickAdd(true)}>
        Add
      </button>
      <button
        className="btnEmployee deleteAll"
        onClick={() => handleDeleteAll()}
      >
        Delete All
      </button>
    </div>
  );
}

export default Employee;
