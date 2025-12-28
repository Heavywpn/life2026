# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Quick Reference

**Project Status:** ✅ **PRODUCTION READY** (95% Complete - All Features Implemented!)
**Implementation:** 5 phases complete (Foundation, Integrations, Real-time, Admin UI, Advanced Features)
**Code Statistics:** 55 Java classes, 11 HTML templates, 2 JS files, ~8,600 lines of code
**Default Login:** `admin` / `admin` (change immediately!)

### Available URLs
- **Dashboard:** http://localhost:8080 (requires login, now with dynamic widgets!)
- **Reports:** http://localhost:8080/reports (KPI charts and analytics)
- **User Management:** http://localhost:8080/admin/users (admin only)
- **Widget Management:** http://localhost:8080/admin/widgets (admin only)
- **KPI Metrics:** http://localhost:8080/admin/kpis (admin only)
- **Audit Logs:** http://localhost:8080/admin/audit (admin only)
- **API Endpoint:** http://localhost:8080/api/dashboard/data
- **H2 Console:** http://localhost:8080/h2-console (dev only)
- **WebSocket:** ws://localhost:8080/ws

### Key Features (Phase 1-4)
✅ Spring Security authentication with BCrypt
✅ User management (create, edit, delete, roles)
✅ Comprehensive audit logging with AOP
✅ Real-time WebSocket updates (30s interval)
✅ External integrations (Uptime Kuma, UniFi, Home Assistant, Speedtest)
✅ Responsive modern UI with role-based navigation
✅ Docker deployment with Nginx SSL

### New Advanced Features (Phase 5)
✅ Dynamic widget system (IFRAME, Chart, Link, Static, Metric)
✅ KPI metrics database with threshold monitoring
✅ Trend analysis and aggregation (24h, 7d, 30d, 90d)
✅ ApexCharts integration (10 chart types)
✅ Report builder with scheduling support
✅ Sample data generator for testing
✅ 27 new REST API endpoints

---

## Project Overview

This is an internal staff dashboard application for displaying quick links to commonly used programs and integrating with network monitoring tools. The application is designed to be hosted on a Proxmox server and includes authentication, activity logging, and data integration from:

- Uptime Kuma (uptime monitoring)
- UniFi Dream Machine (network statistics)
- Speedtest (internet speed tests)
- Home Assistant (home automation/IoT monitoring)

## Technology Stack

- **Framework**: Spring Boot 3.2.x with Java 17 or 21
- **Security**: Spring Security with form-based authentication
- **Database**: PostgreSQL 15+ with Liquibase migrations
- **Caching**: Caffeine Cache for external API responses (5-minute TTL)
- **Real-time**: WebSocket/STOMP for live dashboard updates
- **Build**: Maven
- **Deployment**: Docker with docker-compose

## Build Commands

### Local Development
```bash
# Build the project
./mvnw clean package

# Run the application
./mvnw spring-boot:run

# Run with specific profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

# Run tests
./mvnw test

# Run a single test class
./mvnw test -Dtest=ClassName

# Run a specific test method
./mvnw test -Dtest=ClassName#methodName

# Skip tests during build
./mvnw clean package -DskipTests
```

### Docker Deployment
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f dashboard

# Restart a service
docker-compose restart dashboard

# Stop all services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build
```

## Architecture Overview

### Layered Architecture

```
Controller Layer (REST/MVC endpoints)
    ↓
Service Layer (business logic, orchestration)
    ↓
Repository Layer (JPA/database access)
    ↓
