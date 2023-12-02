package com.example.corpapp.service;

import com.example.corpapp.model.Equipment;
import com.example.corpapp.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    public Equipment saveEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    public Optional<Equipment> getEquipmentById(int id) {
        return equipmentRepository.findById(id);
    }

    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    public Equipment updateEquipment(int id, Equipment equipment) {
        Equipment equipmentUpdate = equipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipment not found with id: " + id));
        equipmentUpdate.setEquipmentName(equipment.getEquipmentName());
        equipmentUpdate.setSerialNumber(equipment.getSerialNumber());
        equipmentUpdate.setBrand(equipment.getBrand());
        equipmentUpdate.setModel(equipment.getModel());
        equipmentUpdate.setDate(equipment.getDate());
        equipmentUpdate.setQuantity(equipment.getQuantity());
        return equipmentRepository.save(equipmentUpdate);
    }

    public void deleteEquipment(int id) {
        equipmentRepository.deleteById(id);
    }


}

