import React from 'react'
import API from '../services/api'

const stageEmoji = {
  'New': '🆕',
  'Contacted': '📞',
  'Negotiation': '💬',
  'Won': '✅',
  'Lost': '❌'
}

export default function DealList({items=[], onEdit, onRefresh}){
  const remove = (id)=>{ 
    if(!confirm('Are you sure you want to delete this deal?')) return
    API.delete(`/deals/${id}`).then(()=>onRefresh()).catch(e=>alert('Error: '+e.message))
  }
  
  return (
    <div className="list">
      {items.length === 0 ? (
        <div style={{textAlign: 'center', padding: '40px', color: '#999'}}>
          📭 No deals found
        </div>
      ) : (
        items.map(d=> (
          <div className="card" key={d.id}>
            <strong>💼 {d.title}</strong>
            <div style={{marginTop: '8px', fontSize: '14px', color: '#666'}}>
              <div>Stage: <span style={{background: '#667eea', color: 'white', padding: '2px 8px', borderRadius: '3px', fontSize: '12px'}}>{stageEmoji[d.stage] || '📊'} {d.stage}</span></div>
              {d.value && <div>💰 ${d.value.toLocaleString()}</div>}
              {d.due_date && <div>📅 Due: {new Date(d.due_date).toLocaleDateString()}</div>}
              <div>👤 Customer ID: {d.customer_id}</div>
            </div>
            <div className="button-group">
              <button className="success" style={{flex: 1}} onClick={()=>onEdit(d)}>✏️ Edit</button>
              <button className="danger" style={{flex: 1}} onClick={()=>remove(d.id)}>🗑️ Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