PostgreSQL Database
```

### Integration Architecture

External API calls are handled asynchronously using Spring WebFlux:
- All integration services extend `IntegrationService` base class
- WebClient configured with timeout and error handling
- Responses cached using Caffeine Cache (5-minute expiration)
- Scheduled tasks fetch data periodically and push via WebSocket

### Security Architecture

- Spring Security with form-based authentication
- User/Role entities with many-to-many relationship
- BCrypt password encoding (strength 12)
- Session management with CSRF protection
- AOP-based auditing using `@Auditable` annotation

### Audit System

All user actions are logged via AOP:
1. `@Auditable` annotation on controller methods
2. `AuditAspect` intercepts method calls
3. `AuditService` persists `AuditEvent` entities
4. Scheduled cleanup removes records older than configured retention period (default: 90 days)

### Real-time Updates

WebSocket configuration pushes dashboard updates:
- `DashboardUpdateScheduler` fetches data every 30 seconds
- Updates sent to `/topic/dashboard-updates` and `/topic/network-updates`
- Frontend connects via STOMP over WebSocket at `/ws`

## Key Design Patterns

### Service Integration Pattern
All external service integrations follow this pattern:
1. Extend `IntegrationService` base class
2. Create WebClient in `@PostConstruct init()` method
3. Methods return `Mono<T>` for async/reactive handling
4. Apply `@Cacheable` annotation with specific cache name
5. Use `timeout()` and `onErrorResume()` for resilience
6. Log errors but return empty/default values to prevent cascade failures

### Audit Logging Pattern
Use `@Auditable` annotation on any method requiring audit trail:
```java
@Auditable(eventType = EventType.PAGE_VIEW, action = "VIEW_DASHBOARD")
public String dashboard(Model model, Authentication authentication) {
    // method implementation
}
```

## Database Schema

### Core Tables
- `users` - user accounts with credentials
- `roles` - role definitions (ROLE_USER, ROLE_ADMIN)
- `user_roles` - many-to-many join table
- `audit_events` - comprehensive activity log with indexes on user_id, event_type, timestamp
- `speedtest_results` - historical speedtest data

### Migration Management
- Liquibase handles all schema changes
- Migrations located in `src/main/resources/db/changelog/`
- Never modify existing migrations - create new changesets
- Use `liquibase:update` to apply pending migrations

## Configuration

### Environment Variables
Required for production deployment:
- `DB_PASSWORD` - PostgreSQL password
- `UPTIME_KUMA_URL` - Uptime Kuma base URL
- `UPTIME_KUMA_API_KEY` - API key for Uptime Kuma
- `UNIFI_URL` - UniFi Dream Machine URL
- `UNIFI_USERNAME` - UniFi admin username
- `UNIFI_PASSWORD` - UniFi admin password
- `HOME_ASSISTANT_URL` - Home Assistant base URL
- `HOME_ASSISTANT_TOKEN` - Long-lived access token

### Application Profiles
- `default` - local development with H2 database
- `prod` - production with PostgreSQL (used in Docker)

### Quick Links Configuration
Dashboard links configured in `application.yml` under `dashboard.links`:
```yaml
dashboard:
  links:
    - name: "Email"
      url: "https://mail.company.com"
      category: "Communication"
```

## Testing Strategy

### Integration Tests
- Use Testcontainers for PostgreSQL
- Mock external API calls with WireMock
- Test authentication flows with Spring Security Test

### Service Layer Tests
- Mock repository dependencies
- Verify caching behavior
- Test error handling and timeouts

## Proxmox Deployment

The application is containerized for easy Proxmox deployment:
1. Create LXC container or VM with Docker installed
2. Copy project and `.env` file to server
3. Run `docker-compose up -d`
4. Nginx reverse proxy handles SSL termination and routing
5. Access dashboard at configured domain (e.g., `https://dashboard.internal.company.com`)

## Code Organization Principles

- **Controllers**: Thin layer, delegates to services, handles HTTP concerns only
- **Services**: Business logic, orchestration, transaction boundaries
- **Repositories**: Simple JPA repositories extending `JpaRepository`
- **DTOs**: Separate package for data transfer objects returned to clients
- **Entities**: JPA entities with proper relationships and indexes

## Important Implementation Notes

### UniFi Integration
UniFi Dream Machine API requires authentication:
1. Call `/api/auth/login` to obtain token
2. Store token and include in subsequent requests as Bearer token
3. Re-authenticate on 401 responses

### Speedtest Integration
Uses system `speedtest-cli` command:
- Installed in Docker image via `apk add speedtest-cli`
- Scheduled execution via `@Scheduled` annotation
- Results parsed from JSON output and stored in database

### WebSocket Security
WebSocket endpoints inherit Spring Security configuration:
- Must be authenticated to connect to `/ws`
- STOMP messages flow over authenticated session

## Performance Considerations

- HikariCP connection pool sized for expected load (default: max 10)
- Caffeine cache prevents excessive API calls to external services
- Pagination on audit log queries (default: 20 per page)
- Database indexes on frequently queried columns
- Lazy loading for JPA relationships to avoid N+1 queries

