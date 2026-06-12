import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

const pages = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Draft for launch review',
    sections: [
      ['Data we collect', 'Account profile, contact details, address, dog profile, booking details, vaccine status, and support messages when you provide them.'],
      ['How we use data', 'To provide mobile dog fitness services, manage bookings, verify safety requirements, support customers, prevent abuse, and improve the product.'],
      ['Storage and processors', 'Production storage must be configured in the client-owned backend before launch. Do not collect real customer data until that backend is active.'],
      ['Your choices', 'Customers must be able to request access, correction, deletion, and support through a monitored contact channel before public launch.'],
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'Draft for launch review',
    sections: [
      ['Service scope', 'ZoomieVan provides mobile canine fitness sessions subject to service-area availability, scheduling, handler safety review, and vaccine requirements.'],
      ['Accounts', 'Customers are responsible for accurate profile, address, dog, and contact information.'],
      ['Bookings and cancellations', 'Production launch requires final cancellation, refund, no-show, and rescheduling terms approved by the business owner.'],
      ['Limitations', 'This draft must be reviewed by counsel before public launch.'],
    ],
  },
  waiver: {
    title: 'Liability Waiver',
    updated: 'Draft for launch review',
    sections: [
      ['Acknowledgement of risk', 'Dog fitness activity can involve physical risk. Owners must disclose health, behavior, age, and reactivity concerns before service.'],
      ['Health and vaccines', 'Dogs may be refused service if vaccine or health requirements are incomplete or unsafe for the session.'],
      ['Media consent', 'Photo/video consent must include a clear opt-out path before production launch.'],
      ['Review required', 'This draft should be finalized by the business owner and legal counsel.'],
    ],
  },
  pipeda: {
    title: 'PIPEDA Compliance',
    updated: 'Draft for launch review',
    sections: [
      ['Accountability', 'Assign a privacy owner before launch.'],
      ['Consent', 'Collect consent for account data, service communications, vaccine status, and media separately where appropriate.'],
      ['Safeguards', 'Move all customer records from browser storage to the production backend with access controls and audit logs.'],
      ['Access and deletion', 'Define and document customer data access, correction, deletion, and retention workflows.'],
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    updated: 'Draft for launch review',
    sections: [
      ['Current use', 'The current frontend uses browser storage for demo account state. Production must replace this with secure backend-managed auth.'],
      ['Analytics', 'Analytics and monitoring tools should be documented here before they are enabled.'],
      ['Control', 'Add consent controls if non-essential cookies or tracking tools are introduced.'],
    ],
  },
  support: {
    title: 'Support',
    updated: 'Launch contact placeholder',
    sections: [
      ['Contact', 'Email hello@zoomievan.ca for account, booking, privacy, and safety requests.'],
      ['Response ownership', 'Assign a monitored support owner and response target before public launch.'],
      ['Urgent safety issues', 'Create an incident escalation path for service, animal safety, privacy, and payment issues before production launch.'],
    ],
  },
};

type PageKey = keyof typeof pages;

export default function LegalPage() {
  const { page = 'privacy' } = useParams();
  const content = pages[page as PageKey] ?? pages.privacy;

  return (
    <main className="min-h-screen bg-dark-900 px-4 pb-20 pt-28 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-dark-300 hover:text-brand-400">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-brand-400">ZoomieVan</p>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{content.title}</h1>
            <p className="mt-2 text-sm text-dark-400">{content.updated}</p>
          </div>
        </div>

        <div className="space-y-5">
          {content.sections.map(([title, body]) => (
            <section key={title} className="rounded-xl border border-dark-600 bg-dark-800/40 p-5">
              <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-dark-200">{body}</p>
            </section>
          ))}
        </div>

        <p className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100">
          This page is a production-readiness draft. Final legal, privacy, and support language should be approved before public launch.
        </p>
      </div>
    </main>
  );
}
