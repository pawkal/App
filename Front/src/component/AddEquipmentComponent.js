import React, { useState, useEffect } from 'react';
import EquipmentService from '../service/EquipmentService';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddEquipmentComponent = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [quantity, setQuantity] = useState(1); 
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [serialNumbers, setSerialNumbers] = useState([]); 

  const navigate = useNavigate();
  const { id } = useParams();

  const equipmentData = { equipmentName, quantity, brand, model, purchaseDate, employeeId, serialNumbers };

  function saveEquipment(e) {
    e.preventDefault();

    if (
      equipmentData.equipmentName !== "" &&
      equipmentData.brand !== "" &&
      equipmentData.model !== "" &&
      equipmentData.purchaseDate !== ""
    ) {
      if (id) {
        EquipmentService.updateEquipment(id, equipmentData)
          .then(() => navigate("/equipment"))
          .catch(e => console.log(e));
      } else {
       
        const newSerialNumbers = Array.from({ length: quantity }, (_, index) => ({
          serialNumber: `SN-${index + 1}`,
        }));

       
        setSerialNumbers(newSerialNumbers);

        
        EquipmentService.saveEquipment({ ...equipmentData, serialNumbers: newSerialNumbers })
          .then(() => navigate("/equipment"))
          .catch(e => console.log(e));
      }
    } else {
      alert("Proszę wypełnić wszystkie pola");
    }
  }

  function getTitle() {
    return id ? "Edytuj Sprzęt" : "Dodaj Sprzęt";
  }

  useEffect(() => {
    if (id) {
      EquipmentService.getEquipmentById(id)
        .then(res => {
          setEquipmentName(res.data.equipmentName);
          setBrand(res.data.brand);
          setModel(res.data.model);
          setPurchaseDate(res.data.purchaseDate);
          setEmployeeId(res.data.employeeId);
          setQuantity(res.data.quantity || 1); 
          setSerialNumbers(res.data.serialNumbers || []); 
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
                    value={equipmentName}
                    onChange={(e) => setEquipmentName(e.target.value)}
                    type="text"
                    placeholder='Wprowadź nazwę sprzętu'
                  />
                </div>
                <div className='form-group mb-2'>
                  <label>Ilość Sztuk:</label>
                  <input
                    className='form-control'
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 0)}
                    type="text"
                    placeholder='Wprowadź ilość sztuk'
                  />
                </div>
                <div className='form-group mb-2'>
                  <input
                    className='form-control'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    type="text"
                    placeholder='Wprowadź markę'
                  />
                </div>
                <div className='form-group mb-2'>
                  <input
                    className='form-control'
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    type="text"
                    placeholder='Wprowadź model'
                  />
                </div>
                <div className='form-group mb-2'>
                  <input
                    className='form-control'
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    type="date"
                    placeholder='Wprowadź datę zakupu'
                  />
                </div>
                <div className='form-group mb-2'>
                  <input
                    className='form-control'
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    type="text"
                    placeholder='Wprowadź ID Pracownika'
                  />
                </div>

                <button onClick={(e) => saveEquipment(e)} className='btn btn-success'>Zapisz</button>{" "}
                <Link to={"/equipment"} className='btn btn-danger' href="">
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

export default AddEquipmentComponent;
