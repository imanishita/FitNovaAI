<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=30&duration=3000&pause=1100&color=6DB33F&center=true&vCenter=true&width=860&lines=🏋️+FitNovaAI;Microservices+Fitness+Platform;Event-Driven+·+AI-Powered+·+Scalable;Spring+Boot+%2B+React+%2B+Gemini+AI" alt="FitNovaAI" />

<br/>

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

<br/>

![Architecture](https://img.shields.io/badge/Architecture-Microservices-6DB33F?style=flat-square&labelColor=0d1117)
![UI](https://img.shields.io/badge/UI-Glassmorphism-38B2AC?style=flat-square&labelColor=0d1117)
![Security](https://img.shields.io/badge/Security-Firebase_JWT-FFCA28?style=flat-square&labelColor=0d1117)
![Messaging](https://img.shields.io/badge/Messaging-Event_Driven-FF6600?style=flat-square&labelColor=0d1117)
![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square&labelColor=0d1117)

<br/><br/>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png" width="100%"/>

</div>

<br/>

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

<details>
<summary><b>🎨 Modern Glassmorphism UI</b></summary>
<br/>

Beautiful, interactive React frontend with seamless light/dark mode and smooth animations.

</details>

<details>
<summary><b>🏗️ Microservices Architecture</b></summary>
<br/>

Independently scalable services designed with resilience in mind.

</details>

<details>
<summary><b>🔐 Centralized Security</b></summary>
<br/>

API Gateway acts as an OAuth2 Resource Server validating Firebase tokens.

</details>

<details>
<summary><b>🤖 Event-Driven AI Recommendations</b></summary>
<br/>

When an activity is tracked, an event is published to RabbitMQ. The AI service consumes this, prompts the Gemini API, and stores personalized recommendations in MongoDB.

</details>

<details>
<summary><b>🔍 Service Discovery</b></summary>
<br/>

Automated instance registration and load balancing via Netflix Eureka.

</details>

<details>
<summary><b>🛡️ Resilient AI Fallback Mechanism</b></summary>
<br/>

Integrated robust error handling to manage Gemini API rate limits (HTTP 429) or unavailability. A rule-based mock response mode automatically provides context-aware fitness suggestions based on the activity type, ensuring the system remains functional and responsive at all times without crashing the message queue.

</details>

---

## 🚀 Getting Started

### Prerequisites

<div>
<img src="https://img.shields.io/badge/JDK-17+-ED8B00?style=flat-square&logo=openjdk&logoColor=white&labelColor=0d1117"/>
<img src="https://img.shields.io/badge/Node.js-%26_npm-339933?style=flat-square&logo=node.js&logoColor=white&labelColor=0d1117"/>
<img src="https://img.shields.io/badge/RabbitMQ-local-FF6600?style=flat-square&logo=rabbitmq&logoColor=white&labelColor=0d1117"/>
<img src="https://img.shields.io/badge/MySQL_%26_MongoDB-running-4EA94B?style=flat-square&logo=mysql&logoColor=white&labelColor=0d1117"/>
<img src="https://img.shields.io/badge/Firebase-configured-FFCA28?style=flat-square&logo=firebase&logoColor=black&labelColor=0d1117"/>
<img src="https://img.shields.io/badge/Gemini-API_key-4285F4?style=flat-square&logo=google&logoColor=white&labelColor=0d1117"/>
</div>

<br/>

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

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png" width="100%"/>

<img src="https://img.shields.io/badge/Built_with-Spring_Boot_%7C_React_%7C_Gemini_AI-6DB33F?style=for-the-badge&labelColor=0d1117"/>

<br/><br/>

<sub>Built with modern architecture best practices to showcase scalability, beautiful UI/UX, and AI integration.</sub>

</div>
