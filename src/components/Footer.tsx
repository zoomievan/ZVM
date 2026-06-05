import { MapPin, Mail, Phone, Globe, MessageCircle, Camera } from 'lucide-react';

const footerLinks = {
  Service: ['How It Works', 'Pricing', 'Coverage Areas', 'Book a Session', 'Gift Cards'],
  Company: ['About Us', 'Careers', 'Press Kit', 'Blog', 'Partners'],
  Support: ['Help Center', 'Contact Us', 'FAQs', 'Safety Protocols', 'Vaccine Requirements'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Liability Waiver', 'PIPEDA Compliance', 'Cookie Policy'],
};

export default function Footer() {
  return (
    <footer className="relative bg-dark-800/50 border-t border-dark-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M4.5 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm15 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM3 14c0-3.87 3.13-7 7-7h4c3.87 0 7 3.13 7 7v2c0 1.1-.9 2-2 2h-2.5l-1.5 3h-5l-1.5-3H5c-1.1 0-2-.9-2-2v-2z" />
                </svg>
              </div>
              <span className="font-display text-xl font-bold text-white">
                Zoomie<span className="text-brand-500">Van</span>
              </span>
            </div>
            <p className="text-sm text-dark-300 leading-relaxed max-w-xs">
              Canada's first mobile canine fitness service. Professional slatmill workouts delivered 
              directly to your neighbourhood.
            </p>
            <div className="space-y-3 text-sm text-dark-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span>Toronto, ON • Vancouver, BC • Montreal, QC</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-500" />
                <span>hello@zoomievan.ca</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-500" />
                <span>1-888-PAW-POWR</span>
              </div>
            </div>
            <div className="flex gap-3">
              {[Camera, Globe, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-dark-700 border border-dark-500 flex items-center justify-center text-dark-300 hover:text-brand-400 hover:border-brand-500/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-dark-400 hover:text-brand-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-dark-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-400">
            © 2025 ZoomieVan Inc. All rights reserved. 🇨🇦 Proudly Canadian.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-dark-500">Data stored in Canada (AWS ca-central-1) • PIPEDA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
