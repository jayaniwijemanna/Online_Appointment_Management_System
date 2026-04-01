package com.example.clinic.controller;

import com.example.clinic.entity.Doctor;
import com.example.clinic.service.DoctorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService service;

    public DoctorController(DoctorService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Doctor> create(@RequestBody Doctor doctor) {
        return ResponseEntity.ok(service.createDoctor(doctor));
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getAll() {
        return ResponseEntity.ok(service.getAllDoctors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getDoctorById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> update(@PathVariable Long id, @RequestBody Doctor doctor) {
        return ResponseEntity.ok(service.updateDoctor(id, doctor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteDoctor(id);
        return ResponseEntity.ok("Doctor deleted");
    }
}
