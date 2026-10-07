package com.roopesh.jobfinder.dto;
public final class AuthDtos {
  private AuthDtos(){}
  public record RegisterRequest(String name,String email,String password){}
  public record LoginRequest(String email,String password){}
  public record AuthResponse(String token,String name,String email){}
}
