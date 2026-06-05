import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, PawPrint, FileCheck, PenTool, Check, ChevronRight, ArrowRight } from 'lucide-react';

const onboardingSteps = [
  {
    step: 1,
    icon: <User className="w-5 h-5" />,
    title: 'Your Profile',
    subtitle: 'Address & Contact',
    description: 'Verify your home address and set up your contact information. We use this to route the nearest available van to your door.',
    fields: ['Full Name', 'Address Line 1', 'City', 'Province', 'Postal Code', 'Phone Number'],
  },
  {
    step: 2,
    icon: <PawPrint className="w-5 h-5" />,
    title: 'Pet Biometrics',
    subtitle: 'Dog Profile Builder',
    description: 'Tell us about your dog. Our handlers use this data to customize session intensity, duration, and handling approach.',
    fields: ['Dog Name', 'Breed', 'Weight (lbs)', 'Age', 'Energy Level', 'Reactivity Notes'],
  },
  {
    step: 3,
    icon: <FileCheck className="w-5 h-5" />,
    title: 'Health Vault',
    subtitle: 'Vaccine Credentials',
    description: 'Upload your dog\'s current vaccination records. We require proof of rabies and DHPP immunization for all participants.',
    fields: ['Rabies Certificate (PDF/Image)', 'DHPP Certificate (PDF/Image)', 'Vet Name', 'Vet Phone'],
  },
  {
    step: 4,
    icon: <PenTool className="w-5 h-5" />,
    title: 'Legal Release',
    subtitle: 'Liability Agreement',
    description: 'Review and digitally sign our liability waiver. This interactive agreement covers session protocols, safety standards, and insurance terms.',
    fields: ['Read & Accept Terms', 'Digital Signature Pad', 'Date Confirmation'],
  },
];

export default function OnboardingPreview() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const currentStep = onboardingSteps[activeStep];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-brand-500 font-semibold text-sm uppercase tracking-[0.15em] mb-4 block">
            Seamless Onboarding
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Get Started in <span className="text-gradient">4 Simple Steps</span>
          </h2>
          <p className="mt-6 text-lg text-dark-300 leading-relaxed">
            Our guided onboarding flow captures everything we need to deliver a safe, 
            personalized experience for your dog.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-5xl mx-auto">
          {/* Step Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-64 shrink-0"
          >
            <div className="flex lg:flex-col gap-2">
              {onboardingSteps.map((step, index) => (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left w-full ${
                    activeStep === index
                      ? 'bg-brand-500/10 border border-brand-500/30'
                      : 'hover:bg-dark-800 border border-transparent'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      activeStep === index
                        ? 'bg-brand-500 text-white'
                        : index < activeStep
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-dark-700 text-dark-400'
                    }`}
                  >
                    {index < activeStep ? <Check className="w-4 h-4" /> : step.icon}
                  </div>
                  <div className="hidden lg:block">
                    <p className={`text-sm font-semibold ${activeStep === index ? 'text-white' : 'text-dark-300'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-dark-400">{step.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Step Content Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1"
          >
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-dark-600 bg-dark-800/50 p-8"
            >
              {/* Step header */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-brand-400 bg-brand-500/10 px-2 py-1 rounded">
                  STEP {currentStep.step} OF 4
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">{currentStep.title}</h3>
              <p className="text-dark-300 mb-8">{currentStep.description}</p>

              {/* Mock form fields */}
              <div className="space-y-4">
                {currentStep.fields.map((field) => (
                  <div key={field} className="space-y-1.5">
                    <label className="text-xs font-medium text-dark-300 uppercase tracking-wider">{field}</label>
                    <div className="h-11 rounded-xl bg-dark-700 border border-dark-500 flex items-center px-4">
                      <span className="text-sm text-dark-400">Enter {field.toLowerCase()}...</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-dark-600">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  className={`px-5 py-2.5 text-sm font-medium rounded-xl border border-dark-500 text-dark-200 hover:bg-dark-700 transition-colors ${
                    activeStep === 0 ? 'opacity-30 pointer-events-none' : ''
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(3, activeStep + 1))}
                  className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-brand-500 text-white hover:bg-brand-400 transition-colors flex items-center gap-1.5"
                >
                  {activeStep === 3 ? 'Complete Setup' : 'Continue'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                  className="mt-6 text-center"
                >
                  <button
                    onClick={() => navigate('/signup')}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/25"
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
