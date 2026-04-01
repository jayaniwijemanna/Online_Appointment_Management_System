package com.example.clinic.service;

import com.example.clinic.entity.Patient;
import com.example.clinic.exception.ResourceNotFoundException;
import com.example.clinic.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;

    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));
    }

    @Override
    public Patient updatePatient(Long id, Patient patient) {
        Patient existing = getPatientById(id);
        existing.setName(patient.getName());
        existing.setAge(patient.getAge());
        existing.setEmail(patient.getEmail());
        return patientRepository.save(existing);
    }

    @Override
    public void deletePatient(Long id) {
        Patient existing = getPatientById(id);
        patientRepository.delete(existing);
    }
}
