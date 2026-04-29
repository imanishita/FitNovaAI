<div align="center">

# 🏋️ FitNovaAI

**A scalable, full-stack microservices fitness platform empowering users to track activities, set goals, and receive AI-driven personalized recommendations.**

<br/>

![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Spring Cloud Gateway](https://img.shields.io/badge/Spring_Cloud_Gateway-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Eureka](https://img.shields.io/badge/Netflix_Eureka-E50914?style=for-the-badge&logo=netflix&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

---

## 🌟 Overview

FitNovaAI is a comprehensive fitness tracking application architected using **Microservices** and designed with modern **Glassmorphism UI** aesthetics. It leverages the **Google Gemini API** to analyze users' fitness data and provide intelligent, personalized training recommendations, safety guidelines, and improvements.

The frontend is built with **React and TailwindCSS**, supporting seamless Dark Mode and elegant animations. The backend uses **Spring Boot**, **Spring Cloud Gateway**, and **Netflix Eureka**, with asynchronous event-driven communication powered by **RabbitMQ**.

---

## 🧩 Core Microservices

| Service | Responsibility | Key Tech |
|---|---|---|
| 🛡️ **API Gateway** | Central entry point, routes traffic, and validates Firebase JWT tokens for secure access. | Spring Cloud Gateway, Spring Security |
| 📍 **Config & Discovery** | Centralized configuration management and dynamic service registration/discovery. | Spring Cloud Config, Netflix Eureka |
| 👤 **User Service** | Handles user profile management and syncs authentication state with Firebase. | Spring Boot, Firebase Auth, MySQL |
| 🏃 **Activity Service** | High-throughput service for recording daily fitness activities and tracking progress. | Spring Boot, MySQL |
| 🤖 **AI Service** | Asynchronously processes activity data via RabbitMQ to generate AI fitness recommendations. | Spring Boot, Gemini API, MongoDB |

---

## 🏗️ Architecture Design

```mermaid
graph TD
    UI[React Frontend (Tailwind + Glassmorphism)] -->|REST / JWT| Gateway(API Gateway :8080)
    Gateway -->|Service Discovery| Eureka(Eureka Server :8761)
    
    Gateway -->|Route| User[User Service :8081]
    Gateway -->|Route| Activity[Activity Service :8082]
    Gateway -->|Route| AI[AI Service :8083]
    
    Config(Config Server :8888) -.-> User
    Config -.-> Activity
    Config -.-> AI
    Config -.-> Gateway

    User --> DB1[(MySQL)]
    Activity --> DB2[(MySQL)]
    AI --> DB3[(MongoDB)]
    
    Activity -->|Publishes Events| RMQ((RabbitMQ))
    RMQ -->|Consumes Events| AI
    
    AI -->|Generates Insight| Gemini[Google Gemini API]
```

---

## ✨ Key Features

- **Modern Glassmorphism UI**: Beautiful, interactive React frontend with seamless light/dark mode and smooth animations.
- **Microservices Architecture**: Independently scalable services designed with resilience in mind.
- **Centralized Security**: API Gateway acts as an OAuth2 Resource Server validating Firebase tokens.
- **Event-Driven AI Recommendations**: When an activity is tracked, an event is published to RabbitMQ. The AI service consumes this, prompts the Gemini API, and stores personalized recommendations in MongoDB.
- **Service Discovery**: Automated instance registration and load balancing via Netflix Eureka.
- **Resilient AI Fallback Mechanism**: Integrated robust error handling to manage Gemini API rate limits (HTTP 429) or unavailability. A rule-based mock response mode automatically provides context-aware fitness suggestions based on the activity type, ensuring the system remains functional and responsive at all times without crashing the message queue.

---

## 🚀 Getting Started

### Prerequisites
- JDK 17+
- Node.js & npm
- RabbitMQ, MySQL, and MongoDB running locally
- Firebase Project configured
- Gemini API Key

### Running the Backend
Ensure you start the configuration and discovery services first:

```bash
# 1. Config Server (Port 8888)
cd configserver && ./mvnw spring-boot:run

# 2. Eureka Server (Port 8761)
cd eureka && ./mvnw spring-boot:run

# 3. Microservices (Wait for Config & Eureka to be up)
cd gateway && ./mvnw spring-boot:run
cd activityservice && ./mvnw spring-boot:run
cd aiservice && ./mvnw spring-boot:run
cd userservice && ./mvnw spring-boot:run
```

### Running the Frontend
```bash
cd fitness-app-frontend
npm install
npm run dev
```

---

<div align="center">
  <sub>Built with modern architecture best practices to showcase scalability, beautiful UI/UX, and AI integration.</sub>
</div>
