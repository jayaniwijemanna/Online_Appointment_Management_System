package com.example.clinic.service;

import com.example.clinic.entity.Doctor;
import java.util.List;

public interface DoctorService {
    Doctor createDoctor(Doctor doctor);
    List<Doctor> getAllDoctors();
    Doctor getDoctorById(Long id);
    Doctor updateDoctor(Long id, Doctor doctor);
    void deleteDoctor(Long id);
}
