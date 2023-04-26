import React, { useState, useRef } from "react";
import styled from "styled-components";
import Axios from "axios";

const Wrapper = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-direction: column;
  width: 25%;
  height: 50%;
  input {
    width: 10rem;
  }
`;

const EmployeeTable = styled.div`
  display: flex;
  border-top: 1px solid black;
  flex-direction: column;
  max-width: 100%;
  overflow: scroll;

  tr {
    width: 100%;
  }
  th {
    text-align: left;
  }
`;

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const dobRef = useRef(null);
  const countryRef = useRef(null);
  const positionRef = useRef(null);
  const salaryRef = useRef(null);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      country: country,
      position: position,
      salary: salary,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          fname: firstName,
          lname: lastName,
          dob: dob,
          country: country,
          position: position,
          salary: salary,
        },
      ]);
      setFirstName("");
      setLastName("");
      setDob("");
      setCountry("");
      setPosition("");
      setSalary("");
      firstNameRef.current.value = "";
      lastNameRef.current.value = "";
      dobRef.current.value = "";
      countryRef.current.value = "";
      positionRef.current.value = "";
      salaryRef.current.value = "";
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <Wrapper>
      <InputWrapper>
        <label>First Name</label>
        <input
          type="text"
          ref={firstNameRef}
          onChange={(ev) => {
            setFirstName(ev.target.value);
          }}
        />
        <label>Last Name</label>
        <input
          type="text"
          ref={lastNameRef}
          onChange={(ev) => {
            setLastName(ev.target.value);
          }}
        />
        <label>DOB</label>
        <input
          type="date"
          ref={dobRef}
          onChange={(ev) => {
            setDob(ev.target.value);
          }}
        />
        <label>Country</label>
        <input
          type="text"
          ref={countryRef}
          onChange={(ev) => {
            setCountry(ev.target.value);
          }}
        />
        <label>Position</label>
        <input
          type="text"
          ref={positionRef}
          onChange={(ev) => {
            setPosition(ev.target.value);
          }}
        />
        <label>Salary</label>
        <input
          type="number"
          ref={salaryRef}
          onChange={(ev) => {
            setSalary(ev.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </InputWrapper>
      <EmployeeTable>
        <button onClick={getEmployees}>Show Employees</button>

        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Country</th>
              <th>Position</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.id}</td>
                  <td>{val.fname}</td>
                  <td>{val.lname}</td>
                  <td>{val.dob.split("T")[0]}</td>
                  <td>{val.country}</td>
                  <td>{val.position}</td>
                  <td>{val.salary}</td>
                  <td>
                    <button
                      onClick={() => {
                        deleteEmployee(val.id);
                      }}
                    >
                      delete
                    </button>
                  </td>
                  <td>
                    <button>edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </EmployeeTable>
    </Wrapper>
  );
}

export default App;
