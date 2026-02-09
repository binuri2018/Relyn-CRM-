import React, {useEffect, useState} from 'react'
import API from '../services/api'
import ActivityList from '../components/ActivityList'
import ActivityForm from '../components/ActivityForm'

export default function Activities(){
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = ()=> API.get('/activities').then(r=>setItems(r.data)).catch(e=>console.error(e))
  useEffect(()=>{ load() },[])
  
  return (
    <div>
      <h2>✅ Activities Log</h2>
      
      <div style={{marginBottom: '20px'}}>
        <button className="success" onClick={()=>{ setShowForm(!showForm); setEditing(null) }}>
          {showForm ? '✕ Cancel' : '+ Log Activity'}
        </button>
      </div>

      {showForm && (
        <ActivityForm onSaved={()=>{ setShowForm(false); setEditing(null); load() }} editing={editing} />
      )}

      <div style={{marginTop: '20px', color: '#999', fontSize: '14px'}}>
        Total activities: {items.length}
      </div>
      
      <ActivityList items={items} onEdit={a=>{ setEditing(a); setShowForm(true); }} onRefresh={load} />
    </div>
  )
}
