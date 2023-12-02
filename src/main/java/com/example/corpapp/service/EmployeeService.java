package com.example.corpapp.service;

import com.example.corpapp.model.Employee;
import com.example.corpapp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService implements EmployeeServiceInterface {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Optional<Employee> getEmployeeById(int id) {
        return employeeRepository.findById(id);
    }

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee updateEmployee(int id, Employee employee) {
        Employee employeeUpdate = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        employeeUpdate.setFirstName(employee.getFirstName());
        employeeUpdate.setLastName(employee.getLastName());
        employeeUpdate.setEmail(employee.getEmail());
        employeeUpdate.setPosition(employee.getPosition());
        employeeUpdate.setDateOfBirth(employee.getDateOfBirth());
        employeeUpdate.setAddress(employee.getAddress());
        employeeUpdate.setPhoneNumber(employee.getPhoneNumber());
        return employeeRepository.save(employeeUpdate);
    }

    @Override
    public void deleteEmployee(int id) {
        employeeRepository.deleteById(id);
    }
}
