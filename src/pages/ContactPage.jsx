import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-16 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold drop-shadow-lg mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Contact Information</h1>
          <p className="text-white/80 text-lg drop-shadow">Get in touch with us</p>
        </div>
      </div>

      {/* Content */}
      <div className="pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-amber-600 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Email</h2>
                  <a href="mailto:contact@arnoldwoodworking.com" className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer">
                    contact@arnoldwoodworking.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-amber-600 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Phone</h2>
                  <a href="tel:+15551234567" className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer">
                    (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-amber-600 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Location</h2>
                  <p className="text-white/80">
                    123 Workshop Lane<br />
                    Craftsville, ST 12345
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Hours</h2>
              <div className="text-white/80 space-y-1">
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday: By appointment</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
