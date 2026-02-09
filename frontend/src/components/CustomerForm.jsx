import React, {useEffect, useState} from 'react'
import API from '../services/api'

export default function CustomerForm({editing, onSaved}){
  const [form, setForm] = useState({name:'', email:'', phone:'', company:'', tags:''})
  const [loading, setLoading] = useState(false)
  
  useEffect(()=>{ if(editing) setForm({...editing}) },[editing])
  
  const save = async ()=>{
    if(!form.name.trim()) { alert('Name is required'); return }
    setLoading(true)
    try {
      if(editing && editing.id){
        await API.put(`/customers/${editing.id}`, form)
      } else {
        await API.post('/customers', form)
      }
      setForm({name:'', email:'', phone:'', company:'', tags:''})
      onSaved && onSaved()
    } catch(e) {
      alert('Error: '+e.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="form-section">
      <h3>{editing ? '✏️ Edit Customer' : '➕ Add New Customer'}</h3>
      <div className="form-row">
        <input 
          placeholder="Full Name *" 
          value={form.name} 
          onChange={e=>setForm({...form, name:e.target.value})}
          disabled={loading}
        />
      </div>
      <div className="form-row">
        <input 
          placeholder="Email" 
          type="email"
          value={form.email} 
          onChange={e=>setForm({...form, email:e.target.value})}
          disabled={loading}
        />
      </div>
      <div className="form-row">
        <input 
          placeholder="Phone" 
          value={form.phone} 
          onChange={e=>setForm({...form, phone:e.target.value})}
          disabled={loading}
        />
      </div>
      <div className="form-row">
        <input 
          placeholder="Company" 
          value={form.company} 
          onChange={e=>setForm({...form, company:e.target.value})}
          disabled={loading}
        />
      </div>
      <div className="form-row">
        <input 
          placeholder="Tags (comma-separated)" 
          value={form.tags} 
          onChange={e=>setForm({...form, tags:e.target.value})}
          disabled={loading}
        />
      </div>
      <div className="button-group">
        <button onClick={save} disabled={loading} style={{flex: 1}}>
          {loading ? '⏳ Saving...' : '💾 Save Customer'}
        </button>
      </div>
    </div>
  )
}
