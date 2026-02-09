import React, {useEffect, useState} from 'react'
import API from '../services/api'

export default function DealForm({editing, onSaved}){
  const [form, setForm] = useState({customer_id:'', title:'', stage:'New', value:'', due_date:''})
  const [loading, setLoading] = useState(false)
  
  useEffect(()=>{ if(editing) setForm({...editing}) },[editing])
  
  const save = async ()=>{
    if(!form.customer_id.trim()) { alert('Customer ID is required'); return }
    if(!form.title.trim()) { alert('Title is required'); return }
    setLoading(true)
    try {
      if(editing && editing.id){
        await API.put(`/deals/${editing.id}`, form)
      } else {
        await API.post('/deals', form)
      }
      setForm({customer_id:'', title:'', stage:'New', value:'', due_date:''})
      onSaved && onSaved()
    } catch(e) {
      alert('Error: '+e.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="form-section">
      <h3>{editing ? '✏️ Edit Deal' : '➕ Add New Deal'}</h3>
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
          placeholder="Deal Title *" 
          value={form.title} 
          onChange={e=>setForm({...form, title:e.target.value})}
          disabled={loading}
        />
      </div>
      <div className="form-row">
        <select value={form.stage} onChange={e=>setForm({...form, stage:e.target.value})} disabled={loading}>
          <option>New</option>
          <option>Contacted</option>
          <option>Negotiation</option>
          <option>Won</option>
          <option>Lost</option>
        </select>
      </div>
      <div className="form-row">
        <input 
          placeholder="Deal Value ($)" 
          type="number"
          value={form.value} 
          onChange={e=>setForm({...form, value:e.target.value})}
          disabled={loading}
        />
      </div>
      <div className="form-row">
        <input 
          type="date" 
          value={form.due_date || ''} 
          onChange={e=>setForm({...form, due_date:e.target.value})}
          disabled={loading}
          placeholder="Due Date"
        />
      </div>
      <div className="button-group">
        <button onClick={save} disabled={loading} style={{flex: 1}}>
          {loading ? '⏳ Saving...' : '💾 Save Deal'}
        </button>
      </div>
    </div>
  )
}