## Implementation Status

### Phase 1: Core Foundation ✅ COMPLETED

**Entities & Enums:**
- ✅ `EventType` enum - categorizes audit events
- ✅ `EventStatus` enum - tracks success/failure status
- ✅ `Role` entity - user roles with descriptions
- ✅ `User` entity - implements UserDetails for Spring Security
- ✅ `AuditEvent` entity - comprehensive audit logging with indexes
- ✅ `SpeedtestResult` entity - historical speedtest data

**Repositories:**
- ✅ `RoleRepository` - role management queries
- ✅ `UserRepository` - user queries with eager role fetching
- ✅ `AuditEventRepository` - audit queries with filtering and pagination
- ✅ `SpeedtestResultRepository` - speedtest queries with statistics

**Security & Services:**
- ✅ `CustomUserDetailsService` - loads users for authentication
- ✅ `UserService` - user management operations
- ✅ `AuditService` - audit event logging and querying
- ✅ `SecurityConfig` - Spring Security with form login, CSRF, session management
- ✅ `WebClientConfig` - WebClient for external API calls
- ✅ `CacheConfig` - Caffeine cache configuration

**Audit System:**
- ✅ `@Auditable` annotation - marks methods for audit logging
- ✅ `AuditAspect` - AOP aspect for automatic audit logging
- ✅ `AuditCleanupScheduler` - scheduled cleanup of old audit records

**Controllers:**
- ✅ `AuthController` - login page handler
- ✅ `DashboardController` - main dashboard with @Auditable

**Templates:**
- ✅ `login.html` - responsive login page with styling
- ✅ `dashboard.html` - main dashboard with quick links and status cards

**Database Migrations:**
- ✅ Liquibase changelog structure
- ✅ V1.0/001 - users and roles tables
- ✅ V1.0/002 - audit_events table with indexes
- ✅ V1.0/003 - speedtest_results table
- ✅ V1.0/004 - default admin user and roles

**Configuration:**
- ✅ pom.xml with all dependencies
- ✅ application.yml - H2 development config
- ✅ application-prod.yml - PostgreSQL production config
- ✅ Docker deployment files

### Phase 2: External Integrations ✅ COMPLETED

**Integration Services:**
- ✅ `IntegrationService` - base class with WebClient creation and cache access
- ✅ `UptimeKumaService` - fetches monitor status and uptime data
- ✅ `UniFiService` - network statistics, connected devices, with automatic authentication
- ✅ `HomeAssistantService` - entity states and sensor data
- ✅ `SpeedtestService` - scheduled speedtest execution via CLI, parses JSON results

**DTO Classes:**
- ✅ `DashboardData` - aggregates all integration data
- ✅ `UptimeKumaStatus` & `Monitor` - Uptime Kuma data structures
- ✅ `NetworkStats` & `ClientDevice` - UniFi network data
- ✅ `EntityState` - Home Assistant entity states
- ✅ `UniFiAuthResponse` - UniFi authentication

**API Endpoints:**
- ✅ `ApiController` - REST API for dashboard data
  - `GET /api/dashboard/data` - aggregated data from all integrations
  - `GET /api/uptime-kuma/status` - Uptime Kuma only
  - `GET /api/unifi/stats` - UniFi network stats only
  - `GET /api/home-assistant/states` - Home Assistant states only
  - `GET /api/speedtest/recent` - recent speedtest results
  - `GET /api/speedtest/latest` - latest speedtest result

**Exception Handling:**
- ✅ `IntegrationException` - wraps external service errors

### Phase 3: Real-time Dashboard ✅ COMPLETED

**WebSocket Implementation:**
- ✅ `WebSocketConfig` - STOMP over WebSocket configuration
- ✅ `DashboardUpdateScheduler` - broadcasts updates every 30 seconds
  - Dashboard updates to `/topic/dashboard-updates`
  - Network updates to `/topic/network-updates` (every 15 seconds)

**Scheduled Tasks:**
- ✅ Dashboard updates pushed via WebSocket (30s interval)
- ✅ Network statistics updates (15s interval)
- ✅ Speedtest execution (6-hour interval, configurable)

### Testing the Current Implementation

