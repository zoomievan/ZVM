import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Edit2, Trash2, Search } from 'lucide-react';
import { getAllZones, addZone, updateZone, deleteZone } from '../../lib/repositories/fsaRepository';
import { FSARecord } from '../../lib/types';

export default function AdminFSAPanel() {
  const [zones, setZones] = useState<FSARecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ fsa: '', city: '', province: '', tier: 'Tier 1' as const, surcharge: 0, status: 'pending' as const });

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getAllZones();
    setZones(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleAdd = async () => {
    if (!form.fsa || !form.city) return;
    await addZone({ ...form, surcharge: Number(form.surcharge) });
    setShowForm(false);
    setForm({ fsa: '', city: '', province: '', tier: 'Tier 1', surcharge: 0, status: 'pending' });
    load();
  };

  const handleDelete = async (id: string) => {
    await deleteZone(id);
    load();
  };

  const handleToggleStatus = async (zone: FSARecord) => {
    const nextStatus = zone.status === 'active' ? 'inactive' : zone.status === 'inactive' ? 'pending' : 'active';
    await updateZone(zone.id, { status: nextStatus });
    load();
  };

  const filtered = zones.filter(z =>
    z.fsa.toLowerCase().includes(search.toLowerCase()) ||
    z.city.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => <div key={i} className="h-12 skeleton-shimmer rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">FSA Zone Manager</h2>
          <p className="text-dark-300 text-sm mt-1">{zones.length} service zones configured.</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add Zone'}
        </motion.button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 bg-dark-700/50 rounded-xl border border-dark-600 space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <input value={form.fsa} onChange={e => setForm({ ...form, fsa: e.target.value.toUpperCase() })} placeholder="FSA (e.g. M5V)" className="h-11 bg-dark-700 border border-dark-500 rounded-lg px-3 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
            <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="City" className="h-11 bg-dark-700 border border-dark-500 rounded-lg px-3 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
            <input value={form.province} onChange={e => setForm({ ...form, province: e.target.value })} placeholder="Province (e.g. ON)" className="h-11 bg-dark-700 border border-dark-500 rounded-lg px-3 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
            <select value={form.tier} onChange={e => setForm({ ...form, tier: e.target.value as 'Tier 1' | 'Tier 2' })} className="h-11 bg-dark-700 border border-dark-500 rounded-lg px-3 text-sm text-white focus:outline-none focus:border-brand-500/50">
              <option>Tier 1</option>
              <option>Tier 2</option>
            </select>
            <input type="number" value={form.surcharge} onChange={e => setForm({ ...form, surcharge: Number(e.target.value) })} placeholder="Surcharge ($)" className="h-11 bg-dark-700 border border-dark-500 rounded-lg px-3 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
          </div>
          <motion.button whileTap={{ scale: 0.97 }} onClick={handleAdd} className="px-4 py-2 text-sm font-semibold text-white bg-brand-500 rounded-lg hover:bg-brand-400 transition-colors">
            Create Zone
          </motion.button>
        </motion.div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by FSA or city..."
          className="w-full h-10 bg-dark-700 border border-dark-500 rounded-lg pl-10 pr-3 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-dark-600">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="bg-dark-700">
              {['FSA', 'City', 'Province', 'Tier', 'Surcharge', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left p-3 text-xs text-dark-400 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-600">
            {filtered.map((zone) => (
              <tr key={zone.id} className="hover:bg-dark-700/50 transition-colors">
                <td className="p-3 font-mono text-brand-400 font-semibold">{zone.fsa}</td>
                <td className="p-3 text-dark-200">{zone.city}</td>
                <td className="p-3 text-dark-300">{zone.province}</td>
                <td className="p-3 text-dark-300">{zone.tier}</td>
                <td className="p-3 text-dark-300">${zone.surcharge}</td>
                <td className="p-3">
                  <button onClick={() => handleToggleStatus(zone)} className={`px-2 py-0.5 rounded text-xs font-medium cursor-pointer transition-colors ${
                    zone.status === 'active' ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' :
                    zone.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20' :
                    'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                  }`}>
                    {zone.status}
                  </button>
                </td>
                <td className="p-3">
                  <button onClick={() => handleDelete(zone.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="p-6 text-center text-dark-400 text-sm">No zones found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
