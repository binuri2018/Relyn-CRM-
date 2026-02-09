# 📊 Simple CRM Platform

A modern, full-stack Customer Relationship Management (CRM) application built with **React + Flask + SQLAlchemy**.

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
cd "d:\Intern Projects\crm\backend"
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
cd "d:\Intern Projects\crm\frontend"
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

## 📚 API Endpoints

### Dashboard
- `GET /api/dashboard` - Get stats and recent activities

### Customers
- `GET /api/customers?search=query` - List customers (with optional search)
- `POST /api/customers` - Create customer
- `PUT /api/customers/<id>` - Update customer
- `DELETE /api/customers/<id>` - Delete customer

### Deals
- `GET /api/deals?stage=New` - List deals (with optional stage filter)
- `POST /api/deals` - Create deal
- `PUT /api/deals/<id>` - Update deal
- `DELETE /api/deals/<id>` - Delete deal

### Activities
- `GET /api/activities?customer_id=1` - List activities (with optional customer filter)
- `POST /api/activities` - Create activity
- `PUT /api/activities/<id>` - Update activity
- `DELETE /api/activities/<id>` - Delete activity

### Authentication (Optional)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

## 🎨 UI/UX Features

- **Gradient Header** - Purple gradient navigation with emoji icons
- **Responsive Cards** - Modern card layouts with hover effects
- **Search & Filter** - Easy-to-use search bars and dropdowns
- **Form Validation** - Required field validation with helpful messages
- **Loading States** - Visual feedback for async operations
- **Type Indicators** - Emojis showing deal stages and activity types
- **Status Badges** - Color-coded completion status for activities

## 📁 Project Structure

```
crm/
├── backend/
│   ├── app.py              # Flask app factory
│   ├── models.py           # SQLAlchemy models
│   ├── routes.py           # API routes
│   ├── auth.py             # JWT authentication
│   ├── config.py           # Configuration
│   ├── requirements.txt    # Python dependencies
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main app component
│   │   ├── index.css       # Global styles
│   │   ├── services/
│   │   │   └── api.js      # Axios API client
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Customers.jsx
│   │   │   ├── Deals.jsx
│   │   │   └── Activities.jsx
│   │   └── components/
│   │       ├── CustomerList.jsx
│   │       ├── CustomerForm.jsx
│   │       ├── DealList.jsx
│   │       ├── DealForm.jsx
│   │       ├── ActivityList.jsx
│   │       └── ActivityForm.jsx
│   ├── package.json
│   └── README.md
└── README.md
```

## 🔐 Authentication (Optional)

To enable JWT authentication:

1. Register a user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"secret"}'
```

2. Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"secret"}'
```

3. Use the returned token in requests:
```bash
curl -H "Authorization: Bearer <token>" http://localhost:5000/api/customers
```

## 🛠️ Configuration

### Backend Config
Edit `backend/config.py`:
- `SECRET_KEY` - Flask session secret
- `DATABASE_URL` - SQLite URI (change to PostgreSQL if needed)
- `JWT_SECRET_KEY` - JWT signing key

### Frontend Config
Set environment variable for different API URLs:
```powershell
$env:REACT_APP_API_URL="http://api.example.com"
npm start
```

## � Deployment

### Deploy Backend on Render & Frontend on Netlify

Quick deployment in 3 steps:

1. **Push code to GitHub** - Initialize a Git repository and push to GitHub
2. **Deploy Backend** - Use Render's Blueprint feature (connects to GitHub + auto-provisions PostgreSQL)
3. **Deploy Frontend** - Connect Netlify to GitHub with environment variable for backend URL

**See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for step-by-step instructions**

Also check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed troubleshooting and configuration options.

Features included for production:
- ✅ Gunicorn production server (backend)
- ✅ PostgreSQL support via render.yaml
- ✅ Environment variable configuration
- ✅ CORS properly configured
- ✅ JWT security tokens
- ✅ Netlify SPA redirects configured
- ✅ .gitignore for clean commits

## �📊 Example Data

To test the app, create sample data:

**Create a customer:**
```bash
curl -X POST http://localhost:5000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "phone":"555-1234",
    "company":"Tech Corp",
    "tags":"urgent,vip"
  }'
```

**Create a deal:**
```bash
curl -X POST http://localhost:5000/api/deals \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id":1,
    "title":"Enterprise License",
    "stage":"Negotiation",
    "value":50000,
    "due_date":"2026-03-31"
  }'
```

**Log an activity:**
```bash
curl -X POST http://localhost:5000/api/activities \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id":1,
    "title":"Quarterly review call",
    "type":"Call",
    "date":"2026-02-06T14:00:00",
    "completed":false
  }'
```

## 🐛 Troubleshooting

**Port already in use?**
- Backend: Change port in `app.py` line with `app.run()`
- Frontend: Use `PORT=3001 npm start`

**CORS errors?**
- Ensure backend is running first
- Check `frontend/src/services/api.js` base URL

**Database errors?**
- Delete `backend/crm.db` and restart
- Backend will auto-create on first run

## 📝 Notes

- Database auto-initializes on first run
- JWT tokens stored in `localStorage` (frontend)
- Forms include basic validation
- All timestamps in UTC

## 🤝 Contributing

Feel free to extend with:
- More sophisticated filtering and sorting
- PDF export reports
- Email integrations
- Advanced analytics
- Multi-user workspaces

## 📄 License

MIT License - feel free to use this for learning and projects!

---

**Happy CRM-ing! 📊✨**
