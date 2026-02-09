import React from 'react'
import API from '../services/api'

const typeEmoji = {
  'Call': '📞',
  'Email': '📧',
  'Meeting': '👥'
}

export default function ActivityList({items=[], onEdit, onRefresh}){
  const remove = (id)=>{ 
    if(!confirm('Are you sure you want to delete this activity?')) return
    API.delete(`/activities/${id}`).then(()=>onRefresh()).catch(e=>alert('Error: '+e.message))
  }
  
  const toggleComplete = (a)=>{
    API.put(`/activities/${a.id}`, {completed: !a.completed})
      .then(()=>onRefresh())
      .catch(e=>alert('Error: '+e.message))
  }
  
  return (
    <div className="list">
      {items.length === 0 ? (
        <div style={{textAlign: 'center', padding: '40px', color: '#999'}}>
          📭 No activities found
        </div>
      ) : (
        items.map(a=> (
          <div className="card" key={a.id} style={{opacity: a.completed ? 0.7 : 1, textDecoration: a.completed ? 'line-through' : 'none'}}>
            <strong>{typeEmoji[a.type] || '📋'} {a.title}</strong>
            <div style={{marginTop: '8px', fontSize: '14px', color: '#666'}}>
              <div>Type: <span style={{background: '#667eea', color: 'white', padding: '2px 8px', borderRadius: '3px', fontSize: '12px'}}>{a.type}</span></div>
              <div>📅 {new Date(a.date).toLocaleString()}</div>
              <div>👤 Customer ID: {a.customer_id}</div>
              <div style={{marginTop: '6px'}}>Status: {a.completed ? <span style={{color: '#4facfe', fontWeight: 'bold'}}>✅ Completed</span> : <span style={{color: '#f5576c'}}>⏳ Pending</span>}</div>
            </div>
            <div className="button-group">
              <button className={a.completed ? 'secondary' : 'success'} style={{flex: 1}} onClick={()=>toggleComplete(a)}>
                {a.completed ? '↺ Mark Pending' : '✓ Mark Done'}
              </button>
              <button className="secondary" style={{flex: 1}} onClick={()=>onEdit(a)}>✏️ Edit</button>
              <button className="danger" style={{flex: 1}} onClick={()=>remove(a.id)}>🗑️ Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
