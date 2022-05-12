package com.ness.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(optional=false, fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user", nullable = false)
    private User createdByUser;

    @Column(name="title")
    private String title;

    @Column(name="contact_type")
    private String contactType;

    @Column(name="start_date", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private LocalDateTime startDate;

    @Column(name="end_date", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern="dd/MM/yyyy HH:mm:ss")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime endDate;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name="assigned_to_user", nullable = false)
    private User assignedToUser;

    @Column(name="description")
    private String description;

}
