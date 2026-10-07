package com.roopesh.jobfinder.config;
import org.springframework.http.*;import org.springframework.web.bind.annotation.*;import java.util.*;
@RestControllerAdvice public class ApiExceptionHandler { @ExceptionHandler(Exception.class) ResponseEntity<Map<String,String>> handle(Exception e){return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message",e.getMessage()==null?"Something went wrong":e.getMessage()));}}
