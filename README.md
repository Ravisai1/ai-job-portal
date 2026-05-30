# AI Job Portal Backend

## Overview

AI Job Portal Backend is a Spring Boot application that provides secure authentication and job management functionality. The project uses JWT-based authentication, Spring Security, PostgreSQL, and Spring Data JPA.

The application allows users to register, login, create jobs, apply for jobs, track applications, and manage application statuses.

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

### Database

* PostgreSQL

### Tools

* Postman
* Git
* GitHub

---

## Features

### Authentication Module

* User Registration
* User Login
* Password Encryption using BCrypt
* JWT Token Generation
* JWT Token Validation
* Protected APIs using Spring Security

### Job Management Module

* Create Job
* Get All Jobs
* Get Job By ID
* Update Job
* Delete Job
* Automatically store creator information using authenticated JWT user

### Application Management Module

* Apply for Jobs
* Prevent Duplicate Applications
* View My Applications
* View Applications By Job ID
* Update Application Status
* Track Application History

---

## Project Architecture

Controller Layer

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

Client Sends Token

↓

JWT Filter Validates Token

↓

Security Context Updated

↓

Protected APIs Accessible

---

## API Endpoints

### Authentication APIs

#### Register User

POST /api/auth/register

#### Login User

POST /api/auth/login

---

### Job APIs

#### Create Job

POST /api/jobs/addjobs

#### Get All Jobs

GET /api/jobs/getjobs

#### Get Job By ID

GET /api/jobs/{id}

#### Update Job

PUT /api/jobs/{id}

#### Delete Job

DELETE /api/jobs/{id}

---

### Application APIs

#### Apply For Job

POST /api/applications/{jobId}/apply

#### Get My Applications

GET /api/applications/getApplicationsByEmail

#### Get Applications By Job

GET /api/applications/job/{jobId}

#### Update Application Status

PUT /api/applications/{id}/status

---

## Database Entities

### User

* id
* name
* email
* password

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

## How To Run

### Clone Repository

git clone repository-url>](https://github.com/Ravisai1/ai-job-portal.git

### Navigate To Project

cd backend

### Configure Database

Update application.properties with PostgreSQL credentials.

### Run Application

mvn spring-boot:run

### Access APIs

http://localhost:8080

---

## Future Enhancements

* React Frontend Integration
* Role-Based Access Control (Admin, Recruiter, User)
* Resume Upload Feature
* AI Resume Matching
* Email Notifications
* Pagination and Search
* Dashboard Analytics

---

## Author

Ravisai Karicharla

Java Full Stack Developer
