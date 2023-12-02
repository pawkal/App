import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import EquipmentService from '../service/EquipmentService';
import '../index.css';

const ListEquipmentComponent = () => {
  const [equipmentArray, setEquipmentArray] = useState([]);

  useEffect(() => {
    getAllEquipment();
  }, []);

  function getAllEquipment() {
    EquipmentService.getAllEquipment()
      .then(res => {
        setEquipmentArray(res.data);
        console.log(res);
      })
      .catch(e => console.log(e));
  }

  function deleteEquipment(e, id) {
    e.preventDefault();
    EquipmentService.deleteEquipment(id)
      .then(() => getAllEquipment()) 
      .catch(e => console.log(e));
  }

  return (
    <div className="container">
      <h2 className="text-center mb-4">Lista Sprzętu</h2>
      <Link to="/add-equipment" className="btn btn-primary mb-2 mt-3">
        Dodaj Sprzęt
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
              <th>Nazwa</th>
              <th>Numer Seryjny</th>
              <th>Marka</th>
              <th>Model</th>
              <th>Data Zakupu</th>
              <th>Ilość Sztuk</th> 
              <th>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {equipmentArray.map(equipment => (
              <tr key={equipment.id}>
                <td>{equipment.id}</td>
                <td>{equipment.equipmentName}</td>
                <td>{equipment.serialNumber}</td>
                <td>{equipment.brand}</td>
                <td>{equipment.model}</td>
                <td>{equipment.purchaseDate}</td>
                <td>{equipment.quantity}</td> 
                <td className="action-buttons">
                  <Link to={`/add-equipment/${equipment.id}`} className='btn btn-info'>Edytuj</Link>{" "}
                  <a onClick={(e) => deleteEquipment(e, equipment.id)} className='btn btn-danger'>Usuń</a>
                  <Link to={`/details-equipment/${equipment.id}`} className='btn btn-success'>Szczegóły</Link>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEquipmentComponent;
