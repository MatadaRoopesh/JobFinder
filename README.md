# JobFinder — Full-Stack Job Search & Application Tracker

A portfolio-ready full-stack application built with **Java 21, Spring Boot, Spring Security/JWT, React, MySQL and a public Jobs REST API**.

## Features

- User registration and login with BCrypt password hashing + JWT authentication
- Search remote jobs through the Himalayas Jobs API
- Keyword and country filters
- Server-side API integration (React never calls the external API directly)
- Save jobs to MySQL
- Apply/track jobs in a personal pipeline
- Update application status: SAVED, APPLIED, INTERVIEW, OFFER, REJECTED
- Delete saved jobs/applications
- Responsive React dashboard
- CORS configuration and protected REST endpoints

## Architecture

```text
React + CSS
    |
    | HTTP / JSON
    v
Spring Boot REST API
    |
    +---- Spring Security + JWT
    |
    +---- Service Layer ----> Himalayas Jobs API
    |
    +---- JPA/Hibernate
             |
             v
           MySQL
```

The external API is intentionally called from the backend. Himalayas documents the API as a free JSON API with no API key, and its documentation says browser-direct calls are subject to CORS restrictions; server-side access is recommended.

## Prerequisites

- Java 21+
- Node.js 18+
- Docker Desktop (recommended for MySQL)

## 1. Start MySQL

From the project root:

```bash
docker compose up -d mysql
```

If you already have MySQL installed, create a database called `jobfinder` and update the credentials in `backend/src/main/resources/application.properties` or environment variables.

## 2. Start the Spring Boot backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on:

`http://localhost:8080`

## 3. Start React

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

`http://localhost:5173`

## Main REST endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### External job search

```text
GET /api/jobs?q=java%20developer&country=US&page=1
```

### Protected user APIs

```text
GET    /api/me/saved-jobs
POST   /api/me/saved-jobs
DELETE /api/me/saved-jobs/{externalJobId}

GET    /api/me/applications
POST   /api/me/applications
PUT    /api/me/applications/{id}
DELETE /api/me/applications/{id}
```

## Example register request

```json
{
  "name": "Roopesh",
  "email": "roopesh@example.com",
  "password": "password123"
}
```

## Example job search response shape

```json
{
  "totalCount": 123,
  "page": 1,
  "jobs": [
    {
      "id": "job-guid",
      "title": "Java Developer",
      "company": "Example Company",
      "location": "Worldwide / Remote",
      "applicationLink": "https://himalayas.app/...",
      "description": "...",
      "seniority": "Entry-level",
      "employmentType": "Full Time"
    }
  ]
}
```

## Interview explanation

> I built JobFinder as a full-stack job search and application tracking platform. The React frontend communicates with REST APIs exposed by a Spring Boot backend. The backend consumes an external jobs API, transforms the external JSON response into a clean application model, and returns it to React. User accounts are secured with JWT authentication and BCrypt password hashing, while saved jobs and application statuses are persisted in MySQL using Spring Data JPA. I also added a personal application pipeline so users can move a job from applied to interview, offer, or rejected.

## Resume bullets

- Built a full-stack job search and application tracking platform using **Java, Spring Boot, React.js, MySQL, REST APIs and JWT authentication**, integrating an external jobs API for searchable listings.
- Developed protected REST endpoints for **user authentication, saved jobs and application tracking**, using Spring Data JPA and MySQL for persistent data management.
- Designed a responsive React dashboard with **job search, filtering, saved-job management and application-status tracking**, following a layered backend architecture.

## API attribution

Job listings are sourced from [Himalayas](https://himalayas.app). The application includes a visible source link in the footer as required by the API documentation.
