import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    serviceRequired: 'Both Products',
    businessType: 'Café / Coffee Roastery',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/10">
      <div className="glass-panel p-8 md:p-14 relative overflow-hidden bg-white border-black/10 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C87A4B]">
              START A CONVERSATION
            </span>
            <h2 className="rynd-title text-4xl sm:text-6xl text-[#121212]">
              Tell us what<br />
              you’re building.
            </h2>
            <p className="text-base text-[#55544E] leading-relaxed font-medium">
              Have a café, bakery, or restaurant ready for a world-class digital experience? Let’s talk. We reply with a thoughtful proposal within 24 hours.
            </p>

            <div className="pt-4 space-y-4 text-xs text-[#55544E]">
              <div className="p-4 rounded-xl bg-[#F7F5EF] border border-black/10 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#C87A4B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#121212] block text-sm mb-0.5">Free Café Demo Setup Available</strong>
                  <span>We can configure a custom Smart Ordering QR menu demo tailored to your coffee menu before launch.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-[#F7F5EF] border border-[#C87A4B]/40 p-8 rounded-2xl text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-[#C87A4B]/20 text-[#C87A4B] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#121212]">Message Received!</h3>
                <p className="text-sm text-[#55544E] max-w-md mx-auto leading-relaxed font-medium">
                  Thank you, <strong className="text-[#121212]">{formData.name}</strong>. Our studio lead will review your inquiry for <strong className="text-[#C87A4B]">{formData.businessName}</strong> and contact you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      businessName: '',
                      email: '',
                      phone: '',
                      serviceRequired: 'Both Products',
                      businessType: 'Café / Coffee Roastery',
                      message: ''
                    });
                  }}
                  className="mt-4 inline-flex items-center gap-2 bg-[#121212] text-[#F7F5EF] font-bold text-xs px-5 py-2.5 rounded-full hover:bg-[#C87A4B]"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#121212] block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Estelle Darcy"
                      className="w-full bg-[#F7F5EF] border border-black/15 rounded-xl px-4 py-3 text-sm text-[#121212] placeholder-black/30 focus:outline-none focus:border-[#C87A4B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#121212] block mb-1">Café / Business Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Rynd Roasters & Bakery"
                      className="w-full bg-[#F7F5EF] border border-black/15 rounded-xl px-4 py-3 text-sm text-[#121212] placeholder-black/30 focus:outline-none focus:border-[#C87A4B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#121212] block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="estelle@ryndcafe.com"
                      className="w-full bg-[#F7F5EF] border border-black/15 rounded-xl px-4 py-3 text-sm text-[#121212] placeholder-black/30 focus:outline-none focus:border-[#C87A4B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#121212] block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#F7F5EF] border border-black/15 rounded-xl px-4 py-3 text-sm text-[#121212] placeholder-black/30 focus:outline-none focus:border-[#C87A4B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#121212] block mb-1">What do you need?</label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full bg-[#F7F5EF] border border-black/15 rounded-xl px-4 py-3 text-sm text-[#121212] focus:outline-none focus:border-[#C87A4B]"
                    >
                      <option value="Both Products">Both (Café Website + Smart QR Ordering)</option>
                      <option value="Smart Ordering">Smart QR Ordering System Only</option>
                      <option value="Web Services">Bespoke Café Website Only</option>
                      <option value="Custom Solution">Custom Technology Solution</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#121212] block mb-1">Venue Type</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full bg-[#F7F5EF] border border-black/15 rounded-xl px-4 py-3 text-sm text-[#121212] focus:outline-none focus:border-[#C87A4B]"
                    >
                      <option value="Café / Coffee Roastery">Artisanal Café / Roastery</option>
                      <option value="Bakery / Patisserie">Bakery / Patisserie</option>
                      <option value="Restaurant / Bistro">Restaurant / Bistro</option>
                      <option value="Fast Casual">Fast Casual / Food Hall</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#121212] block mb-1">Project Details</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your seating capacity, coffee menu items, or vision..."
                    className="w-full bg-[#F7F5EF] border border-black/15 rounded-xl px-4 py-3 text-sm text-[#121212] placeholder-black/30 focus:outline-none focus:border-[#C87A4B] resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#121212] text-[#F7F5EF] font-extrabold text-base py-4 rounded-xl shadow-lg hover:bg-[#C87A4B] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Talk to WebSnape</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
