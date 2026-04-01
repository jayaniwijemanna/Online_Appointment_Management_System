package com.example.clinic.service;

import com.example.clinic.entity.Appointment;
import com.example.clinic.exception.ResourceNotFoundException;
import com.example.clinic.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository repository;

    public AppointmentServiceImpl(AppointmentRepository repository) {
        this.repository = repository;
    }

    @Override
    public Appointment create(Appointment appointment) {
        return repository.save(appointment);
    }

    @Override
    public List<Appointment> getAll() {
        return repository.findAll();
    }

    @Override
    public Appointment getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Appointment not found with id " + id));
    }

    @Override
    public Appointment update(Long id, Appointment updated) {

        Appointment existing = getById(id);

        existing.setPatientId(updated.getPatientId());
        existing.setDoctorId(updated.getDoctorId());
        existing.setDate(updated.getDate());
        existing.setTime(updated.getTime());
        existing.setStatus(updated.getStatus());

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {

        Appointment appointment = getById(id);

        repository.delete(appointment);
    }
}
