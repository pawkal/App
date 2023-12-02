import axios from "axios";

const BASE_URL = "http://localhost:8080/equipment";

class EquipmentService {
  getAllEquipment() {
    return axios.get(BASE_URL);
  }

  saveEquipment(equipmentData) {
    return axios.post(BASE_URL, equipmentData);
  }

  updateEquipment(id, equipmentData) {
    return axios.put(`${BASE_URL}/${id}`, equipmentData);
  }

  getEquipmentById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  deleteEquipment(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }
  
}

export default new EquipmentService();
