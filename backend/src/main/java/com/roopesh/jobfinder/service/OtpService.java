package com.roopesh.jobfinder.service;

import com.roopesh.jobfinder.model.OtpVerification;
import com.roopesh.jobfinder.repository.OtpVerificationRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class OtpService {

    private final OtpVerificationRepository otpRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    private final SecureRandom random = new SecureRandom();

    public OtpService(
            OtpVerificationRepository otpRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService
    ) {
        this.otpRepository = otpRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public void sendOtp(String email) {

        email = email.toLowerCase().trim();

        // Generate a 6-digit OTP
        String otp = String.format(
                "%06d",
                random.nextInt(1_000_000)
        );

        // Hash OTP before storing it
        String otpHash = passwordEncoder.encode(otp);

        // OTP expires after 5 minutes
        LocalDateTime expiresAt =
                LocalDateTime.now().plusMinutes(5);

        OtpVerification verification =
                new OtpVerification(
                        email,
                        otpHash,
                        expiresAt
                );

        otpRepository.save(verification);

        String html = """
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>JobFinder Verification Code</h2>

                    <p>Your verification code is:</p>

                    <div style="
                        font-size: 32px;
                        font-weight: bold;
                        letter-spacing: 8px;
                        margin: 20px 0;
                    ">
                        %s
                    </div>

                    <p>
                        This OTP will expire in
                        <strong>5 minutes</strong>.
                    </p>

                    <p>
                        If you did not request this code,
                        you can safely ignore this email.
                    </p>

                    <hr>

                    <p style="color: #777;">
                        JobFinder
                    </p>
                </div>
                """.formatted(otp);

        emailService.sendEmail(
                email,
                "Your JobFinder OTP",
                html
        );
    }

    public void verifyOtp(String email, String otp) {

        email = email.toLowerCase().trim();

        OtpVerification verification =
                otpRepository
                        .findTopByEmailAndUsedFalseOrderByCreatedAtDesc(email)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "OTP not found or already used"
                                )
                        );

        // Check expiration
        if (LocalDateTime.now()
                .isAfter(verification.getExpiresAt())) {

            throw new IllegalArgumentException(
                    "OTP has expired"
            );
        }

        // Maximum 5 incorrect attempts
        if (verification.getAttempts() >= 5) {

            throw new IllegalArgumentException(
                    "Too many incorrect OTP attempts"
            );
        }

        // Check OTP
        if (!passwordEncoder.matches(
                otp,
                verification.getOtpHash()
        )) {

            verification.setAttempts(
                    verification.getAttempts() + 1
            );

            otpRepository.save(verification);

            throw new IllegalArgumentException(
                    "Invalid OTP"
            );
        }

        // OTP is correct — mark it as used
        verification.setUsed(true);

        otpRepository.save(verification);
    }
}