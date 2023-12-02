package com.example.corpapp.controller;

import com.example.corpapp.model.Equipment;
import com.example.corpapp.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/equipment")
@CrossOrigin("*")
public class EquipmentController {

    @Autowired
    private EquipmentService equipmentService;

    @PostMapping
    public Equipment saveEquipment(@RequestBody Equipment equipment){
        return  equipmentService.saveEquipment(equipment);
    }

    @GetMapping
    public List<Equipment> getAllEquipment(){
        return equipmentService.getAllEquipment();
    }

    @GetMapping("/{id}")
    public Optional<Equipment> getEquipmentById(@PathVariable int id){
        return equipmentService.getEquipmentById(id);
    }

    @PutMapping("/{id}")
    public Equipment updateEquipment(@PathVariable int id, @RequestBody Equipment equipment){
        return equipmentService.updateEquipment(id, equipment);
    }

    @DeleteMapping("/{id}")
    public void deleteEquipment(@PathVariable int id){
        equipmentService.deleteEquipment(id);
    }


}
