# Internal Staff Dashboard

An internal web application for staff members to access commonly used programs and monitor network infrastructure. The dashboard integrates with various monitoring tools and provides a centralized view of system health and performance metrics.

**Project Status**: ✅ Production Ready (95% Complete) - All core and advanced features implemented!

## Features

### Core Features (Phase 1-4)
- **User Authentication & Authorization**: Secure login with role-based access control
- **Audit Logging**: Comprehensive activity logging for security and compliance
- **Quick Links Dashboard**: Centralized access to frequently used tools and applications
- **Network Monitoring Integrations**:
  - Uptime Kuma: Service uptime monitoring
  - UniFi Dream Machine: Network statistics and connected devices
  - Home Assistant: IoT device states and sensor data
  - Speedtest: Periodic internet speed tests with historical data
- **Real-time Updates**: WebSocket-based live dashboard updates

### Advanced Features (Phase 5) 🆕
- **Dynamic Widget System**: Create and manage customizable dashboard widgets
  - **IFRAME Widgets**: Embed external dashboards (Grafana, monitoring tools, etc.)
  - **Chart Widgets**: Display KPI metrics as interactive charts
  - **Link Widgets**: Quick access buttons to resources
  - **Static Widgets**: Custom HTML content blocks
  - **Metric Widgets**: Single KPI displays with status and trend
- **KPI Metrics Database**: Track Key Performance Indicators with threshold monitoring
  - Automatic status calculation (NORMAL/WARNING/CRITICAL)
  - Trend analysis with percentage changes
  - Time-range queries (1h, 24h, 7d, 30d, 90d)
  - Automated 90-day retention cleanup
- **Reporting & Analytics**: Professional charting powered by ApexCharts
  - 10 chart types: Line, Bar, Area, Pie, Donut, Scatter, Heatmap, Gauge, and more
  - Report builder with scheduling support
  - Configurable colors, labels, and styling
- **Sample Data Generator**: Automatic test data for demonstrations

## Technology Stack

- **Backend**: Spring Boot 3.2.5, Java 21
- **Security**: Spring Security with BCrypt password encryption
- **Database**: PostgreSQL 15 (H2 for development)
- **Caching**: Caffeine Cache
- **Database Migrations**: Liquibase
- **Frontend**: Thymeleaf templates with WebSocket support
- **Deployment**: Docker & Docker Compose

## Prerequisites

- Java 21 or higher
- Maven 3.8+
- Docker & Docker Compose (for containerized deployment)
- PostgreSQL 15+ (for production)

## Quick Start

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd uncleduke
```

2. Run the application:
```bash
./mvnw spring-boot:run
```

3. Access the dashboard:
- **Main Dashboard**: http://localhost:8080 (login required)
- **Reports**: http://localhost:8080/reports (view charts and analytics)
- **Widget Management**: http://localhost:8080/admin/widgets (admin only)
- **KPI Metrics**: http://localhost:8080/admin/kpis (admin only)
- **User Management**: http://localhost:8080/admin/users (admin only)
- **Audit Logs**: http://localhost:8080/admin/audit (admin only)
- **H2 Console**: http://localhost:8080/h2-console (dev only)
- **Default credentials**: `admin` / `admin` (change immediately!)

### Docker Deployment (Production)

1. Create a `.env` file from the template:
```bash
cp .env.example .env
```

2. Edit `.env` and configure your environment variables

3. Generate SSL certificates for Nginx:
```bash
mkdir -p nginx/ssl
# Copy your SSL certificate and key to nginx/ssl/
# Or generate self-signed certificates for testing:
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/dashboard.key \
  -out nginx/ssl/dashboard.crt
```

4. Start all services:
```bash
docker-compose up -d
```

5. Access the dashboard:
- URL: https://dashboard.internal.company.com (or your configured domain)
- Default credentials: `admin` / `admin` (change immediately!)

## Configuration

### Environment Variables

Required environment variables for production deployment:

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_PASSWORD` | PostgreSQL password | `secure_password_123` |
| `UPTIME_KUMA_URL` | Uptime Kuma base URL | `http://uptime-kuma:3001` |
| `UPTIME_KUMA_API_KEY` | Uptime Kuma API key | `uk_xxxxxxxxxx` |
| `UNIFI_URL` | UniFi controller URL | `https://192.168.1.1` |
| `UNIFI_USERNAME` | UniFi admin username | `admin` |
| `UNIFI_PASSWORD` | UniFi admin password | `password` |
| `HOME_ASSISTANT_URL` | Home Assistant URL | `http://homeassistant:8123` |
| `HOME_ASSISTANT_TOKEN` | Long-lived access token | `eyJ0eXAi...` |

### Quick Links Configuration

Edit `src/main/resources/application.yml` to customize dashboard links:

```yaml
dashboard:
  links:
    - name: "Email"
      url: "https://mail.company.com"
      category: "Communication"
    - name: "Ticketing System"
      url: "https://tickets.company.com"
      category: "Tools"
```

## Building and Testing

