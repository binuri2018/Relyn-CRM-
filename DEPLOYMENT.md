# CRM App Deployment Guide

This guide will help you deploy the CRM app with the backend on Render and frontend on Netlify.

## Prerequisites

1. **Render Account** - Sign up at https://render.com
2. **Netlify Account** - Sign up at https://netlify.com
3. **GitHub Account** - Both services require a GitHub repository
4. **Git configured locally**

## Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial CRM app with authentication"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/crm.git
git push -u origin main
```

## Step 2: Deploy Backend on Render

### Option A: Using render.yaml (Recommended)

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Select the repository and main branch
5. Click **"Deploy"**
6. Render will create the service and PostgreSQL database automatically

### Option B: Manual Setup

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in the configuration:
   - **Name**: `crm-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:create_app()`
5. Add environment variables:
   ```
   SECRET_KEY: [Generate a random string]
   JWT_SECRET_KEY: [Generate a random string]
   ```
6. Create a PostgreSQL database:
   - Click **"New +"** → **"PostgreSQL"**
   - Name: `crm-db`
   - Render will automatically provide `DATABASE_URL` environment variable
7. Click **"Create Web Service"**

### Get Your Backend URL

After deployment, you'll get a URL like: `https://crm-backend.onrender.com`

This is your API base URL.

## Step 3: Deploy Frontend on Netlify

1. Go to https://app.netlify.com
2. Click **"New site from Git"**
3. Choose GitHub and connect
4. Select your repository
5. Fill in the build configuration:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
6. Add environment variables:
   ```
   REACT_APP_API_URL: https://crm-backend.onrender.com/api
   ```
7. Click **"Deploy site"**

### Get Your Frontend URL

Netlify will provide you with a URL like: `https://your-crm.netlify.app`

## Step 4: Update Backend CORS

The backend is already configured for CORS. Render should automatically allow requests from your Netlify domain due to the CORS configuration:

```python
CORS(app)
```

If you encounter CORS issues, update `backend/app.py`:

```python
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://your-crm.netlify.app"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
```

## Testing Locally Before Deployment

### Backend with production settings:
```bash
cd backend
set FLASK_ENV=production
python app.py
```

### Frontend with production API:
```bash
cd frontend
set REACT_APP_API_URL=http://localhost:5000/api
npm start
```

## Troubleshooting

### Backend won't start on Render
- Check the logs in Render dashboard
- Ensure all environment variables are set
- Verify DATABASE_URL is provided

### Frontend can't connect to API
- Verify `REACT_APP_API_URL` is set correctly in Netlify environment variables
- Check browser console for CORS errors
- Ensure backend is running on Render

### Database connection error
- Check that PostgreSQL database was created on Render
- Verify `DATABASE_URL` matches the database URL
- Try restarting the web service

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed on Render with PostgreSQL
- [ ] Backend URL noted (e.g., https://crm-backend.onrender.com)
- [ ] Frontend environment variables updated with backend URL
- [ ] Frontend deployed on Netlify
- [ ] Test login functionality
- [ ] Test creating customers/deals/activities
- [ ] Verify responsive design on mobile

## Making Updates

After initial deployment:

1. Make changes locally
2. Commit and push to GitHub
3. Both Render and Netlify will auto-deploy from the main branch

Happy deploying! 🚀
