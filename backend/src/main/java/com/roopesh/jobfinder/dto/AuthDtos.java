package com.roopesh.jobfinder.dto;

public final class AuthDtos {

    private AuthDtos() {
    }

    public record RegisterRequest(
            String name,
            String email,
            String password
    ) {}

    public record LoginRequest(
            String email,
            String password
    ) {}

    public record VerifyOtpRequest(
            String email,
            String otp
    ) {}

    public record ForgotPasswordRequest(
            String email
    ) {}

    public record ResetPasswordRequest(
            String email,
            String otp,
            String newPassword
    ) {}

    public record AuthResponse(
            String token,
            String name,
            String email
    ) {}
}