import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Plus, X, ShieldCheck, Clock, Trash2 } from 'lucide-react';
import { getAllVaccines, addVaccine, approveVaccine, rejectVaccine, deleteVaccine } from '../../lib/repositories/vaccineRepository';
import { VaccineRecord } from '../../lib/types';

export default function AdminVaccinePanel() {
  const [records, setRecords] = useState<VaccineRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ dogName: '', ownerName: '', vaccineType: '' });

  const load = useCallback(async () => {
    setLoading(true);
    setRecords(await getAllVaccines());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleApprove = async (id: string) => {
    await approveVaccine(id);
    load();
  };

  const handleReject = async (id: string) => {
    await rejectVaccine(id);
    load();
  };

  const handleAdd = async () => {
    if (!form.dogName || !form.ownerName || !form.vaccineType) return;
    await addVaccine(form);
    setShowForm(false);
    setForm({ dogName: '', ownerName: '', vaccineType: '' });
    load();
  };

  const handleDelete = async (id: string) => {
    await deleteVaccine(id);
    load();
  };

  const pending = records.filter(r => r.status === 'pending');
  const approved = records.filter(r => r.status === 'approved');
  const rejected = records.filter(r => r.status === 'rejected');

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => <div key={i} className="h-16 skeleton-shimmer rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Vaccine Verification</h2>
          <p className="text-dark-300 text-sm mt-1">{pending.length} records awaiting review.</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add Record'}
        </motion.button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 bg-dark-700/50 rounded-xl border border-dark-600 space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input value={form.dogName} onChange={e => setForm({ ...form, dogName: e.target.value })} placeholder="Dog name" className="h-11 bg-dark-700 border border-dark-500 rounded-lg px-3 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
            <input value={form.ownerName} onChange={e => setForm({ ...form, ownerName: e.target.value })} placeholder="Owner name" className="h-11 bg-dark-700 border border-dark-500 rounded-lg px-3 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
            <input value={form.vaccineType} onChange={e => setForm({ ...form, vaccineType: e.target.value })} placeholder="Vaccine type (e.g. Rabies)" className="h-11 bg-dark-700 border border-dark-500 rounded-lg px-3 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
          </div>
          <motion.button whileTap={{ scale: 0.97 }} onClick={handleAdd} className="px-4 py-2 text-sm font-semibold text-white bg-brand-500 rounded-lg hover:bg-brand-400 transition-colors">
            Add to Queue
          </motion.button>
        </motion.div>
      )}

      {pending.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4" /> Pending Review ({pending.length})
          </h3>
          <div className="space-y-2">
            {pending.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="flex items-center justify-between p-3 bg-dark-700/50 rounded-xl border border-dark-600"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center text-sm">
                    <ShieldCheck className="w-4 h-4 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.dogName} <span className="text-dark-400 font-normal">— {item.ownerName}</span></p>
                    <p className="text-xs text-dark-400">{item.vaccineType} · {new Date(item.submittedAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleApprove(item.id)} className="p-2.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleReject(item.id)} className="p-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4" /> Approved ({approved.length})
          </h3>
          {approved.length === 0 ? (
            <p className="text-xs text-dark-400">No approved records.</p>
          ) : (
            <div className="space-y-2">
              {approved.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-dark-700/30 rounded-xl border border-dark-600">
                  <div>
                    <p className="text-sm text-dark-200">{item.dogName} — {item.ownerName}</p>
                    <p className="text-xs text-dark-400">{item.vaccineType}</p>
                  </div>
                  <button onClick={() => handleDelete(item.id)} className="p-1 rounded-lg text-dark-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-red-400 flex items-center gap-2 mb-3">
            <XCircle className="w-4 h-4" /> Rejected ({rejected.length})
          </h3>
          {rejected.length === 0 ? (
            <p className="text-xs text-dark-400">No rejected records.</p>
          ) : (
            <div className="space-y-2">
              {rejected.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-dark-700/30 rounded-xl border border-dark-600">
                  <div>
                    <p className="text-sm text-dark-200">{item.dogName} — {item.ownerName}</p>
                    <p className="text-xs text-dark-400">{item.vaccineType}</p>
                  </div>
                  <button onClick={() => handleDelete(item.id)} className="p-1 rounded-lg text-dark-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
