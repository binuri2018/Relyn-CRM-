import React, {useEffect, useState} from 'react'
import API from '../services/api'
import CustomerList from '../components/CustomerList'
import CustomerForm from '../components/CustomerForm'

export default function Customers(){
  const [customers, setCustomers] = useState([])
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = ()=> API.get('/customers', {params: {search: query}}).then(r=>setCustomers(r.data)).catch(e=>console.error(e))
  useEffect(()=>{ load() },[])

  const handleSearch = ()=> load()

  return (
    <div>
      <h2>👥 Customers Management</h2>
      
      <div className="form-section">
        <div className="search-bar">
          <input placeholder="🔍 Search by name, email, or company..." value={query} onChange={e=>setQuery(e.target.value)} />
          <button className="success" onClick={handleSearch}>Search</button>
          <button onClick={()=>{ setShowForm(!showForm); setEditing(null) }}>
            {showForm ? '✕ Cancel' : '+ Add Customer'}
          </button>
        </div>
      </div>

      {showForm && (
        <CustomerForm 
          onSaved={()=>{ setShowForm(false); setEditing(null); load() }} 
          editing={editing} 
        />
      )}

      <div style={{marginTop: '20px', color: '#999', fontSize: '14px'}}>
        Found {customers.length} customer{customers.length !== 1 ? 's' : ''}
      </div>
      
      <CustomerList items={customers} onEdit={c=>{ setEditing(c); setShowForm(true); }} onRefresh={load} />
    </div>
  )
}
