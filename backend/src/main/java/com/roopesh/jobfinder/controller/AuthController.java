package com.roopesh.jobfinder.controller;

import java.util.Map;

import com.roopesh.jobfinder.dto.AuthDtos.*;
import com.roopesh.jobfinder.service.AuthService;
import com.roopesh.jobfinder.service.EmailService;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService auth;
    private final EmailService emailService;

    public AuthController(
            AuthService auth,
            EmailService emailService
    ) {
        this.auth = auth;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest r
    ) {
        try {
            return ResponseEntity.ok(auth.register(r));

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest r
    ) {
        try {
            auth.login(r);

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "OTP sent to your email"
                    )
            );

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/verify-login-otp")
    public ResponseEntity<?> verifyLoginOtp(
            @RequestBody VerifyOtpRequest r
    ) {
        try {
            return ResponseEntity.ok(
                    auth.verifyLoginOtp(r)
            );

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // TEMPORARY EMAIL TEST
    @PostMapping("/test-email")
    public ResponseEntity<?> testEmail(
            @RequestParam String email
    ) {
        try {
            emailService.sendEmail(
                    email,
                    "JobFinder Email Test",
                    """
                    <h2>JobFinder Email Test</h2>
                    <p>This is a test email from your JobFinder application.</p>
                    <p>Resend email integration is working successfully.</p>
                    """
            );

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Test email sent successfully"
                    )
            );

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            Map.of(
                                    "message",
                                    "Failed to send email: "
                                            + e.getMessage()
                            )
                    );
        }
    }
}