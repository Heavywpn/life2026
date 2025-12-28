# Project Structure

This document outlines the directory structure and organization of the Internal Staff Dashboard project.

## Root Directory

```
uncleduke/
├── src/                        # Source code
├── docker/                     # Docker configuration
├── nginx/                      # Nginx reverse proxy configuration
├── .mvn/                       # Maven wrapper files
├── pom.xml                     # Maven project configuration
├── docker-compose.yml          # Docker Compose orchestration
├── mvnw                        # Maven wrapper script (Unix)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── README.md                   # Project documentation
├── CLAUDE.md                   # Claude Code guidance
└── PROJECT_STRUCTURE.md        # This file
```

## Source Code Structure

### Java Packages (`src/main/java/com/yourcompany/dashboard/`)

```
dashboard/
├── annotation/                 # Custom annotations (@Auditable, etc.)
├── aspect/                     # AOP aspects (AuditAspect)
├── config/                     # Configuration classes
│   ├── SecurityConfig.java     # Spring Security configuration
│   ├── WebSocketConfig.java    # WebSocket configuration
│   ├── CacheConfig.java        # Caffeine cache configuration
│   └── WebClientConfig.java    # WebClient configuration
├── controller/                 # REST & MVC controllers
│   ├── DashboardController.java
│   ├── UserController.java
│   └── AuditController.java
├── service/                    # Business logic layer
│   ├── integration/            # External API integration services
│   │   ├── IntegrationService.java       # Base class
│   │   ├── UptimeKumaService.java
│   │   ├── UniFiService.java
│   │   ├── HomeAssistantService.java
│   │   └── SpeedtestService.java
│   ├── UserService.java
│   └── AuditService.java
├── repository/                 # JPA repositories
│   ├── UserRepository.java
│   ├── RoleRepository.java
│   ├── AuditEventRepository.java
│   └── SpeedtestResultRepository.java
├── model/                      # Data models
│   ├── entity/                 # JPA entities
│   │   ├── User.java
│   │   ├── Role.java
│   │   ├── AuditEvent.java
│   │   └── SpeedtestResult.java
│   ├── dto/                    # Data Transfer Objects
│   │   ├── DashboardData.java
│   │   ├── UptimeKumaStatus.java
│   │   ├── NetworkStats.java
│   │   └── EntityState.java
│   └── enums/                  # Enumerations
│       ├── EventType.java
│       └── EventStatus.java
├── scheduler/                  # Scheduled tasks
│   ├── DashboardUpdateScheduler.java
│   └── AuditCleanupScheduler.java
├── exception/                  # Exception handling
│   ├── IntegrationException.java
│   └── GlobalExceptionHandler.java
└── DashboardApplication.java   # Spring Boot main class
```

### Resources (`src/main/resources/`)

```
resources/
├── db/
│   ├── changelog/              # Liquibase database migrations
│   │   ├── v1.0/
│   │   │   ├── 001-create-users-roles-tables.xml
│   │   │   ├── 002-create-audit-events-table.xml
│   │   │   ├── 003-create-speedtest-results-table.xml
│   │   │   └── 004-insert-default-data.xml
│   │   └── db.changelog-master.xml
│   └── migration/              # Additional migration scripts
├── static/                     # Static web resources
│   ├── css/                    # Stylesheets
│   ├── js/                     # JavaScript files
│   └── images/                 # Image assets
├── templates/                  # Thymeleaf templates
│   ├── dashboard.html
│   └── login.html
├── application.yml             # Default application configuration
└── application-prod.yml        # Production configuration
```

### Test Structure (`src/test/java/com/yourcompany/dashboard/`)

```
dashboard/
├── controller/                 # Controller tests
├── service/                    # Service layer tests
├── repository/                 # Repository tests
├── integration/                # Integration tests
└── DashboardApplicationTests.java
```

## Docker Configuration

```
docker/
└── Dockerfile                  # Multi-stage Docker build

nginx/
├── nginx.conf                  # Nginx reverse proxy configuration
└── ssl/                        # SSL certificates directory
    └── README.md               # SSL setup instructions
```

## Configuration Files

### Maven Configuration
- `pom.xml` - Project dependencies and build configuration
- `.mvn/wrapper/` - Maven wrapper for consistent builds

### Docker Configuration
- `docker-compose.yml` - Orchestrates PostgreSQL, application, and Nginx
- `Dockerfile` - Multi-stage build for the Spring Boot application

### Application Configuration
- `application.yml` - Development configuration (H2 database)
- `application-prod.yml` - Production configuration (PostgreSQL)
- `.env.example` - Template for environment variables

## Key Design Patterns

### Layered Architecture
1. **Controller Layer**: Handles HTTP requests, delegates to services
2. **Service Layer**: Contains business logic, orchestrates operations
3. **Repository Layer**: Data access using Spring Data JPA
4. **Model Layer**: Entities, DTOs, and enums

### Integration Pattern
All external integrations follow a consistent pattern:
- Extend `IntegrationService` base class
- Use reactive `WebClient` for async calls
- Apply `@Cacheable` for performance
- Implement error handling with fallbacks

### Security Pattern
- Spring Security handles authentication
- AOP-based auditing with `@Auditable` annotation
- BCrypt password encryption
- Session-based authentication with CSRF protection

## Database Schema

### Tables
- `users` - User accounts
- `roles` - Role definitions
- `user_roles` - User-role associations
- `audit_events` - Activity audit log
- `speedtest_results` - Historical speed test data

### Indexes
- Audit events: user_id, event_type, timestamp, username
- Speedtest results: timestamp (descending)

## Deployment Structure

### Development
- Uses H2 in-memory database
- Runs directly via `./mvnw spring-boot:run`
- Access at http://localhost:8080

### Production (Docker)
- PostgreSQL database in separate container
- Application container with health checks
- Nginx reverse proxy with SSL termination
- All containers in private network

## Package Naming Convention

- Base package: `com.yourcompany.dashboard`
- Subpackages organized by layer and responsibility
- Integration services isolated in `service.integration` package
- DTOs separated from entities for clear data flow

## Future Extensions

Planned directories for future features:
- `src/main/java/.../security/` - Custom security components
- `src/main/java/.../websocket/` - WebSocket handlers
- `src/main/java/.../validation/` - Custom validators
- `src/main/resources/i18n/` - Internationalization
- `src/main/resources/reports/` - Report templates
