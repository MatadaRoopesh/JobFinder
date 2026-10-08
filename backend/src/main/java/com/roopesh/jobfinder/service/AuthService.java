package com.roopesh.jobfinder.service;

import com.roopesh.jobfinder.dto.AuthDtos.*;
import com.roopesh.jobfinder.model.User;
import com.roopesh.jobfinder.repository.UserRepository;
import com.roopesh.jobfinder.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;
    private final OtpService otpService;

    public AuthService(
            UserRepository users,
            PasswordEncoder encoder,
            JwtService jwt,
            OtpService otpService
    ) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
        this.otpService = otpService;
    }

    public AuthResponse register(RegisterRequest r) {

        if (r.name() == null ||
                r.name().isBlank() ||
                r.email() == null ||
                r.email().isBlank() ||
                r.password() == null ||
                r.password().length() < 6) {

            throw new IllegalArgumentException(
                    "Name, valid email and password of at least 6 characters are required"
            );
        }

        String email = r.email().toLowerCase().trim();

        if (users.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException(
                    "Email already registered"
            );
        }

        User u = users.save(
                new User(
                        r.name().trim(),
                        email,
                        encoder.encode(r.password())
                )
        );

        return new AuthResponse(
                jwt.generate(u.getEmail()),
                u.getName(),
                u.getEmail()
        );
    }

    public void login(LoginRequest r) {

        String email = r.email().toLowerCase().trim();

        User u = users.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Invalid email or password"
                        )
                );

        if (!encoder.matches(
                r.password(),
                u.getPassword()
        )) {
            throw new IllegalArgumentException(
                    "Invalid email or password"
            );
        }

        // Password is correct.
        // Send OTP instead of generating JWT immediately.
        otpService.sendOtp(email);
    }

    public AuthResponse verifyLoginOtp(
            VerifyOtpRequest r
    ) {

        String email = r.email().toLowerCase().trim();

        User u = users.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Invalid email"
                        )
                );

        otpService.verifyOtp(
                email,
                r.otp()
        );

        return new AuthResponse(
                jwt.generate(u.getEmail()),
                u.getName(),
                u.getEmail()
        );
    }
}