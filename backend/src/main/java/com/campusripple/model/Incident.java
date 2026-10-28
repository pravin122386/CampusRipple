package com.campusripple.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "incidents")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Incident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String incidentCode; // e.g. INC-2026-891

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    private IncidentCategory category;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private String locationName;

    @Column(nullable = false)
    private String building;

    private String room;

    @Enumerated(EnumType.STRING)
    private SeverityLevel severity;

    @Enumerated(EnumType.STRING)
    private IncidentStatus status;

    private String reportedBy;
    private String reportedById;

    private LocalDateTime reportedAt;
    private LocalDateTime updatedAt;

    private String assignedTechnician;
    private Integer affectedUsersCount;
    private Integer affectedLocationsCount;
    private Double impactLevelPercentage;

    @Column(length = 1000)
    private String resolutionSummary;
}
