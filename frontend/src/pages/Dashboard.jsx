import React, { useEffect, useState } from 'react'
import API from '../services/api'

export default function Dashboard(){
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{ 
    API.get('/dashboard')
      .then(r=>{ setStats(r.data); setLoading(false) })
      .catch(()=>{ setLoading(false) })
  },[])
  
  if(loading) return <div style={{textAlign:'center', padding:'40px'}}>⏳ Loading dashboard...</div>
  if(!stats) return <div style={{textAlign:'center', padding:'40px', color:'#f5576c'}}>❌ Failed to load dashboard</div>
  
  return (
    <div>
      <h2>📊 Dashboard Overview</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '30px'}}>
        <div className="stat-card">
          <div>Total Customers</div>
          <strong>{stats.customers}</strong>
        </div>
        <div className="stat-card" style={{borderLeftColor: '#764ba2'}}>
          <div>Active Deals</div>
          <strong>{stats.deals}</strong>
        </div>
        <div className="stat-card" style={{borderLeftColor: '#4facfe'}}>
          <div>Activities</div>
          <strong>{stats.activities}</strong>
        </div>
      </div>
      
      <h3>📝 Recent Activities</h3>
      <div className="list">
        {stats.recent_activities && stats.recent_activities.length > 0 ? (
          stats.recent_activities.map(a=> (
            <div key={a.id} className="recent-activity">
              <strong>{a.title}</strong> — <span style={{color: '#667eea'}}>{a.type}</span>
              <div className="time">{new Date(a.date).toLocaleString()}</div>
            </div>
          ))
        ) : (
          <div style={{textAlign: 'center', color: '#999', padding: '20px'}}>No recent activities</div>
        )}
      </div>
    </div>
  )
}
