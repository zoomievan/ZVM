import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, PenTool, Check, ChevronRight, ArrowLeft, Loader2, Eye, EyeOff, PawPrint, ShieldCheck } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { UserAddress } from '../lib/types';

const steps = [
  { step: 1, icon: User, title: 'Your Profile', subtitle: 'Account and route details' },
  { step: 2, icon: PenTool, title: 'Safety Release', subtitle: 'Agreement before booking' },
];

const inputClass = 'h-11 w-full rounded-xl border border-[#d6bdab] bg-[#fffaf2] px-4 text-sm text-[#2b1d16] placeholder:text-[#8d7565] focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

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
  const [legalAccepted, setLegalAccepted] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return name && email && password.length >= 6 && address.line1 && address.city && address.province && address.postalCode;
      case 1:
        return legalAccepted;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;
    setActiveStep(1);
  };

  const handleSubmit = async () => {
    if (!legalAccepted) return;
    setSaving(true);
    setError('');
    const result = await signup({
      email,
      password,
      name,
      phone,
      address,
      dog: { name: '', breed: '', weight: 0, age: 0, energyLevel: '', reactivityNotes: '' },
      vaccines: { rabiesFileName: '', dhppFileName: '', vetName: '', vetPhone: '' },
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
    <main className="relative min-h-screen overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="absolute left-0 top-24 h-80 w-80 rounded-full bg-[#dff3ff] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#fff2de] blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-6 lg:grid-cols-[310px_1fr]">
        <aside className="friendly-card hidden rounded-3xl border border-[#ead8c6] bg-white p-6 shadow-xl shadow-[#513a2a]/5 lg:block">
          <Link to="/" className="mb-9 flex items-center">
            <img src="/images/zvm_companyname_logo.png" alt="ZoomieVan" className="h-8 w-auto" />
          </Link>

          <div className="keep-white mb-8 rounded-3xl bg-[#2b1d16] p-5 text-white">
            <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3 text-[#ffcf8a]">
              <PawPrint className="h-6 w-6" />
            </div>
            <h1 className="font-display text-2xl font-bold leading-tight">Start with one happy run.</h1>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Create your account, share route details, and complete the safety release before booking.
            </p>
          </div>

          <nav className="space-y-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const complete = index < activeStep;
              const active = activeStep === index;
              return (
                <button
                  key={step.step}
                  onClick={() => { if (index <= activeStep) setActiveStep(index); }}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                    active ? 'border-brand-300 bg-brand-50' : 'border-transparent hover:bg-[#fffaf2]'
                  }`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    active ? 'bg-brand-500 text-white' : complete ? 'bg-[#e8f7ec] text-[#16743c]' : 'bg-[#fff2de] text-[#8d7565]'
                  }`}>
                    {complete ? <Check className="h-4 w-4" /> : <Icon className="h-5 w-5" />}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-[#2b1d16]">{step.title}</span>
                    <span className="block text-xs text-[#8d7565]">{step.subtitle}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          <Link to="/login" className="mt-8 flex items-center gap-2 text-sm font-bold text-[#6f5848] hover:text-brand-600">
            <ArrowLeft className="h-4 w-4" /> Back to sign in
          </Link>
        </aside>

        <section className="friendly-card rounded-3xl border border-[#ead8c6] bg-white p-5 shadow-xl shadow-[#513a2a]/5 sm:p-8">
          <div className="mb-7 flex flex-col gap-4 border-b border-[#ead8c6] pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fff2de] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-brand-600">
                Step {activeStep + 1} of {steps.length}
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-[#2b1d16]">{steps[activeStep].title}</h2>
              <p className="mt-1 text-sm text-[#6f5848]">{steps[activeStep].subtitle}</p>
            </div>
            <Link to="/login" className="text-sm font-bold text-[#6f5848] hover:text-brand-600 lg:hidden">Sign in</Link>
          </div>

          <motion.div key={activeStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            {activeStep === 0 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-[0.12em] text-[#8d7565]">Full name</label>
                    <input value={name} onChange={(event) => setName(event.target.value)} placeholder="John Doe" className={inputClass} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-[0.12em] text-[#8d7565]">Email</label>
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="john@example.com" className={inputClass} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-[0.12em] text-[#8d7565]">Password</label>
                    <div className="relative">
                      <input type={showPw ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimum 6 characters" className={`${inputClass} pr-10`} />
                      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8d7565] hover:text-brand-600">
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-[0.12em] text-[#8d7565]">Phone</label>
                    <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+1 (555) 000-0000" className={inputClass} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-[0.12em] text-[#8d7565]">Street address</label>
                  <input value={address.line1} onChange={(event) => setAddress({ ...address, line1: event.target.value })} placeholder="123 Main St" className={inputClass} />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-[0.12em] text-[#8d7565]">City</label>
                    <input value={address.city} onChange={(event) => setAddress({ ...address, city: event.target.value })} placeholder="Toronto" className={inputClass} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-[0.12em] text-[#8d7565]">Province</label>
                    <select value={address.province} onChange={(event) => setAddress({ ...address, province: event.target.value })} className={inputClass}>
                      <option value="">Select</option>
                      {['AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT'].map((province) => <option key={province}>{province}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-[0.12em] text-[#8d7565]">Postal code</label>
                    <input value={address.postalCode} onChange={(event) => setAddress({ ...address, postalCode: event.target.value.toUpperCase() })} placeholder="M5V 2T6" className={inputClass} />
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-[#ead8c6] bg-[#fffaf2] p-6 text-sm leading-relaxed text-[#4d392d]">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-2xl bg-[#e8f7ec] p-3 text-[#16743c]">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <strong className="font-display text-xl text-[#2b1d16]">Liability waiver</strong>
                  </div>
                  <p>I acknowledge that participation in ZoomieVan mobile dog gym sessions involves physical activity for my dog. I understand the risks and agree to hold ZoomieVan, its handlers, and affiliates harmless from any claims arising from my dog's participation.</p>
                  <p className="mt-3">I confirm that my dog is in good health and that I have disclosed any known medical conditions, behavioral issues, or reactivity concerns.</p>
                  <p className="mt-3">I consent to photo and video documentation for training and quality assurance purposes. I understand I can opt out at any time.</p>
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#ead8c6] bg-white p-4">
                  <input
                    type="checkbox"
                    checked={legalAccepted}
                    onChange={(event) => setLegalAccepted(event.target.checked)}
                    className="mt-1 rounded border-[#d6bdab] text-brand-500 focus:ring-brand-500"
                  />
                  <span className="text-sm font-semibold text-[#4d392d]">I have read and agree to the terms above.</span>
                </label>
              </div>
            )}

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </motion.p>
            )}

            <div className="mt-8 flex justify-between border-t border-[#ead8c6] pt-6">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                className={`rounded-xl border border-[#d6bdab] px-5 py-2.5 text-sm font-bold text-[#6f5848] transition hover:bg-[#fffaf2] ${activeStep === 0 ? 'pointer-events-none opacity-30' : ''}`}
              >
                Back
              </button>
              {activeStep < 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="keep-white flex items-center gap-1.5 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold transition hover:bg-brand-600 disabled:opacity-40"
                >
                  Continue <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || saving}
                  className="keep-white flex items-center gap-1.5 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold shadow-lg shadow-brand-500/20 transition hover:bg-brand-600 disabled:opacity-40"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create account'}
                </button>
              )}
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
