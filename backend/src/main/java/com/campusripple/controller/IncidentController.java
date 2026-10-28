package com.campusripple.controller;

import com.campusripple.model.Incident;
import com.campusripple.model.IncidentCategory;
import com.campusripple.model.IncidentStatus;
import com.campusripple.model.SeverityLevel;
import com.campusripple.repository.IncidentRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = "*")
public class IncidentController {

    @Autowired
    private IncidentRepository incidentRepository;

    @PostConstruct
    public void initData() {
        if (incidentRepository.count() == 0) {
            incidentRepository.save(Incident.builder()
                    .incidentCode("INC-2026-891")
                    .title("Wi-Fi Access Point Failure — Block A")
                    .category(IncidentCategory.NETWORK)
                    .description("Core 5GHz dual-band wireless router dropped connectivity during CS lab session.")
                    .building("Block A")
                    .locationName("Block A - Academic Wing")
                    .room("Lab 302")
                    .reportedBy("Pravin D.")
                    .severity(SeverityLevel.HIGH)
                    .status(IncidentStatus.INVESTIGATING)
                    .affectedUsersCount(142)
                    .affectedLocationsCount(3)
                    .impactLevelPercentage(78.0)
                    .reportedAt(LocalDateTime.now().minusHours(2))
                    .updatedAt(LocalDateTime.now().minusHours(1))
                    .build());

            incidentRepository.save(Incident.builder()
                    .incidentCode("INC-2026-892")
                    .title("Central Projector Power Fluctuation — Seminar Hall")
                    .category(IncidentCategory.HARDWARE)
                    .description("Laser ceiling projector intermittently powering off during faculty lecture.")
                    .building("Block B")
                    .locationName("Seminar Hall 2")
                    .room("Auditorium B")
                    .reportedBy("Faculty Dean")
                    .severity(SeverityLevel.MEDIUM)
                    .status(IncidentStatus.IN_PROGRESS)
                    .affectedUsersCount(60)
                    .affectedLocationsCount(1)
                    .impactLevelPercentage(45.0)
                    .reportedAt(LocalDateTime.now().minusHours(4))
                    .updatedAt(LocalDateTime.now().minusHours(2))
                    .build());

            incidentRepository.save(Incident.builder()
                    .incidentCode("INC-2026-890")
                    .title("Hostel B Water Cooler Filter Replaced")
                    .category(IncidentCategory.UTILITY)
                    .description("Routine water purification filter replacement and flow calibration complete.")
                    .building("Hostel B")
                    .locationName("Hostel B - Ground Floor")
                    .room("Mess Wing")
                    .reportedBy("Hostel Warden")
                    .severity(SeverityLevel.LOW)
                    .status(IncidentStatus.RESOLVED)
                    .affectedUsersCount(85)
                    .affectedLocationsCount(1)
                    .impactLevelPercentage(20.0)
                    .resolutionSummary("Installed new high-flow ceramic filter cartridge.")
                    .reportedAt(LocalDateTime.now().minusDays(1))
                    .updatedAt(LocalDateTime.now().minusHours(6))
                    .build());
        }
    }

    @GetMapping
    public ResponseEntity<List<Incident>> getAllIncidents() {
        return ResponseEntity.ok(incidentRepository.findAllByOrderByReportedAtDesc());
    }

    @PostMapping
    public ResponseEntity<Incident> createIncident(@RequestBody Incident incident) {
        if (incident.getIncidentCode() == null || incident.getIncidentCode().isEmpty()) {
            incident.setIncidentCode("INC-2026-" + (890 + incidentRepository.count() + 1));
        }
        if (incident.getReportedAt() == null) {
            incident.setReportedAt(LocalDateTime.now());
        }
        incident.setUpdatedAt(LocalDateTime.now());
        if (incident.getStatus() == null) {
            incident.setStatus(IncidentStatus.REPORTED);
        }
        Incident saved = incidentRepository.save(incident);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Incident> updateStatus(@PathVariable Long id, @RequestParam IncidentStatus status) {
        return incidentRepository.findById(id)
                .map(i -> {
                    i.setStatus(status);
                    i.setUpdatedAt(LocalDateTime.now());
                    Incident updated = incidentRepository.save(i);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
