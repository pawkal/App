import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeService from '../service/EmployeeService';
import EquipmentService from '../service/EquipmentService';

const DetailsEmployeeComponent = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [equipment, setEquipment] = useState({});

  useEffect(() => {
    loadEmployeeDetails();
  }, [id]);

  const loadEmployeeDetails = () => {
    EmployeeService.getEmployeeById(id)
      .then((res) => {
        setEmployee(res.data);
        if (res.data.equipmentList && res.data.equipmentList.length > 0) {
          loadEquipmentDetails(res.data.equipmentList[0].id);
        }
      })
      .catch((e) => console.log(e));
  };

  const loadEquipmentDetails = (equipmentId) => {
    EquipmentService.getEquipmentById(equipmentId)
      .then((res) => setEquipment(res.data))
      .catch((e) => console.log(e));
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Szczegóły Pracownika</h2>
      <Link to="/employee" className="btn btn-primary mb-2">
        Wróć do listy pracowników
      </Link>
      <ListGroup>
        <ListGroup.Item>
          <strong>ID:</strong> {employee.id}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Imię:</strong> {employee.firstName}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Nazwisko:</strong> {employee.lastName}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Email:</strong> {employee.email}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Stanowisko:</strong> {employee.position}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Data Urodzenia:</strong> {employee.dateOfBirth}
        </ListGroup.Item>
      </ListGroup>
      <hr />
      <h3>Sprzęt przypisany do pracownika</h3>
      <ListGroup>
      <ListGroup.Item>
          <strong>ID Sprzętu:</strong> {equipment.id}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Nazwa Sprzętu:</strong> {equipment.equipmentName}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Numer Seryjny:</strong> {equipment.serialNumber}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Marka:</strong> {equipment.brand}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Model:</strong> {equipment.model}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default DetailsEmployeeComponent;
