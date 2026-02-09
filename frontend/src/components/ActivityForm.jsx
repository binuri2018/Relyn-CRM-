import React, {useEffect, useState} from 'react'
import API from '../services/api'

export default function ActivityForm({editing, onSaved}){
  const [form, setForm] = useState({customer_id:'', title:'', type:'Call', date:'', completed:false})
  const [loading, setLoading] = useState(false)
  
  useEffect(()=>{ if(editing) setForm({...editing}) },[editing])
  
  const save = async ()=>{
    if(!form.customer_id.trim()) { alert('Customer ID is required'); return }
    if(!form.title.trim()) { alert('Title is required'); return }
    setLoading(true)
    try {
      if(editing && editing.id){
        await API.put(`/activities/${editing.id}`, form)
      } else {
        await API.post('/activities', form)
      }
      setForm({customer_id:'', title:'', type:'Call', date:'', completed:false})
      onSaved && onSaved()
    } catch(e) {
      alert('Error: '+e.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="form-section">
      <h3>{editing ? '✏️ Edit Activity' : '➕ Log New Activity'}</h3>
      <div className="form-row">
        <input 
          placeholder="Customer ID *" 
          value={form.customer_id} 
          onChange={e=>setForm({...form, customer_id:e.target.value})}
          disabled={loading}
        />
      </div>
      <div className="form-row">
        <input 
          placeholder="Activity Title *" 
          value={form.title} 
          onChange={e=>setForm({...form, title:e.target.value})}
          disabled={loading}
        />
      </div>
      <div className="form-row">
        <select value={form.type} onChange={e=>setForm({...form, type:e.target.value})} disabled={loading}>
          <option value="Call">📞 Call</option>
          <option value="Email">📧 Email</option>
          <option value="Meeting">👥 Meeting</option>
        </select>
      </div>
      <div className="form-row">
        <input 
          type="datetime-local" 
          value={form.date || ''} 
          onChange={e=>setForm({...form, date:e.target.value})}
          disabled={loading}
        />
      </div>
      <div className="form-row">
        <label>
          <input 
            type="checkbox" 
            checked={form.completed} 
            onChange={e=>setForm({...form, completed: e.target.checked})}
            disabled={loading}
          />
          Mark as completed
        </label>
      </div>
      <div className="button-group">
        <button onClick={save} disabled={loading} style={{flex: 1}}>
          {loading ? '⏳ Saving...' : '💾 Save Activity'}
        </button>
      </div>
    </div>
  )
}