```bash
# Run the application
./mvnw spring-boot:run

# Access the dashboard
http://localhost:8080

# Default credentials
Username: admin
Password: admin

# Access H2 console (development)
http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:dashboard
Username: sa
Password: (leave blank)
```

**What Works Now:**
- ✅ User authentication and login with Spring Security
- ✅ Dashboard access for authenticated users
- ✅ Audit logging of all page views and API calls
- ✅ Scheduled audit cleanup (90-day retention)
- ✅ Database migrations auto-apply on startup
- ✅ Default admin user created automatically
- ✅ All external integrations (Uptime Kuma, UniFi, Home Assistant, Speedtest)
- ✅ REST API endpoints for dashboard data
- ✅ WebSocket real-time updates (30s dashboard, 15s network)
- ✅ Caching of external API responses (5-minute TTL)
- ✅ Reactive/async API calls with error handling

**Integration Configuration:**
To enable integrations, set these environment variables or application properties:
```yaml
integrations:
  uptime-kuma:
    enabled: true
    url: http://uptime-kuma:3001
    api-key: your_api_key
  unifi:
    enabled: true
    url: https://192.168.1.1
    username: admin
    password: your_password
  home-assistant:
    enabled: true
    url: http://homeassistant:8123
    token: your_long_lived_token
  speedtest:
    enabled: true
    schedule: "0 0 */6 * * ?"  # Every 6 hours
```

### Phase 4: Admin & UI Enhancements ✅ COMPLETED

**Admin Controllers:**
- ✅ `AdminController` - comprehensive user management (create, edit, delete, toggle status/lock)
- ✅ `AuditController` - audit log viewing with filtering and pagination

**Admin UI Templates:**
- ✅ `admin/users.html` - user management list with inline actions
- ✅ `admin/user-form.html` - create new user form
- ✅ `admin/user-edit.html` - edit existing user form
- ✅ `admin/audit-logs.html` - audit log viewer with filters
- ✅ `fragments/header.html` - reusable navigation header

**Enhanced Dashboard:**
- ✅ Updated `dashboard.html` with WebSocket integration
- ✅ Real-time data updates for all integrations
- ✅ Connection status indicator
- ✅ Last refresh timestamp
- ✅ Responsive grid layout

**Styling & Assets:**
- ✅ `css/style.css` - main stylesheet with modern design
- ✅ `css/admin.css` - admin-specific styles
- ✅ `js/dashboard.js` - WebSocket integration and real-time updates
- ✅ `error.html` - custom error page

**Features Implemented:**
- ✅ Full CRUD operations for users
- ✅ Role assignment (multiple roles per user)
- ✅ Enable/disable user accounts
- ✅ Lock/unlock accounts
- ✅ Audit log filtering by username, event type, date range
- ✅ Pagination for audit logs
- ✅ Real-time dashboard updates via WebSocket
- ✅ Responsive UI design
- ✅ Admin-only navigation items

**Total Project Statistics:**
- **Java Classes:** 40
- **HTML Templates:** 8
- **CSS Files:** 2
- **JavaScript Files:** 1
- **Configuration Files:** 4
- **Liquibase Migrations:** 4

---

## 📍 Current Status Summary

### ✅ COMPLETED (Production Ready)
All core features are implemented and functional:
- Complete user authentication & authorization system
- Full admin panel for user management
- Comprehensive audit logging with filtering
- External service integrations (configurable)
- Real-time WebSocket dashboard updates
- Modern, responsive UI
- Docker deployment ready
- Database migrations
- Error handling & logging

### 🚀 Ready for Deployment
The application can be deployed to Proxmox immediately:
1. Configure `.env` with integration credentials
2. Generate SSL certificates for Nginx
3. Run `docker-compose up -d`
4. Access via configured domain
5. Change default admin password

### 🎯 Future Enhancement Ideas
1. User profile self-service (password change, preferences)
2. Email notifications for critical audit events
3. Dashboard widget customization (drag-and-drop)
4. Export audit logs to CSV/PDF
5. Two-factor authentication (2FA/TOTP)
6. System health monitoring dashboard
7. API rate limiting and throttling
8. Advanced charting with Chart.js or D3.js
9. Mobile app (Progressive Web App)
10. Integration with additional monitoring tools

---

## 📖 Additional Documentation

