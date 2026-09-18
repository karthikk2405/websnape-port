import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { DigitalCoreCanvas } from '../3d/DigitalCoreCanvas';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    service: 'Both (Website + Systems)',
    venueType: 'Technology / Startup',
    details: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the mailto link
    const subject = encodeURIComponent(`New Inquiry from ${formData.name} - ${formData.businessName}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Business Name: ${formData.businessName}
Email: ${formData.email}
Phone: ${formData.phone}

Service Required: ${formData.service}
Venue/Business Type: ${formData.venueType}

Project Details:
${formData.details}
    `);

    window.location.href = `mailto:websnape.bussiness@gmail.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative min-h-screen py-32 px-6 md:px-12 overflow-hidden bg-[#0A0A0C]">
      {/* Background 3D Digital Core */}
      <div className="absolute inset-0 z-0 opacity-40">
        <DigitalCoreCanvas />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-10">
        
        {/* Left Side: Copy */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#00F0FF] mb-4 block font-mono">
            START A CONVERSATION
          </span>
          <h2 className="rynd-title text-white text-5xl sm:text-7xl tracking-tighter mb-8 drop-shadow-2xl">
            Tell us what <br />
            <span className="gradient-text">you're building.</span>
          </h2>
          <p className="text-[#A9B1BD] text-lg leading-relaxed font-medium mb-10 max-w-md">
            Ready for a world-class digital experience? Let's talk. We reply with a thoughtful proposal within 24 hours.
          </p>
          
          <div className="glass-panel p-6 bg-white/5 border-white/10 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-[#00F0FF]" />
              <strong className="text-white text-sm">Free Architecture Setup Available</strong>
            </div>
            <p className="text-xs text-[#8A8D93] leading-relaxed">
              We can configure a custom Smart Ordering QR menu demo or digital strategy tailored to your business before launch.
            </p>
          </div>
          
          <div className="glass-panel p-6 bg-white/5 border-white/10">
            <p className="text-xs text-[#8A8D93] leading-relaxed">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] inline-block mr-2 animate-pulse" />
              All inquiries are delivered directly to our studio inbox and responded to within 24 hours.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="glass-panel p-8 md:p-12 bg-[#111114]/80 backdrop-blur-xl border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.05)]">
          {isSubmitted ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-[#00F0FF]/20 flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-[#00F0FF]" />
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-4">Message Initiated!</h3>
              <p className="text-[#A9B1BD] leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong>. Our studio lead will review your inquiry for <strong className="text-[#00F0FF]">{formData.businessName}</strong> and contact you at <strong className="text-white">{formData.email}</strong> shortly.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-8 inline-flex items-center gap-2 bg-white/10 text-white font-bold text-xs px-6 py-3 rounded-full hover:bg-white/20 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-white block mb-2 tracking-wide">Your Name *</label>
                  <input 
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Estelle Darcy"
                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-4 py-4 text-sm text-white placeholder-[#4A4B50] focus:outline-none focus:border-[#00F0FF] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-white block mb-2 tracking-wide">Business Name *</label>
                  <input 
                    required
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="e.g. WebSnape Tech"
                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-4 py-4 text-sm text-white placeholder-[#4A4B50] focus:outline-none focus:border-[#00F0FF] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-white block mb-2 tracking-wide">Email Address *</label>
                  <input 
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@company.com"
                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-4 py-4 text-sm text-white placeholder-[#4A4B50] focus:outline-none focus:border-[#00F0FF] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-white block mb-2 tracking-wide">Phone Number</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-4 py-4 text-sm text-white placeholder-[#4A4B50] focus:outline-none focus:border-[#00F0FF] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-white block mb-2 tracking-wide">What do you need?</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:border-[#00F0FF] transition-colors appearance-none"
                  >
                    <option>Both (Website + Systems)</option>
                    <option>Cinematic 3D Website</option>
                    <option>Smart Ordering System</option>
                    <option>Business Automation</option>
                    <option>AI Integration</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-white block mb-2 tracking-wide">Venue Type</label>
                  <select 
                    name="venueType"
                    value={formData.venueType}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:border-[#00F0FF] transition-colors appearance-none"
                  >
                    <option>Technology / Startup</option>
                    <option>Café / Restaurant</option>
                    <option>Agency / Studio</option>
                    <option>Enterprise</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-white block mb-2 tracking-wide">Project Details</label>
                <textarea 
                  required
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Tell us about your vision, timeline, and requirements..."
                  rows={4}
                  className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-4 py-4 text-sm text-white placeholder-[#4A4B50] focus:outline-none focus:border-[#00F0FF] transition-colors resize-y"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-white text-[#0A0A0C] font-extrabold text-base py-5 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-[#00F0FF] hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Talk to WebSnape <Send className="w-5 h-5" />
              </button>
              
              <p className="text-center text-[10px] text-[#4A4B50] mt-4">
                By submitting, you agree to be contacted at the email provided. We never share your data.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
