# Stanford MBA Simulation Engine
### Personalized for Vinay Bollineni · Class of 2028

A rigorous, self-directed 2-year Stanford-style MBA program delivered as a static web portal.

## Program Overview

- **Duration:** May 2026 – April 2028
- **20 courses** across 8 quarters
- **4 specialization tracks:** Entrepreneurship, Strategy, Marketing & Growth, Technology & Product
- **2 capstone projects:** Year 1 Business Plan Sprint + Year 2 Venture Launch
- **Time commitment:** ~12 hrs/week (evenings + weekends)

## How to Run

```bash
# Option 1: Python (simplest)
python3 -m http.server 8080

# Option 2: Node.js
npx serve .

# Option 3: PHP
php -S localhost:8080
```

Then open: `http://localhost:8080`

## Site Structure

```
/
├── index.html          # Homepage & program overview
├── curriculum.html     # Full 2-year course list
├── dashboard.html      # Weekly task dashboard (starts at Week 1)
├── assignments.html    # Assignment tracker + rubrics
├── resources.html      # Textbooks, cases, podcasts, tools
├── courses/
│   └── acct101.html    # ACCT 101 — Financial Accounting (active)
├── css/style.css       # Full stylesheet
├── js/app.js           # Interactive features
└── data/program.json   # Full curriculum data
```

## Year 1: Core Curriculum

| Quarter | Courses | Dates |
|---------|---------|-------|
| Q1 | ACCT 101, STAT 102, OB 103 | May–Jul 2026 |
| Q2 | FIN 201, MKT 202, OPS 203 | Aug–Oct 2026 |
| Q3 | STR 301, ECON 302, ETH 303 | Nov 2026–Jan 2027 |
| Q4 | TEC 401, ENT 402, CAP 403 | Feb–Apr 2027 |

## Year 2: Specialization

| Quarter | Courses | Dates |
|---------|---------|-------|
| Q5 | ENT 501, MKT 502 | May–Jul 2027 |
| Q6 | STR 601, PM 602 | Aug–Oct 2027 |
| Q7 | LEAD 701, FIN 702 | Nov 2027–Jan 2028 |
| Q8 | PM 801, CAP 802 (Capstone) | Feb–Apr 2028 |
