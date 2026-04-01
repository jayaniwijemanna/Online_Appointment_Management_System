package com.example.clinic.service;

import com.example.clinic.entity.Appointment;

import java.util.List;

public interface AppointmentService {

    Appointment create(Appointment appointment);

    List<Appointment> getAll();

    Appointment getById(Long id);

    Appointment update(Long id, Appointment appointment);

    void delete(Long id);
}
