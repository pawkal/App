package com.example.corpapp.service;

import com.example.corpapp.model.Equipment;

import java.util.List;
import java.util.Optional;

public interface EquipmentServiceInterface {
    Equipment saveEquipment(Equipment equipment);
    Optional<Equipment> getEquipmentById(int id);
    List<Equipment> getAllEquipment();
    Equipment updateEquipment(int id, Equipment equipment);
    void deleteEquipment(int id);
    int getEquipmentQuantityInStockByCategory(String category);
}
