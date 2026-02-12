# 🎯 Relyn

A modern, full-stack Customer Relationship Management application built with **React + Flask + SQLAlchemy**.

## ✨ Features

- **👥 Customer Management** - Add, edit, delete, and search customers with tags
- **🤝 Deal Pipeline** - Manage deals through different stages (New → Won/Lost)
- **✅ Activity Logging** - Track calls, emails, and meetings with customers
- **📈 Dashboard** - Real-time statistics and recent activity overview
- **🔍 Search & Filter** - Search customers by name/email/company, filter deals by stage
- **🎨 Modern UI** - Responsive gradient design with smooth animations
- **🔐 JWT Authentication** - Optional user authentication with JWT tokens (built into backend)

## 📋 Tech Stack

**Frontend:**
- React 18.2
- Axios for API calls
- Modern CSS with gradients & animations

**Backend:**
- Flask 2.2
- Flask-SQLAlchemy for ORM
- Flask-CORS for cross-origin requests
- Flask-JWT-Extended for authentication
- SQLite (default) - can switch to PostgreSQL/MySQL

**Database Models:**
- `Customer` - Customer information with tags
- `Deal` - Sales deals linked to customers
- `Activity` - Call/Email/Meeting logs
- `User` - Optional user accounts for auth

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
```powershell
cd backend
```

2. **Create virtual environment:**
```powershell
python -m venv .venv
.\\.venv\Scripts\Activate.ps1
```

3. **Install dependencies:**
```powershell
pip install -r requirements.txt
```

4. **Run the Flask server:**
```powershell
python app.py
```

The API will be running at **http://localhost:5000/api**

### Frontend Setup

1. **Navigate to frontend directory:**
```powershell
cd frontend
```

2. **Install dependencies:**
```powershell
npm install
```

3. **Start the development server:**
```powershell
npm start
```

The app will open at **http://localhost:3000**


