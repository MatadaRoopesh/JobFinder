package com.roopesh.jobfinder.dto;
import com.roopesh.jobfinder.model.ApplicationStatus;
public record StatusRequest(ApplicationStatus status,String notes) {}
