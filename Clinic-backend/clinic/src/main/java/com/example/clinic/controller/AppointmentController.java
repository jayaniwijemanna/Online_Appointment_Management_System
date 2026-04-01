package com.example.clinic.controller;

import com.example.clinic.entity.Appointment;
import com.example.clinic.service.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService service;

    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public Appointment create(@RequestBody Appointment appointment) {
        return service.create(appointment);
    }

    // READ ALL
    @GetMapping
    public List<Appointment> getAll() {
        return service.getAll();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Appointment getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Appointment update(@PathVariable Long id,
                              @RequestBody Appointment appointment) {

        return service.update(id, appointment);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