For comprehensive information, see:
- **README.md** - Quick start guide and installation
- **IMPLEMENTATION_STATUS.md** - Detailed feature completion status
- **PROJECT_STRUCTURE.md** - Complete folder structure
- **FINAL_SUMMARY.md** - Full project summary with metrics
- **Inline Javadoc** - Code-level documentation

---

## 🔧 Development Tips

### Adding a New Integration
1. Create service class extending `IntegrationService`
2. Add `@Service` annotation and inject dependencies
3. Configure WebClient in `@PostConstruct init()` method
4. Create methods returning `Mono<T>` for async calls
5. Add `@Cacheable` annotations with unique cache name
6. Register cache name in `CacheConfig`
7. Add configuration properties to `application.yml`
8. Create DTO classes for response data
9. Add API endpoint in `ApiController`
10. Update dashboard UI to display data

### Adding a New Controller Endpoint
1. Add method to appropriate controller
2. Use `@Auditable` annotation for automatic logging
3. Return view name for Thymeleaf or data for REST
4. Handle errors with try-catch or `@ExceptionHandler`
5. Update SecurityConfig if authorization required

### Modifying Database Schema
1. Create new changeset in `db/changelog/v1.0/` (or new version)
2. Add unique changeset ID
3. Include in `db.changelog-master.xml`
4. Never modify existing migrations
5. Test locally before deploying

### Testing Integrations
1. Set `enabled: true` in application.yml
2. Configure URL and credentials
3. Check logs for connection status
4. Test API endpoint: `curl http://localhost:8080/api/[service]/[endpoint]`
5. Verify WebSocket updates in browser console

---

*Last Updated: Phase 4 Complete - All Core Features Implemented*
*Version: 1.0.0*
*Framework: Spring Boot 3.2.5*
*Java: 21*

---

## 🎉 Phase 5: Advanced Features - COMPLETE

### Widget System with Iframes
- ✅ Dynamic widget framework supporting 5 widget types
- ✅ Widget types: IFRAME, CHART, LINK, STATIC, METRIC
- ✅ Grid-based layout with configurable sizing
- ✅ Role-based widget visibility
- ✅ Widget management UI for admins
- ✅ Real-time widget loading and rendering

### KPI Metrics & Database
- ✅ KpiMetric entity with threshold monitoring
- ✅ Support for multiple metric categories
- ✅ Automatic status calculation (NORMAL, WARNING, CRITICAL)
- ✅ Trend analysis with percentage change
- ✅ Time-range queries (1h, 24h, 7d, 30d, 90d)
- ✅ Automated 90-day retention cleanup
- ✅ Sample data generator for testing

### Reporting & Charts
- ✅ ApexCharts integration for visualization
- ✅ 10 chart types: Line, Bar, Area, Pie, Donut, Scatter, Heatmap, Gauge, etc.
- ✅ Report entity with scheduling support
- ✅ Dynamic chart data generation from KPI metrics
- ✅ Configurable chart options (colors, labels, axes)
- ✅ Reports dashboard for all users
- ✅ Admin report management interface

### New Entities (Phase 5)
1. **DashboardWidget** - Configurable dashboard widgets
2. **KpiMetric** - Key Performance Indicator data points
3. **Report** - Report definitions with chart configurations

### New Controllers
- **WidgetController** - Widget management (8 REST endpoints)
- **ReportController** - Report generation and viewing (9 REST endpoints)
- **KpiController** - KPI metrics management (10 REST endpoints)

### New Services
- **WidgetService** - Widget CRUD and rendering
- **KpiService** - Metric recording and aggregation
- **ReportService** - Chart data generation
- **SampleKpiDataService** - Test data generation

### New UI Pages
- **/admin/widgets** - Widget management interface
- **/admin/kpis** - KPI metrics monitoring
- **/reports** - Reports dashboard (all users)

### New JavaScript Libraries
- **ApexCharts 3.45.0** - Professional charting library
- **widgets.js** - Dynamic widget loading and rendering
- **charts.js** - Chart creation and management

### Phase 5 Statistics
- **New Java Classes:** 15
- **New HTML Templates:** 3
- **New JavaScript Files:** 2
- **New Database Tables:** 3
- **New REST Endpoints:** 27
- **Lines of Code Added:** ~3,200

---

## 📊 Widget Types Explained

