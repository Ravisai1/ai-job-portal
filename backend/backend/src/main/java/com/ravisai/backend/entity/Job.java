package com.ravisai.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
@Entity
@Table(name = "job")
@Data
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;
    private String title;
    private String company;
    private String location;
    private double salary;
    private String description;
    private String createdBy;
    private LocalDateTime createdAt;

}
