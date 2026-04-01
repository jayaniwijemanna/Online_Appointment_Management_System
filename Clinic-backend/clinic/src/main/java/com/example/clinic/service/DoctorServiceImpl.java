package com.example.clinic.service;

import com.example.clinic.entity.Doctor;
import com.example.clinic.exception.ResourceNotFoundException;
import com.example.clinic.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository repo;

    public DoctorServiceImpl(DoctorRepository repo) {
        this.repo = repo;
    }

    @Override
    public Doctor createDoctor(Doctor doctor) {
        return repo.save(doctor);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return repo.findAll();
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + id));
    }

    @Override
    public Doctor updateDoctor(Long id, Doctor doctor) {
        Doctor existing = getDoctorById(id);
        existing.setName(doctor.getName());
        existing.setSpecialization(doctor.getSpecialization());
        existing.setEmail(doctor.getEmail());
        return repo.save(existing);
    }

    @Override
    public void deleteDoctor(Long id) {
        Doctor existing = getDoctorById(id);
        repo.delete(existing);
    }
}
