# Sentiment Analysis TML Project 
# Sentiment Analysis Dashboard

Full-stack dashboard to analyze employee feedback sentiment.

##  Requirements
- Python 3.10+
- Node.js 18+

##  Setup & Run

### 1️Backend
```bash
cd backend
python -m venv .venv
# Activate the venv
# Windows: .venv\Scripts\activate


pip install -r requirements.txt
python app.py
```
Runs on: http://localhost:5000

### 2️ Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on: http://localhost:5173

##  How to Use
1. Start **backend** first(python app.py).
2. Start **frontend**(npm run dev).
3. Upload CSV → See analysis in charts & 3D dashboard.

##  Features
- CSV Upload & Sentiment Analysis
- Weekly/Monthly Trends
- Department Sentiment Breakdown
- Top 10 Frequent Words
- 3D Landing (Spline) + Animated Charts

## Notes
- Backend stores uploads in `/uploads`.
- Processed results saved to `processed_feedback.json`.
