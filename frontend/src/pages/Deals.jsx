import React, {useEffect, useState} from 'react'
import API from '../services/api'
import DealList from '../components/DealList'
import DealForm from '../components/DealForm'

export default function Deals(){
  const [deals, setDeals] = useState([])
  const [stageFilter, setStageFilter] = useState('')
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = ()=> API.get('/deals', {params: {stage: stageFilter}}).then(r=>setDeals(r.data)).catch(e=>console.error(e))
  useEffect(()=>{ load() },[])
  
  return (
    <div>
      <h2>🤝 Deals Pipeline</h2>
      
      <div className="form-section">
        <div className="search-bar">
          <select value={stageFilter} onChange={e=>setStageFilter(e.target.value)}>
            <option value="">📊 All Stages</option>
            <option value="New">🆕 New</option>
            <option value="Contacted">📞 Contacted</option>
            <option value="Negotiation">💬 Negotiation</option>
            <option value="Won">✅ Won</option>
            <option value="Lost">❌ Lost</option>
          </select>
          <button className="success" onClick={load}>Filter</button>
          <button onClick={()=>{ setShowForm(!showForm); setEditing(null) }}>
            {showForm ? '✕ Cancel' : '+ Add Deal'}
          </button>
        </div>
      </div>

      {showForm && (
        <DealForm onSaved={()=>{ setShowForm(false); setEditing(null); load() }} editing={editing} />
      )}

      <div style={{marginTop: '20px', color: '#999', fontSize: '14px'}}>
        {stageFilter ? `Showing ${stageFilter} deals` : `Showing all deals`} ({deals.length})
      </div>
      
      <DealList items={deals} onEdit={d=>{ setEditing(d); setShowForm(true); }} onRefresh={load} />
    </div>
  )
}
