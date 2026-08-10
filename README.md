# 🏏 RoyalVision

## Advanced Cricket Analytics & Decision Support Platform

RoyalVision is a full-stack cricket analytics platform designed to transform
IPL match data into meaningful performance insights through interactive
dashboards, statistical analysis, and team/player intelligence.

---

## 🎯 Project Objective

RoyalVision brings together data engineering, SQL analytics, backend APIs,
interactive React dashboards, and Power BI reporting into a single cricket
analytics platform.

The platform focuses on answering questions such as:

- How is a team performing across seasons?
- Which players are the strongest performers?
- How does batting and bowling performance change over time?
- Which venues favor a team?
- How does a team perform against different opponents?
- What are the team's scoring and bowling patterns?
- Which players have produced the most runs and wickets?

---

## 🚀 Key Features

### 📊 Overview Dashboard

- Overall IPL dataset KPIs
- Match and season summaries
- Team performance trends
- Top run scorers
- Top wicket takers
- Scoring profile
- Seasonal analysis

### 🏏 Batting Analytics

- Total runs
- Strike rate
- Boundary analysis
- Seasonal batting trends
- Top run scorers
- Player-level batting performance

### 🎯 Bowling Analytics

- Total wickets
- Economy rate
- Runs conceded
- Dot balls
- Wickets by season
- Top wicket takers
- Bowler performance table

### 🏆 Team Analytics

- Matches played
- Wins and losses
- Win percentage
- Highest score
- Season-wise performance
- Venue performance
- Toss analysis
- Match results

### 👤 Player Analytics

- Player performance
- Batting statistics
- Bowling statistics
- Player spotlight
- Player images and profiles

### 🏟️ Venue Analytics

- Venue-wise performance
- Matches played
- Wins and losses
- Team performance across venues

---

## 🧠 Analytics Architecture

```text
Raw IPL Dataset
      │
      ▼
Python / Pandas
      │
      ▼
Data Cleaning & Filtering
      │
      ▼
PostgreSQL
      │
      ├── Overview Analytics
      ├── Batting Analytics
      ├── Bowling Analytics
      ├── Team Analytics
      ├── Venue Analytics
      └── Rajasthan Royals Analysis
      │
      ▼
Node.js + Express APIs
      │
      ▼
React Dashboard
      │
      ▼
Interactive Cricket Analytics
```

---

## 📸 Dashboard Preview

### Overview Dashboard

![RoyalVision Overview](docs/screenshots/overview.png)

### Batting Analytics

![RoyalVision Batting Analytics](docs/screenshots/batting.png)

### Bowling Analytics

![RoyalVision Bowling Analytics](docs/screenshots/bowling.png)

### Team Analytics

![RoyalVision Team Analytics](docs/screenshots/team.png)

### Player Analytics

![RoyalVision Player Analytics](docs/screenshots/player.png)

### Venue Analytics

![RoyalVision Venue Analytics](docs/screenshots/venue.png)

---

## 🏗️ System Architecture

RoyalVision follows a layered analytics architecture:

```text
                    ┌─────────────────────┐
                    │    IPL Match Data   │
                    │   CSV / Raw Dataset │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Python / Pandas   │
                    │ Data Cleaning & ETL │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    │   Analytics Layer   │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐        ┌─────────────────┐
        │ SQL Analytics   │        │ Node.js /       │
        │ Queries         │        │ Express APIs    │
        └─────────────────┘        └────────┬────────┘
                                            │
                                            ▼
                                  ┌─────────────────┐
                                  │ React Frontend  │
                                  │ Interactive     │
                                  │ Dashboard       │
                                  └─────────────────┘

                    ┌─────────────────────┐
                    │     Power BI        │
                    │ Business Reporting  │
                    └─────────────────────┘
```

---

## 📁 Project Structure

```text
RoyalVision/
│
├── backend/
│   └── src/
│       ├── config/
│       ├── constants/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       └── services/
│
├── frontend/
│   ├── public/
│   │   ├── players/
│   │   └── teams/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── pages/
│       ├── charts/
│       ├── data/
│       ├── styles/
│       ├── theme/
│       └── utils/
│
├── database/
│   └── analytics/
│       ├── 01_overview.sql
│       ├── 02_batting.sql
│       ├── 03_bowling.sql
│       ├── 04_team.sql
│       ├── 05_venue.sql
│       └── 06_rr_analysis.sql
│
├── datasets/
│   └── raw/
│
├── scripts/
│   ├── check_schema.py
│   └── filter_dataset.py
│
├── powerbi/
│   └── RoyalVision.pbix
│
├── docs/
│   └── screenshots/
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/bhavishya142/royal-vision.git
cd royal-vision
```

### Backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs using the Vite development server.

### Database

RoyalVision uses PostgreSQL for storing and querying analytical data.

Docker Compose is provided for the PostgreSQL and pgAdmin environment:

```bash
docker compose up -d
```

Environment variables should be configured locally using the provided
`.env.example` files.

---

## 🔌 Backend API

RoyalVision exposes cricket analytics through REST APIs built with
Node.js and Express.

### Base URL

```text
http://localhost:5000/api
```

### API Modules

| Module | Purpose |
|---|---|
| Overview | Overall dataset and dashboard KPIs |
| Batting | Batting statistics and performance |
| Bowling | Bowling statistics and performance |
| Team | Team performance and match analysis |
| Player | Player-level analytics |
| Venue | Venue-wise performance |

### API Flow

```text
React Dashboard
       │
       ▼
   REST APIs
       │
       ▼
Node.js + Express
       │
       ▼
   PostgreSQL
       │
       ▼
Analytics SQL Queries
```

---

## 🔄 Data Pipeline

RoyalVision follows a structured data pipeline from raw IPL data to
interactive analytics.

```text
Raw CSV Files
     │
     ▼
Python + Pandas
     │
     ├── Data validation
     ├── Filtering
     └── Dataset preparation
     │
     ▼
PostgreSQL
     │
     ├── Match data
     └── Delivery data
     │
     ▼
SQL Analytics
     │
     ├── Overview
     ├── Batting
     ├── Bowling
     ├── Team
     ├── Venue
     └── Rajasthan Royals Analysis
     │
     ▼
Node.js + Express
     │
     ▼
React Dashboard
```

---

## 📈 Power BI Analytics

RoyalVision also includes a Power BI report for business intelligence
and analytical reporting.

The Power BI report provides an additional analytical layer alongside
the React dashboard.

### Power BI Report

```text
powerbi/RoyalVision.pbix
```

---

## 🗄️ SQL Analytics

Analytical SQL queries are organized into dedicated modules:

| File | Analysis |
|---|---|
| `01_overview.sql` | Overall analytics |
| `02_batting.sql` | Batting analytics |
| `03_bowling.sql` | Bowling analytics |
| `04_team.sql` | Team analytics |
| `05_venue.sql` | Venue analytics |
| `06_rr_analysis.sql` | Rajasthan Royals analysis |

This separation keeps analytical logic organized and maintainable.

---

## 🛠️ Technologies Used

- React
- Node.js
- Express
- PostgreSQL
- Python
- Pandas
- SQL
- Power BI
- Docker
- Recharts
- Git & GitHub

---

## 🔮 Future Enhancements

- Live IPL data integration
- Advanced player comparison
- Predictive performance models
- Match outcome prediction
- Player recommendation system
- Automated data ingestion pipeline
- Production deployment
- Authentication and role-based access

---

## 👨‍💻 Project

**RoyalVision — Cricket Analytics & Decision Support Platform**

Built as a full-stack data analytics project combining data processing,
SQL analytics, backend engineering, interactive visualization, and
business intelligence.