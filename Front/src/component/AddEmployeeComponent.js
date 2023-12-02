import React, { useState, useEffect } from 'react';
import EmployeeService from '../service/EmployeeService';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddEmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams();

  const employeeData = { firstName, lastName, email, position, dateOfBirth, address, phoneNumber };

  function saveEmployee(e) {
    e.preventDefault();

    if (
      employeeData.firstName !== "" &&
      employeeData.lastName !== "" &&
      employeeData.email !== "" &&
      employeeData.position !== "" &&
      employeeData.dateOfBirth !== "" &&
      employeeData.address !== "" &&
      employeeData.phoneNumber !== ""
    ) {
      if (id) {
        EmployeeService.updateEmployee(id, employeeData)
          .then(() => navigate("/employee"))
          .catch(e => console.log(e));
      } else {
        EmployeeService.saveEmployee(employeeData)
          .then(() => navigate("/employee"))
          .catch(e => console.log(e));
      }
    } else {
      alert("Proszę wypełnić wszystkie pola");
    }
  }

  function getTitle() {
    return id ? "Edytuj pracownika" : "Dodaj pracownika";
  }

  useEffect(() => {
    if (id) {
      EmployeeService.getEmployeeById(id)
        .then(res => {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setEmail(res.data.email);
          setPosition(res.data.position);
          setDateOfBirth(res.data.dateOfBirth);
          setAddress(res.data.address);
          setPhoneNumber(res.data.phoneNumber);
        })
        .catch(e => console.log(e));
    }
  }, [id]);

  return (
    <div>
      <div className='container mt-5'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3'>
            <h2 className='text-center'>{getTitle()}</h2>
            <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                  <input
                    className='form-control'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder='Wprowadź imię'
                  />
                </div>
                <div className='form-group mb-2'>
                  <input
                    className='form-control'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder='Wprowadź nazwisko'
                  />
                </div>
                <div className='form-group mb-2'>
                  <input
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder='Wprowadź adres email'
                  />
                </div>
                <div className='form-group mb-2'>
                  <input
                    className='form-control'
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    type="text"
                    placeholder='Wprowadź stanowisko'
                  />
                </div>
                <div className='form-group mb-2'>
                  <input
                    className='form-control'
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    type="date"
                    placeholder='Wprowadź datę urodzenia'
                  />
                </div>
                <div className='form-group mb-2'>
                  <input
                    className='form-control'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder='Wprowadź adres zamieszkania'
                  />
                </div>
                <div className='form-group mb-2'>
                  <input
                    className='form-control'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="text"
                    placeholder='Wprowadź numer telefonu'
                  />
                </div>

                <button onClick={(e) => saveEmployee(e)} className='btn btn-success'>Zapisz</button>{" "}
                <Link to={"/employee"} className='btn btn-danger' href="">
                  Anuluj
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeComponent;
