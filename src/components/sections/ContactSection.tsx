import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

// Formspree form — delivers to websnape.services@gmail.com
const FORMSPREE_ID = 'mzeborzo';

export const ContactSection: React.FC = () => {
  const [state, handleFormspreeSubmit] = useForm(FORMSPREE_ID);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    serviceRequired: 'Both Products',
    businessType: 'Café / Coffee Roastery',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleFormspreeSubmit(e);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      businessName: '',
      email: '',
      phone: '',
      serviceRequired: 'Both Products',
      businessType: 'Café / Coffee Roastery',
      message: ''
    });
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
              you're building.
            </h2>
            <p className="text-base text-[#55544E] leading-relaxed font-medium">
              Have a café, bakery, or restaurant ready for a world-class digital experience? Let's talk. We reply with a thoughtful proposal within 24 hours.
            </p>

            <div className="pt-4 space-y-4 text-xs text-[#55544E]">
              <div className="p-4 rounded-xl bg-[#F7F5EF] border border-black/10 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#C87A4B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#121212] block text-sm mb-0.5">Free Café Demo Setup Available</strong>
                  <span>We can configure a custom Smart Ordering QR menu demo tailored to your coffee menu before launch.</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#F7F5EF] border border-black/10">
                <p className="text-[#55544E] font-medium">📧 All inquiries are delivered directly to our studio inbox and responded to within 24 hours.</p>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            {state.succeeded ? (
              <div className="bg-[#F7F5EF] border border-[#C87A4B]/40 p-8 rounded-2xl text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-[#C87A4B]/20 text-[#C87A4B] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#121212]">Message Received!</h3>
                <p className="text-sm text-[#55544E] max-w-md mx-auto leading-relaxed font-medium">
                  Thank you, <strong className="text-[#121212]">{formData.name}</strong>. Our studio lead will review your inquiry for <strong className="text-[#C87A4B]">{formData.businessName}</strong> and contact you at <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-4 inline-flex items-center gap-2 bg-[#121212] text-[#F7F5EF] font-bold text-xs px-5 py-2.5 rounded-full hover:bg-[#C87A4B] transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {state.errors && Array.isArray(state.errors) && state.errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700 font-medium">Something went wrong. Please try again or email us directly at websnape.services@gmail.com</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#121212] block mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Estelle Darcy"
                      className="w-full bg-[#F7F5EF] border border-black/15 rounded-xl px-4 py-3 text-sm text-[#121212] placeholder-black/30 focus:outline-none focus:border-[#C87A4B]"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-xs text-red-500 mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#121212] block mb-1">Café / Business Name *</label>
                    <input
                      type="text"
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Rynd Roasters & Bakery"
                      className="w-full bg-[#F7F5EF] border border-black/15 rounded-xl px-4 py-3 text-sm text-[#121212] placeholder-black/30 focus:outline-none focus:border-[#C87A4B]"
                    />
                    <ValidationError prefix="Business Name" field="businessName" errors={state.errors} className="text-xs text-red-500 mt-1" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#121212] block mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="estelle@ryndcafe.com"
                      className="w-full bg-[#F7F5EF] border border-black/15 rounded-xl px-4 py-3 text-sm text-[#121212] placeholder-black/30 focus:outline-none focus:border-[#C87A4B]"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-red-500 mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#121212] block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
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
                      name="serviceRequired"
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
                      name="businessType"
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
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your seating capacity, coffee menu items, or vision..."
                    className="w-full bg-[#F7F5EF] border border-black/15 rounded-xl px-4 py-3 text-sm text-[#121212] placeholder-black/30 focus:outline-none focus:border-[#C87A4B] resize-y"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs text-red-500 mt-1" />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-[#121212] text-[#F7F5EF] font-extrabold text-base py-4 rounded-xl shadow-lg hover:bg-[#C87A4B] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {state.submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Talk to WebSnape</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-[#999590]">
                  By submitting, you agree to be contacted at the email provided. We never share your data.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
