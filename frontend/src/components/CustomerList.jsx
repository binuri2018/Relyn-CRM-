import React from 'react'
import API from '../services/api'

export default function CustomerList({items = [], onEdit, onRefresh}){
  const remove = (id)=>{
    if(!confirm('Are you sure you want to delete this customer?')) return
    API.delete(`/customers/${id}`).then(()=>onRefresh()).catch(e=>alert('Error: '+e.message))
  }
  return (
    <div className="list">
      {items.length === 0 ? (
        <div style={{textAlign: 'center', padding: '40px', color: '#999'}}>
          📭 No customers found
        </div>
      ) : (
        items.map(c=> (
          <div key={c.id} className="card">
            <strong>👤 {c.name}</strong>
            <div style={{marginTop: '8px', fontSize: '14px', color: '#666'}}>
              {c.company && <div>🏢 {c.company}</div>}
              {c.email && <div>📧 {c.email}</div>}
              {c.phone && <div>📱 {c.phone}</div>}
              {c.tags && <div style={{marginTop: '8px'}}><span style={{background: '#667eea', color: 'white', padding: '2px 8px', borderRadius: '3px', fontSize: '12px'}}>🏷️ {c.tags}</span></div>}
            </div>
            <div className="button-group">
              <button className="success" style={{flex: 1}} onClick={()=>onEdit(c)}>✏️ Edit</button>
              <button className="danger" style={{flex: 1}} onClick={()=>remove(c.id)}>🗑️ Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
