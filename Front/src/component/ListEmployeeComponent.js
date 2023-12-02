import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import '../index.css';

const ListEmployeeComponent = () => {
  const [employeeArray, setEmployeeArray] = useState([]);

  useEffect(() => {
    getAllEmployee();
  }, []);

  function getAllEmployee() {
    EmployeeService.getAllEmployee()
      .then(res => {
        setEmployeeArray(res.data);
        console.log(res);
      })
      .catch(e => console.log(e));
  }

  function deleteEmployee(e, id) {
    e.preventDefault();
    EmployeeService.deleteEmployee(id)
      .then(() => getAllEmployee())
      .catch(e => console.log(e));
  }

  return (
    <div className="container">
      <h2 className="text-center mb-4">Lista Pracowników</h2>
      <Link to={"/add-employee"} className="btn btn-primary mb-2 mt-3">
        Dodaj Pracownika
      </Link>
      <div className="sidebar">
        <NavLink to="/employee" className="btn btn-primary mb-2" activeClassName="active">
          Lista Pracowników
        </NavLink>
        <NavLink to="/equipment" className="btn btn-primary mb-2" activeClassName="active">
          Lista Sprzętu
        </NavLink>
      </div>
      <div className="content">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Email</th>
              <th>Stanowisko</th>
              <th>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {employeeArray.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td className="action-buttons">
                  <Link to={`/add-employee/${employee.id}`} className='btn btn-info'>Edytuj</Link>{" "}
                  <a onClick={(e) => deleteEmployee(e, employee.id)} className='btn btn-danger'>Usuń</a>
                  <Link to={`/details-employee/${employee.id}`} className='btn btn-success'>Szczegóły</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
