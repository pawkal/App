import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeService from '../service/EmployeeService';
import EquipmentService from '../service/EquipmentService';

const DetailsEquipmentComponent = () => {
  const { id } = useParams();
  const [equipment, setEquipment] = useState({});

  useEffect(() => {
    loadEquipmentDetails();
  }, [id]);

  const loadEquipmentDetails = () => {
    EquipmentService.getEquipmentById(id)
      .then((res) => setEquipment(res.data))
      .catch((e) => console.log(e));
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Szczegóły Sprzętu</h2>
      <Link to="/equipment" className="btn btn-primary mb-2">
        Wróć do listy sprzętu
      </Link>
      <ListGroup>
        <ListGroup.Item>
          <strong>ID Sprzętu:</strong> {equipment.id}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Nazwa Sprzętu:</strong> {equipment.equipmentName}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Liczba Sztuk:</strong> {equipment.quantity}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Numer Seryjny:</strong>{' '}
          {equipment.serialNumbers && equipment.serialNumbers.map((serial) => serial.serialNumber).join(', ')}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Marka:</strong> {equipment.brand}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Model:</strong> {equipment.model}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Data Zakupu:</strong> {equipment.purchaseDate}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>ID Pracownika:</strong> {equipment.employeeId}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default DetailsEquipmentComponent;
