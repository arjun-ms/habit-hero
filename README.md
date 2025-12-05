# 🌟 Habit Hero

A simple, powerful habit tracker built with **React (Vite)** + **FastAPI** + **SQLite**, enhanced with **AI-powered suggestions, mood analysis, XP, and badges**.

---

## 🚀 Features

### ✅ Core Features

- Create habits with:
  - Name
  - Frequency (Daily / Weekly)
  - Category (Health, Work, Learning, etc.)
  - Start Date
- Track progress with daily **check-ins** or **notes**
- Insights & analytics:
  - Current streak
  - Longest streak
  - Success rate
  - Best-performing weekdays
- Categorize habits for better organization
- Clean React dashboard UI for managing all habits

---

## 🤖 AI Features

- **Habit Suggestions**

  - Based on **existing habits**
  - Based on **user-input goals**

- **Mood & Motivation Analysis**

  - Scans last notes
  - Detects emotion score (positive / neutral / negative)
  - Detects common themes (“tired”, “motivated”, “stressed”)

- **Motivational Quotes**
  - Auto-generated using Gemini API
  - Context-aware (habit name + category + notes)

---

## 🏆 Gamification

- Earn **XP** (+10 per check-in)
- Automatic badge unlocking:
  - **🔥 7-Day Streak**
  - **🏅 30 Logs**
  - **⭐ 100 XP**
- Display badges inside habit details

---

## 📄 PDF Export

- Download a full **PDF report** per habit:
  - Habit summary
  - List of logs
  - Analytics
  - XP + badges

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- TailwindCSS
- Axios

### Backend

- FastAPI
- SQLModel + SQLite
- ReportLab (PDF generation)
- Gemini API (AI-powered features)

---

## 🧩 Project Structure

```

habit-hero/
├── backend/
│   ├── main.py
│   ├── crud.py
│   ├── models.py
│   ├── pdf_utils.py
│   ├── requirements.txt
│   └── ...
└── frontend/
├── src/
│   ├── pages/
│   ├── components/
│   ├── api/
│   └── App.jsx
├── index.html
└── vite.config.js

```

---

## ⚙️ Setup Instructions

### 📌 1. Clone the Project

```bash
git clone https://github.com/yourusername/habit-hero.git
cd habit-hero
```

---

# 🖥️ Backend Setup (FastAPI)

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Create `.env`

```
GEMINI_API_KEY=your_api_key_here
```

### 4. Start Backend

```bash
uvicorn main:app --reload
```

- Backend URL → [http://127.0.0.1:8000](http://127.0.0.1:8000)
- API Docs → [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

# 🌐 Frontend Setup (Vite + React)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔗 Frontend Environment Variables

Create:

```
frontend/.env
```

Add:

```
VITE_API_URL=http://127.0.0.1:8000
```

---

## 🛠️ Build Frontend for Production

```bash
npm run build
```

---

# 🚀 Deployment

## Backend → Railway

- Push backend to GitHub
- Create new Railway project
- Add environment variable:

  ```
  GEMINI_API_KEY=your_key
  ```

- Railway auto-builds FastAPI
- Set the generated backend URL in frontend `.env`

---

## Frontend → Vercel

- Connect GitHub repo
- Add environment variable:

  ```
  VITE_API_URL=https://your-railway-backend-url
  ```

- Deploy

---

# 🧪 Testing (Optional)

### Add mock logs to test badges:

```
POST /habit/{id}/logs
{
  "note": "test",
  "log_date": "2025-12-05"
}
```

---

# 🤝 Contributing

PRs and ideas welcome!
Feel free to fork and extend Habit Hero.

---

# 📜 License

MIT License © 2025

---

# 🙌 Acknowledgements

Built with ❤️ to help people form better habits and stay consistent.
