package com.example.clinic.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String specialization;

    @Column(nullable = false, unique = true)
    private String email;

    public Doctor() {}

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getSpecialization() { return specialization; }
    public String getEmail() { return email; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    public void setEmail(String email) { this.email = email; }
}
