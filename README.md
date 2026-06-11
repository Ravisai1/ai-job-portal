# AI Job Portal

## Overview

AI Job Portal is a full-stack web application that enables Users and Recruiters to manage the job application process efficiently.

The application provides secure JWT-based authentication, role-based access, job management, application tracking, recruiter dashboards, and application status management.

Built using Spring Boot, React, TypeScript, PostgreSQL, Spring Security, and Material UI.

---

## Features

### Authentication & Security

* User Login
* JWT Authentication
* Password Encryption using BCrypt
* Protected REST APIs
* Protected Frontend Routes
* Role-Based UI (User / Recruiter)

### Job Management

* Create Job
* View All Jobs
* View Job Details
* Update Job
* Delete Job
* Track Job Creator

### Application Management

* Apply for Jobs
* Prevent Duplicate Applications
* View My Applications
* Track Application Status
* View Applicants for a Job
* Update Applicant Status

### Recruiter Dashboard

* View Created Jobs
* View Applicants
* Manage Application Status
* Recruiter-Specific Navigation

---

## Tech Stack

### Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* JWT Authentication
* Maven

### Frontend

* React
* TypeScript
* Axios
* React Router DOM
* Material UI

### Database

* PostgreSQL

### Tools

* Git
* GitHub
* Postman
* VS Code

---

## Project Architecture

Frontend (React + TypeScript)

↓

REST APIs

↓

Spring Boot Backend

↓

Service Layer

↓

Repository Layer

↓

PostgreSQL Database

---

## Security Flow

User Login

↓

JWT Token Generated

↓

Token Stored In Browser

↓

Token Sent With Requests

↓

JWT Filter Validates Token

↓

Security Context Updated

↓

Protected APIs Accessible

---

## API Endpoints

### Authentication APIs

POST /api/auth/register

POST /api/auth/login

### Job APIs

POST /api/jobs/addjobs

GET /api/jobs/getjobs

GET /api/jobs/{id}

PUT /api/jobs/{id}

DELETE /api/jobs/{id}

GET /api/jobs/my

### Application APIs

POST /api/applications/{jobId}/apply

GET /api/applications/getApplicationsByEmail

GET /api/applications/job/{jobId}

PUT /api/applications/{id}/status

---

## Database Entities

### User

* id
* name
* email
* password
* role

### Job

* id
* title
* company
* location
* salary
* description
* createdBy
* createdAt

### Application

* id
* userEmail
* jobId
* appliedAt
* status

---

## Screenshots

* Login Page
* Jobs Page
* Job Details
* My Applications
* Create Job
* Recruiter Dashboard
* Applicants Page

---

## How To Run

### Clone Repository

git clone https://github.com/Ravisai1/ai-job-portal.git

### Backend

cd backend

Configure PostgreSQL credentials in application.properties

mvn spring-boot:run

### Frontend

cd frontend

npm install

npm run dev

### Access Application

Backend:
http://localhost:8080

Frontend:
http://localhost:5173

---

## Future Enhancements

* Resume Upload
* Search and Filtering
* Pagination
* Email Notifications
* AI Resume Matching
* Dashboard Analytics
* Application Tracking Timeline
* Cloud Deployment

---

## Author

Ravisai Karicharla

Java Full Stack Developer
