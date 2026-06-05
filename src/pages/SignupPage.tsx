import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, PawPrint, FileCheck, PenTool, Check, ChevronRight, ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { UserDog, UserAddress, UserVaccines } from '../lib/types';

const steps = [
  { step: 1, icon: <User className="w-5 h-5" />, title: 'Your Profile', subtitle: 'Account & Address' },
  { step: 2, icon: <PawPrint className="w-5 h-5" />, title: 'Pet Biometrics', subtitle: 'Dog Profile Builder' },
  { step: 3, icon: <FileCheck className="w-5 h-5" />, title: 'Health Vault', subtitle: 'Vaccine Credentials' },
  { step: 4, icon: <PenTool className="w-5 h-5" />, title: 'Legal Release', subtitle: 'Liability Agreement' },
];

export default function SignupPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState<UserAddress>({ line1: '', city: '', province: '', postalCode: '' });

  const [dog, setDog] = useState<UserDog>({ name: '', breed: '', weight: 0, age: 0, energyLevel: '', reactivityNotes: '' });

  const [vaccines, setVaccines] = useState<UserVaccines>({ rabiesFileName: '', dhppFileName: '', vetName: '', vetPhone: '' });

  const [legalAccepted, setLegalAccepted] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const canProceed = () => {
    switch (activeStep) {
      case 0: return name && email && password.length >= 6 && address.line1 && address.city && address.province && address.postalCode;
      case 1: return dog.name && dog.breed && dog.weight > 0 && dog.age > 0;
      case 2: return vaccines.vetName && vaccines.vetPhone;
      case 3: return legalAccepted;
      default: return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;
    setActiveStep(Math.min(3, activeStep + 1));
  };

  const handleSubmit = async () => {
    if (!legalAccepted) return;
    setSaving(true);
    setError('');
    const result = await signup({
      email, password, name, phone,
      address,
      dog,
      vaccines,
      legalAccepted,
      legalAcceptedAt: new Date().toISOString(),
    });
    setSaving(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error ?? 'Signup failed.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Sidebar nav */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col p-6 border-r border-dark-600">
        <Link to="/" className="flex items-center mb-10">
          <img src="/images/zvm_companyname_logo.png" alt="ZoomieVan" className="h-6 w-auto" />
        </Link>
        <nav className="space-y-1 flex-1">
          {steps.map((s, i) => (
            <button
              key={s.step}
              onClick={() => { if (i <= activeStep) setActiveStep(i); }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                activeStep === i ? 'bg-brand-500/10 border border-brand-500/30' : 'hover:bg-dark-800 border border-transparent'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                activeStep === i ? 'bg-brand-500 text-white' :
                i < activeStep ? 'bg-green-500/20 text-green-400' : 'bg-dark-700 text-dark-400'
              }`}>
                {i < activeStep ? <Check className="w-4 h-4" /> : s.icon}
              </div>
              <div>
                <p className={`text-sm font-semibold ${activeStep === i ? 'text-white' : 'text-dark-300'}`}>{s.title}</p>
                <p className="text-xs text-dark-400">{s.subtitle}</p>
              </div>
            </button>
          ))}
        </nav>
        <Link to="/login" className="flex items-center gap-2 text-sm text-dark-400 hover:text-dark-200">
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-dark-600">
          <Link to="/" className="flex items-center">
            <img src="/images/zvm_companyname_logo.png" alt="ZoomieVan" className="h-6 w-auto" />
          </Link>
          <Link to="/login" className="text-sm text-dark-400 hover:text-dark-200">Sign In</Link>
        </div>

        {/* Mobile step indicator */}
        <div className="lg:hidden flex gap-1 px-4 pt-4">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= activeStep ? 'bg-brand-500' : 'bg-dark-600'}`} />
          ))}
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <motion.div key={activeStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            {/* Step header */}
            <div className="mb-8">
              <span className="text-xs font-mono text-brand-400 bg-brand-500/10 px-2 py-1 rounded">STEP {activeStep + 1} OF 4</span>
              <h1 className="font-display text-2xl font-bold text-white mt-2">{steps[activeStep].title}</h1>
            </div>

            {activeStep === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-dark-400 uppercase tracking-wider">Full Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="w-full h-11 bg-dark-800 border border-dark-500 rounded-xl px-4 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-dark-400 uppercase tracking-wider">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" className="w-full h-11 bg-dark-800 border border-dark-500 rounded-xl px-4 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-dark-400 uppercase tracking-wider">Password (min 6 chars)</label>
                    <div className="relative">
                      <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••" className="w-full h-11 bg-dark-800 border border-dark-500 rounded-xl px-4 pr-10 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
                      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200">
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-dark-400 uppercase tracking-wider">Phone</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="w-full h-11 bg-dark-800 border border-dark-500 rounded-xl px-4 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-dark-400 uppercase tracking-wider">Address</label>
                  <input value={address.line1} onChange={e => setAddress({ ...address, line1: e.target.value })} placeholder="123 Main St" className="w-full h-11 bg-dark-800 border border-dark-500 rounded-xl px-4 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-dark-400 uppercase tracking-wider">City</label>
                    <input value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} placeholder="Toronto" className="w-full h-11 bg-dark-800 border border-dark-500 rounded-xl px-4 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-dark-400 uppercase tracking-wider">Province</label>
                    <select value={address.province} onChange={e => setAddress({ ...address, province: e.target.value })} className="w-full h-11 bg-dark-800 border border-dark-500 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-brand-500/50">
                      <option value="">Select</option>
                      {['AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT'].map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-dark-400 uppercase tracking-wider">Postal Code</label>
                    <input value={address.postalCode} onChange={e => setAddress({ ...address, postalCode: e.target.value.toUpperCase() })} placeholder="M5V 2T6" className="w-full h-11 bg-dark-800 border border-dark-500 rounded-xl px-4 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-dark-400 uppercase tracking-wider">Dog Name</label>
                    <input value={dog.name} onChange={e => setDog({ ...dog, name: e.target.value })} placeholder="Max" className="w-full h-11 bg-dark-800 border border-dark-500 rounded-xl px-4 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-dark-400 uppercase tracking-wider">Breed</label>
                    <input value={dog.breed} onChange={e => setDog({ ...dog, breed: e.target.value })} placeholder="Golden Retriever" className="w-full h-11 bg-dark-800 border border-dark-500 rounded-xl px-4 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-dark-400 uppercase tracking-wider">Weight (lbs)</label>
                    <input type="number" value={dog.weight || ''} onChange={e => setDog({ ...dog, weight: Number(e.target.value) })} placeholder="65" className="w-full h-11 bg-dark-800 border border-dark-500 rounded-xl px-4 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-dark-400 uppercase tracking-wider">Age (years)</label>
                    <input type="number" value={dog.age || ''} onChange={e => setDog({ ...dog, age: Number(e.target.value) })} placeholder="3" className="w-full h-11 bg-dark-800 border border-dark-500 rounded-xl px-4 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-dark-400 uppercase tracking-wider">Energy Level</label>
                  <select value={dog.energyLevel} onChange={e => setDog({ ...dog, energyLevel: e.target.value })} className="w-full h-11 bg-dark-800 border border-dark-500 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-brand-500/50">
                    <option value="">Select...</option>
                    <option>Low — couch potato</option>
                    <option>Moderate — daily walks</option>
                    <option>High — needs serious exercise</option>
                    <option>Extreme — endless energy</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-dark-400 uppercase tracking-wider">Reactivity Notes</label>
                  <textarea value={dog.reactivityNotes} onChange={e => setDog({ ...dog, reactivityNotes: e.target.value })} placeholder="Any behavioral notes, fears, or special handling instructions..." className="w-full h-24 bg-dark-800 border border-dark-500 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50 resize-none" />
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-dark-400 uppercase tracking-wider">Rabies Certificate</label>
                    <label className="flex items-center justify-center h-20 border-2 border-dashed border-dark-500 rounded-xl cursor-pointer hover:border-brand-500/50 transition-colors">
                      <span className="text-sm text-dark-400">{vaccines.rabiesFileName || 'Click to upload'}</span>
                      <input type="file" accept=".pdf,.jpg,.png" onChange={e => setVaccines({ ...vaccines, rabiesFileName: e.target.files?.[0]?.name || '' })} className="hidden" />
                    </label>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-dark-400 uppercase tracking-wider">DHPP Certificate</label>
                    <label className="flex items-center justify-center h-20 border-2 border-dashed border-dark-500 rounded-xl cursor-pointer hover:border-brand-500/50 transition-colors">
                      <span className="text-sm text-dark-400">{vaccines.dhppFileName || 'Click to upload'}</span>
                      <input type="file" accept=".pdf,.jpg,.png" onChange={e => setVaccines({ ...vaccines, dhppFileName: e.target.files?.[0]?.name || '' })} className="hidden" />
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-dark-400 uppercase tracking-wider">Vet Name</label>
                    <input value={vaccines.vetName} onChange={e => setVaccines({ ...vaccines, vetName: e.target.value })} placeholder="Dr. Smith" className="w-full h-11 bg-dark-800 border border-dark-500 rounded-xl px-4 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-dark-400 uppercase tracking-wider">Vet Phone</label>
                    <input value={vaccines.vetPhone} onChange={e => setVaccines({ ...vaccines, vetPhone: e.target.value })} placeholder="(555) 123-4567" className="w-full h-11 bg-dark-800 border border-dark-500 rounded-xl px-4 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50" />
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-6">
                <div className="p-6 bg-dark-800/50 rounded-xl border border-dark-600 space-y-4 text-sm text-dark-200 leading-relaxed">
                  <p><strong className="text-white">Liability Waiver</strong></p>
                  <p>I acknowledge that participation in ZoomieVan mobile dog gym sessions involves physical activity for my dog. I understand the risks and agree to hold ZoomieVan, its handlers, and affiliates harmless from any claims arising from my dog's participation.</p>
                  <p>I confirm that my dog is in good health and that I have disclosed any known medical conditions, behavioral issues, or reactivity concerns.</p>
                  <p>I consent to photo/video documentation for training and quality assurance purposes. I understand I can opt out at any time.</p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={legalAccepted}
                    onChange={e => setLegalAccepted(e.target.checked)}
                    className="mt-0.5 rounded border-dark-500 bg-dark-800 text-brand-500 focus:ring-brand-500"
                  />
                  <span className="text-sm text-dark-200">I have read and agree to the terms above.</span>
                </label>
              </div>
            )}

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                {error}
              </motion.p>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-dark-600">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                className={`px-5 py-2.5 text-sm font-medium rounded-xl border border-dark-500 text-dark-200 hover:bg-dark-700 transition-colors ${activeStep === 0 ? 'opacity-30 pointer-events-none' : ''}`}
              >
                Back
              </button>
              {activeStep < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-brand-500 text-white hover:bg-brand-400 transition-colors disabled:opacity-40 flex items-center gap-1.5"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || saving}
                  className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/25 disabled:opacity-40 flex items-center gap-1.5"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
