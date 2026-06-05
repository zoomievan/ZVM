import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Settings, MapPinned, ShieldCheck,
  Truck, Receipt, ArrowLeft, PawPrint, Menu, X
} from 'lucide-react';
import AdminDashboard from './admin/Dashboard';
import AdminCMSPanel from './admin/CMSPanel';
import AdminFSAPanel from './admin/FSAPanel';
import AdminVaccinePanel from './admin/VaccinePanel';
import AdminFleetPanel from './admin/FleetPanel';
import AdminReports from './admin/Reports';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'cms', label: 'CMS', icon: Settings },
  { id: 'fsa', label: 'FSA Manager', icon: MapPinned },
  { id: 'vaccines', label: 'Vaccines', icon: ShieldCheck },
  { id: 'fleet', label: 'Fleet', icon: Truck },
  { id: 'reports', label: 'Reports', icon: Receipt },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setSidebarOpen(false);
  };

  const renderPanel = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard />;
      case 'cms': return <AdminCMSPanel />;
      case 'fsa': return <AdminFSAPanel />;
      case 'vaccines': return <AdminVaccinePanel />;
      case 'fleet': return <AdminFleetPanel />;
      case 'reports': return <AdminReports />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-56 lg:w-64 bg-dark-800 border-r border-dark-600 flex flex-col shrink-0 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4 border-b border-dark-600 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/images/zvm_companyname_logo.png" alt="ZoomieVan" className="h-6 w-auto" />
            <span className="text-[10px] text-dark-400 uppercase tracking-wider mt-1.5">Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-dark-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                  : 'text-dark-300 hover:text-dark-100 hover:bg-dark-700/50 border border-transparent'
              }`}
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-dark-600">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-dark-400 hover:text-dark-200 rounded-xl hover:bg-dark-700/50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto min-w-0">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 lg:hidden flex items-center gap-3 px-4 py-3 bg-dark-800/90 backdrop-blur-sm border-b border-dark-600">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 text-dark-300 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-display font-bold text-white">
            Admin
          </span>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {renderPanel()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
