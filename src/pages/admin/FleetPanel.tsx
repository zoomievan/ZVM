import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Truck, Activity, Wrench, Power, Trash2 } from 'lucide-react';
import { getAllVans, addVan, updateVan, deleteVan, incrementSession } from '../../lib/repositories/fleetRepository';
import { FleetVan } from '../../lib/types';

export default function AdminFleetPanel() {
  const [vans, setVans] = useState<FleetVan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Pick<FleetVan, 'name' | 'location' | 'status'>>({
    name: '',
    location: '',
    status: 'Active',
  });

  const load = useCallback(async () => {
    setLoading(true);
    setVans(await getAllVans());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleAdd = async () => {
    if (!form.name) return;
    await addVan(form);
    setShowForm(false);
    setForm({ name: '', location: '', status: 'Active' });
    load();
  };

  const handleToggleStatus = async (van: FleetVan) => {
    const next: FleetVan['status'] = van.status === 'Active' ? 'Maintenance' : van.status === 'Maintenance' ? 'Offline' : 'Active';
    await updateVan(van.id, { status: next });
    load();
  };

  const handleIncrement = async (id: string) => {
    await incrementSession(id);
    load();
  };

  const handleDelete = async (id: string) => {
    await deleteVan(id);
    load();
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Activity className="w-4 h-4" />;
      case 'Maintenance': return <Wrench className="w-4 h-4" />;
      default: return <Power className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => <div key={i} className="h-20 skeleton-shimmer rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Fleet Management</h2>
          <p className="text-dark-300 text-sm mt-1">{vans.filter(v => v.status === 'Active').length} of {vans.length} vans active.</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add Van'}
        </motion.button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 bg-dark-700/50 rounded-xl border border-dark-600 space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Van name" className="h-11 bg-dark-700 border border-dark-500 rounded-lg px-3 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
            <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Location" className="h-11 bg-dark-700 border border-dark-500 rounded-lg px-3 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as FleetVan['status'] })} className="h-11 bg-dark-700 border border-dark-500 rounded-lg px-3 text-sm text-white focus:outline-none focus:border-brand-500/50">
              <option>Active</option>
              <option>Maintenance</option>
              <option>Offline</option>
            </select>
          </div>
          <motion.button whileTap={{ scale: 0.97 }} onClick={handleAdd} className="px-4 py-2 text-sm font-semibold text-white bg-brand-500 rounded-lg hover:bg-brand-400 transition-colors">
            Add Van
          </motion.button>
        </motion.div>
      )}

      <div className="space-y-3">
        {vans.map((van) => (
          <motion.div
            key={van.id}
            layout
            className="flex items-center justify-between p-4 bg-dark-700/50 rounded-xl border border-dark-600"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                van.status === 'Active' ? 'bg-green-500/10' :
                van.status === 'Maintenance' ? 'bg-amber-500/10' : 'bg-red-500/10'
              }`}>
                <Truck className={`w-5 h-5 ${
                  van.status === 'Active' ? 'text-green-400' :
                  van.status === 'Maintenance' ? 'text-amber-400' : 'text-red-400'
                }`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{van.name}</p>
                <p className="text-xs text-dark-400">{van.location} · {van.totalSessions} total sessions · {van.sessionsToday} today</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handleIncrement(van.id)} className="p-2.5 rounded-lg bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 transition-colors" title="Log session">
                <Activity className="w-4 h-4" />
              </button>
              <button onClick={() => handleToggleStatus(van)} className={`p-2.5 rounded-lg transition-colors ${
                van.status === 'Active' ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' :
                van.status === 'Maintenance' ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' :
                'bg-red-500/10 text-red-400 hover:bg-red-500/20'
              }`} title={`Status: ${van.status}`}>
                {statusIcon(van.status)}
              </button>
              <button onClick={() => handleDelete(van.id)} className="p-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
