> ⚠️ **Active development** — some env config values are temporarily hardcoded and will be migrated to `.env` soon.

<div align="center">

# 🏋️ FitNovaAI

**A full-stack microservices fitness platform for tracking activities, setting goals,**
**and leveraging AI-powered recommendations — built for scale.**

<br/>

![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

---

## 🧩 Core Services

| | Service | Description |
|---|---|---|
| 👤 | **User Service** | Handles authentication, registration, and profile management via Firebase |
| 🏃 | **Activity Service** | Records and tracks daily fitness activities, history, and user goals |
| 🤖 | **AI Service** | Delivers intelligent fitness suggestions powered by Gemini API integration |

---

## 🏗️ Architecture

```
React UI  ──►  API Gateway  ──►  Eureka Server (Service Discovery)
               (in progress)             │
                              ┌──────────┼──────────┐
                              ▼          ▼           ▼
                        User Service  Activity    AI Service
                                      Service
                              └──────────┼──────────┘
                                         ▼
                                     RabbitMQ
                                  (Inter-service messaging)
                                         │
                               ┌─────────┴─────────┐
                               ▼                   ▼
                             MySQL              MongoDB
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React · Tailwind CSS |
| **Backend** | Spring Boot · REST APIs |
| **Auth** | Firebase Authentication |
| **Database** | MySQL · MongoDB |
| **AI** | Gemini API *(planned)* |
| **Messaging & Discovery** | RabbitMQ · Eureka Server |

---

## ✅ Progress

- [x] User Registration and Login (Firebase)
- [x] Basic Activity Tracker
- [x] Gemini API Integration
- [x] Backend service communication
- [ ] API Gateway setup *(in progress)*
- [ ] UI enhancements *(in progress)*

---

## 🚀 Getting Started

Each service can be run independently:

```bash
# User Service
cd user-service
./mvnw spring-boot:run
```

```bash
# Activity Service
cd activity-service
./mvnw spring-boot:run
```

```bash
# AI Service
cd ai-service
./mvnw spring-boot:run
```

> 💡 Make sure **Eureka Server** is running first so all services can register with the discovery server.

---

## 📁 Project Structure

```
fitnova-ai/
├── user-service/        # Auth & profile management
├── activity-service/    # Fitness tracking & goals
├── ai-service/          # Gemini AI recommendations
├── eureka-server/       # Service discovery
└── frontend/            # React + Tailwind UI
```

---

<div align="center">
  <sub>Built with ☕ and Spring Boot · FitNovaAI</sub>
</div>