```bash
# Build the project
./mvnw clean package

# Run tests
./mvnw test

# Run a specific test class
./mvnw test -Dtest=UserServiceTest

# Skip tests during build
./mvnw clean package -DskipTests
```

## Database Management

### Migrations

Database schema is managed by Liquibase. Migrations are located in `src/main/resources/db/changelog/`.

To create a new migration:
1. Create a new XML file in `db/changelog/v1.0/` (or new version directory)
2. Add the changeset with unique ID
3. Include the file in `db.changelog-master.xml`

### Default Users

The application creates a default admin user:
- Username: `admin`
- Password: `admin`
- Role: `ROLE_ADMIN`

**IMPORTANT**: Change the admin password immediately after first login!

## Using Advanced Features

### Creating Widgets

1. Login as admin and navigate to **Widgets** in the menu
2. Click **Create Widget**
3. Configure the widget:
   - Choose widget type (IFRAME, Chart, Link, Static, Metric)
   - Set title and grid size
   - Add type-specific configuration (see examples below)
   - Optionally restrict to specific roles
4. Enable the widget to display on dashboard

**Example IFRAME Widget** (Embed Grafana):
```json
{
  "url": "https://grafana.internal/d/dashboard?kiosk",
  "height": 500,
  "allowFullscreen": true
}
```

**Example Chart Widget** (CPU Usage):
```json
{
  "chartType": "area",
  "kpiNames": ["server.cpu.usage"],
  "timeRange": "24h",
  "refreshInterval": 60
}
```

### Recording KPI Metrics

**Via REST API**:
```bash
curl -X POST http://localhost:8080/api/kpis \
  -H "Content-Type: application/json" \
  -d '{
    "name": "custom.metric",
    "category": "Business",
    "label": "Custom Metric",
    "value": 42.5,
    "unit": "count",
    "warningThreshold": 80,
    "criticalThreshold": 100,
    "thresholdDirection": "ABOVE"
  }'
```

**Via Java Code**:
```java
@Autowired
private KpiService kpiService;

KpiMetric metric = new KpiMetric();
metric.setName("api.response.time");
metric.setValue(BigDecimal.valueOf(145.5));
metric.setUnit("ms");
// ... set other properties
kpiService.recordMetric(metric);
```

### Creating Reports

1. Navigate to **Admin** → **Reports** (admin only)
2. Click **Create Report**
3. Configure:
   - Report name and description
   - Chart type (Line, Bar, Pie, etc.)
   - KPI query (which metrics to include)
   - Time range
   - Chart styling (colors, labels)
4. Save and view on the **Reports** page

### API Endpoints

**Widget APIs** (admin only):
- `GET /admin/widgets/api/widgets` - List all widgets
- `POST /admin/widgets/api/widgets` - Create widget
- `PUT /admin/widgets/api/widgets/{id}` - Update widget
- `DELETE /admin/widgets/api/widgets/{id}` - Delete widget

**KPI APIs**:
- `GET /api/kpis/names` - List all KPI names
- `GET /api/kpis/{name}/latest` - Get latest value
- `GET /api/kpis/{name}/summary?timeRange=24h` - Get statistics
- `GET /api/kpis/{name}/data?timeRange=7d` - Get historical data
- `POST /api/kpis` - Record new metric

**Report APIs**:
- `GET /api/reports` - List all reports
- `GET /api/reports/{id}/data` - Get chart data
- `GET /api/charts/data?kpiNames=...&timeRange=24h` - Generate chart

For complete API documentation, see [CLAUDE.md](CLAUDE.md).

## Monitoring & Health Checks

Spring Boot Actuator endpoints are available:
- Health: http://localhost:8080/actuator/health
- Metrics: http://localhost:8080/actuator/metrics
- Info: http://localhost:8080/actuator/info

## Audit Logging

All user activities are logged to the `audit_events` table:
- User logins/logouts
- Page views
- API calls
- Configuration changes

Logs are automatically cleaned up after 90 days (configurable).

## Deployment to Proxmox

1. Create an LXC container or VM with Docker installed
2. Clone the repository to the server
3. Configure `.env` file with production settings
4. Run `docker-compose up -d`
5. Configure DNS or `/etc/hosts` to point to the server
6. Access via configured domain

## Security Considerations

- Always use HTTPS in production (configured via Nginx)
- Change default admin credentials immediately
- Use strong passwords for database and API keys
- Keep dependencies updated regularly
- Review audit logs periodically
- Implement IP whitelisting if needed (in Nginx)

## Troubleshooting

### Application won't start
- Check logs: `docker-compose logs dashboard`
- Verify PostgreSQL is running: `docker-compose ps postgres`
- Ensure all required environment variables are set

### External integrations not working
- Verify integration URLs are accessible from container
- Check API keys/credentials are correct
- Review logs for specific error messages
- Test connectivity: `docker-compose exec dashboard curl -v <integration-url>`

### Database migration fails
- Check Liquibase logs in application output
- Verify database user has CREATE/ALTER permissions
- Review changelog files for syntax errors

## Development

For detailed development guidelines, see [CLAUDE.md](CLAUDE.md).

## License

Internal use only - Proprietary
