import React from 'react'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Deals from './pages/Deals'
import Activities from './pages/Activities'
import Login from './pages/Login'

export default function App(){
  const [route, setRoute] = React.useState('dashboard')
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const storedToken = localStorage.getItem('access_token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    setUser(null)
    setRoute('dashboard')
  }

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>
  }

  if (!user) {
    return <Login onLoginSuccess={setUser} />
  }

  return (
    <div className="container">
      <header>
        <div className="header-top">
          <h1>🎯 RELYN</h1>
          <div className="user-info">
            <div className="user-details">
              <span className="username">{user.username}</span>
              <span className="user-role">{user.role}</span>
            </div>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
        <nav>
          <button 
            onClick={()=>setRoute('dashboard')} 
            className={`nav-btn ${route === 'dashboard' ? 'active' : ''}`}
          >
            📈 Dashboard
          </button>
          <button 
            onClick={()=>setRoute('customers')} 
            className={`nav-btn ${route === 'customers' ? 'active' : ''}`}
          >
            👥 Customers
          </button>
          <button 
            onClick={()=>setRoute('deals')} 
            className={`nav-btn ${route === 'deals' ? 'active' : ''}`}
          >
            🤝 Deals
          </button>
          <button 
            onClick={()=>setRoute('activities')} 
            className={`nav-btn ${route === 'activities' ? 'active' : ''}`}
          >
            ✅ Activities
          </button>
        </nav>
      </header>
      <main>
        {route === 'dashboard' && <Dashboard />}
        {route === 'customers' && <Customers />}
        {route === 'deals' && <Deals />}
        {route === 'activities' && <Activities />}
      </main>
      <style>{`
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }

        .header-top h1 {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 20px;
          color: white;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .username {
          font-weight: 600;
          font-size: 14px;
        }

        .user-role {
          font-size: 12px;
          opacity: 0.85;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
        }

        .btn-logout {
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.4);
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .btn-logout:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.7);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        nav {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .nav-btn {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          padding: 10px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateY(-2px);
        }

        .nav-btn.active {
          background: rgba(255, 255, 255, 0.35);
          border-color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  )
}
