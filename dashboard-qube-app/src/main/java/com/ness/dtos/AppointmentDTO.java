package com.ness.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class AppointmentDTO {
    private String createdByUser;
    private String title;
    private String contactType;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime endDate;
    private String assignedToUser;
    private String description;
}
