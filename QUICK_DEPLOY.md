# Quick Deployment Steps

## 1. Initialize Git & Push to GitHub

```bash
# From project root (D:\Intern Projects\relyn)
git init
git add .
git commit -m "Initial Relyn app with authentication"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/relyn.git
git push -u origin main
```

## 2. Deploy Backend on Render

1. Go to https://render.com
2. Sign up/Login
3. Click **"New +"** → **"Blueprint"**
4. Paste your GitHub repository URL
5. Click **"Connect"**
6. Click **"Deploy"**
7. Wait for deployment to complete (5-10 minutes)
8. **Note your backend URL** (e.g., `https://relyn-backend.onrender.com`)

## 3. Deploy Frontend on Netlify

1. Go to https://netlify.com
2. Sign up/Login
3. Click **"New site from Git"** → **"GitHub"**
4. Select your repository
5. Set build configuration:
   - Base: `frontend`
   - Build command: `npm run build`
   - Publish: `build`
6. Add environment variables:
   - Key: `REACT_APP_API_URL`
   - Value: `https://relyn-backend.onrender.com/api`
7. Click **"Deploy"**
8. Your site is live! 🎉

## Detailed Guide
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions and troubleshooting.
