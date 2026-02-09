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
          <h1>📊 Simple CRM Platform</h1>
          <div className="user-info">
            <span>👤 {user.username} ({user.role})</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
        <nav>
          <button onClick={()=>setRoute('dashboard')} style={{background: route==='dashboard' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}}>📈 Dashboard</button>
          <button onClick={()=>setRoute('customers')} style={{background: route==='customers' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}}>👥 Customers</button>
          <button onClick={()=>setRoute('deals')} style={{background: route==='deals' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}}>🤝 Deals</button>
          <button onClick={()=>setRoute('activities')} style={{background: route==='activities' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}}>✅ Activities</button>
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
          margin-bottom: 20px;
        }

        .header-top h1 {
          margin: 0;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 15px;
          color: white;
          font-size: 14px;
        }

        .btn-logout {
          padding: 8px 16px;
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.5);
          color: white;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s;
        }

        .btn-logout:hover {
          background: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  )
}
