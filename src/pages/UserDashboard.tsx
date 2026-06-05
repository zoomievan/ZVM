import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, PawPrint, ShieldCheck, MapPinned, LogOut, Calendar, ChevronRight } from 'lucide-react';
import { useAuth } from '../lib/auth';

export default function UserDashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const details = [
    { icon: User, label: 'Name', value: user.name },
    { icon: MapPinned, label: 'Address', value: `${user.address.line1}, ${user.address.city}, ${user.address.province} ${user.address.postalCode}` },
    { icon: PawPrint, label: 'Dog', value: `${user.dog.name} — ${user.dog.breed}, ${user.dog.weight}lbs, ${user.dog.age}yrs` },
    { icon: ShieldCheck, label: 'Vaccines', value: user.vaccines.rabiesFileName ? 'Rabies + DHPP submitted' : 'Not yet submitted' },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-dark-600">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center">
            <PawPrint className="w-4 h-4 text-white" />
          </div>
          <span className="font-display text-sm font-bold text-white">Zoomie<span className="text-brand-500">Van</span></span>
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-dark-300 hover:text-red-400 transition-colors rounded-xl hover:bg-dark-800">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-white">Welcome, {user.name.split(' ')[0]}</h1>
          <p className="text-dark-300 mt-1">Manage your profile and book sessions.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {details.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-5 bg-dark-800/50 rounded-xl border border-dark-600"
            >
              <div className="flex items-center gap-2 mb-2">
                <d.icon className="w-4 h-4 text-brand-400" />
                <span className="text-xs text-dark-400 uppercase tracking-wider">{d.label}</span>
              </div>
              <p className="text-sm text-white">{d.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 p-5 bg-brand-500/5 rounded-xl border border-brand-500/20"
        >
          <p className="text-sm text-dark-300 mb-4">
            Your vaccine records are pending review by our team. You'll be notified once approved.
          </p>
          <Link
            to="/#pricing"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/25"
          >
            <Calendar className="w-4 h-4" /> Book a Session <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