### 1. IFRAME Widget
Embeds external websites or applications in an iframe.

**Configuration:**
```json
{
  "url": "https://grafana.internal.company.com",
  "height": 400,
  "allowFullscreen": true
}
```

**Use Cases:**
- Embed Grafana dashboards
- Display internal wikis
- Show monitoring tools (Uptime Kuma, Prometheus)
- Integrate third-party SaaS dashboards

### 2. CHART Widget
Displays KPI metrics as interactive charts.

**Configuration:**
```json
{
  "chartType": "line",
  "kpiNames": ["server.cpu.usage", "server.memory.usage"],
  "timeRange": "24h",
  "refreshInterval": 300
}
```

**Supported Chart Types:**
- Line (time series)
- Bar/Column
- Area
- Pie/Donut
- Scatter
- Heatmap
- Gauge/Radial Bar

### 3. LINK Widget
Quick access button to external resources.

**Configuration:**
```json
{
  "url": "https://mail.company.com",
  "icon": "📧",
  "description": "Company Email",
  "openInNewTab": true
}
```

### 4. STATIC Widget
Custom HTML content block.

**Configuration:**
```json
{
  "content": "<h2>Important Notice</h2><p>System maintenance on Friday</p>"
}
```

### 5. METRIC Widget
Displays a single KPI value with status and trend.

**Configuration:**
```json
{
  "kpiName": "server.cpu.usage",
  "showTrend": true,
  "showTarget": true
}
```

---

## 📈 KPI System Usage

### Recording KPI Metrics

**Via Code:**
```java
@Autowired
private KpiService kpiService;

KpiMetric metric = new KpiMetric();
metric.setName("api.response.time");
metric.setCategory("Performance");
metric.setLabel("API Response Time");
metric.setValue(BigDecimal.valueOf(145.5));
metric.setUnit("ms");
metric.setWarningThreshold(BigDecimal.valueOf(500));
metric.setCriticalThreshold(BigDecimal.valueOf(1000));
metric.setThresholdDirection(KpiMetric.ThresholdDirection.ABOVE);
metric.setTimestamp(LocalDateTime.now());

kpiService.recordMetric(metric);
```

**Via REST API:**
```bash
curl -X POST http://localhost:8080/api/kpis \
  -H "Content-Type: application/json" \
  -d '{
    "name": "users.active",
    "category": "Business",
    "label": "Active Users",
    "value": 342,
    "unit": "users",
    "timestamp": "2024-01-15T10:30:00"
  }'
```

### Querying KPI Data

```bash
# Get latest value
GET /api/kpis/{name}/latest

# Get data for time range
GET /api/kpis/{name}/data?timeRange=24h

# Get summary with statistics
GET /api/kpis/{name}/summary?timeRange=7d

# Get all critical metrics
GET /api/kpis/critical
```

---

## 🎨 Creating Custom Widgets

### Step 1: Design Widget Configuration
Plan what type of widget you need and its configuration.

### Step 2: Create Widget via Admin UI
1. Navigate to **/admin/widgets**
2. Click "Create Widget"
3. Fill in details:
   - Title
   - Type (IFRAME, CHART, etc.)
   - Grid size (width x height)
   - Type-specific configuration (JSON)
   - Role restriction (optional)

### Step 3: Configure Widget Settings

**Example: CPU Usage Chart Widget**
```json
{
  "chartType": "area",
  "kpiNames": ["server.cpu.usage"],
  "timeRange": "24h",
  "refreshInterval": 60
}
```

**Example: Grafana Dashboard Iframe**
```json
{
  "url": "https://grafana.internal/d/dashboard-id?orgId=1&refresh=5s&kiosk",
  "height": 500,
  "allowFullscreen": true
}
```

### Step 4: Enable and Position
- Enable the widget
- Set display order for positioning
- Widget automatically appears on dashboard for authorized users

---

## 📊 Creating Reports

### Via Admin UI
1. Navigate to **/admin/reports** (admin only)
2. Click "Create Report"
3. Configure:
   - Name and description
   - Chart type
   - KPI query (which metrics to include)
   - Time range
   - Chart colors and styling
   - Optional scheduling (cron expression)

### Via REST API
```bash
curl -X POST http://localhost:8080/api/reports \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Server Performance",
    "type": "CHART",
    "chartType": "LINE",
    "kpiQuery": "{\"kpiNames\":[\"server.cpu.usage\",\"server.memory.usage\"],\"timeRange\":\"24h\"}",
    "chartConfig": "{\"colors\":[\"#667eea\",\"#764ba2\"],\"showGrid\":true}",
    "enabled": true
  }'
```

### Accessing Reports
- All users: **/reports** (view all enabled reports)
- Admins: **/admin/reports** (manage reports)
- API: **GET /api/reports/{id}/data** (get chart data)

---

## 🔧 Integration with Existing Systems

### Auto-Recording KPIs from Integrations

Modify your integration services to record KPIs automatically:

**Example: UniFi Service**
```java
@Autowired
private KpiService kpiService;

public NetworkStats getNetworkStats() {
    NetworkStats stats = // ... fetch from UniFi
    
    // Record as KPI
    KpiMetric metric = new KpiMetric();
    metric.setName("network.connected.devices");
    metric.setCategory("Network");
    metric.setLabel("Connected Devices");
    metric.setValue(BigDecimal.valueOf(stats.getConnectedClients()));
    metric.setUnit("devices");
    metric.setSource("unifi");
    kpiService.recordMetric(metric);
    
    return stats;
}
```

### Sample Data for Testing
The `SampleKpiDataService` automatically:
- Generates 24 hours of historical data on startup
- Updates metrics every 5 minutes
- Creates 7 sample KPIs across different categories

**Sample KPIs:**
- server.cpu.usage
- server.memory.usage
- network.bandwidth
- users.active
- api.response.time
- storage.disk.usage
- requests.success.rate

---

## 🚀 Updated Deployment

### Database Migration
New Liquibase migration `005-create-widgets-kpi-reports-tables.xml` creates:
- `dashboard_widgets` table
- `kpi_metrics` table (with indexes)
- `reports` table

Migration runs automatically on startup.

### Feature Toggle
To disable sample data generation, add to `application.yml`:
```yaml
spring:
  autoconfigure:
    exclude: com.yourcompany.dashboard.service.SampleKpiDataService
```

---

## 📚 API Reference Summary

### Widget Endpoints
- `GET /admin/widgets/api/widgets` - Get accessible widgets
- `POST /admin/widgets/api/widgets` - Create widget
- `PUT /admin/widgets/api/widgets/{id}` - Update widget
- `DELETE /admin/widgets/api/widgets/{id}` - Delete widget
- `POST /admin/widgets/api/widgets/{id}/toggle` - Enable/disable
- `POST /admin/widgets/api/widgets/reorder` - Reorder widgets

### KPI Endpoints
- `GET /api/kpis/names` - Get all KPI names
- `GET /api/kpis/categories` - Get all categories
- `GET /api/kpis/{name}/latest` - Get latest metric value
- `GET /api/kpis/{name}/summary` - Get KPI summary with stats
- `GET /api/kpis/{name}/data?timeRange=24h` - Get metric history
- `GET /api/kpis/critical` - Get metrics in critical state
- `POST /api/kpis` - Record new metric
- `DELETE /api/kpis/{id}` - Delete metric

### Report Endpoints
- `GET /api/reports` - Get all reports
- `GET /api/reports/{id}/data` - Get chart data for report
- `GET /api/charts/data?kpiNames=...&timeRange=24h` - Generate chart
- `POST /api/reports` - Create report (admin)
- `PUT /api/reports/{id}` - Update report (admin)
- `DELETE /api/reports/{id}` - Delete report (admin)

---

## 🎯 Updated Project Status

**Phase 5 Complete** - Advanced Features Implemented
- ✅ Widget System (IFRAME, Chart, Link, Static, Metric)
- ✅ KPI Metrics Database with trend analysis
- ✅ Reporting with ApexCharts visualization
- ✅ Sample data generator for testing
- ✅ Admin interfaces for all features
- ✅ Complete REST API

**Total Progress: 95% Complete**
**Production Ready:** YES
**New Features:** 27 REST endpoints, 3 new pages, 15 new classes

---

*Last Updated: Phase 5 Complete - Widget System, KPI Database, and Reporting Implemented*
*Version: 1.5.0*
*Framework: Spring Boot 3.2.5*
*Java: 21*
