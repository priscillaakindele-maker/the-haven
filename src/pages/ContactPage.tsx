import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { MapPin, Phone, Mail, Sun, Plane, Send, Check } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useHotel();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Stay Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Transfer request state
  const [transferName, setTransferName] = useState('');
  const [transferFlight, setTransferFlight] = useState('');
  const [transferDate, setTransferDate] = useState('2026-08-20');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been received. Head Concierge Aurelia will respond within 15 minutes.');
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Airport transfer request dispatched to estate chauffeur team.');
    setTransferName('');
    setTransferFlight('');
  };

  return (
    <div className="py-24 bg-[#F5F2ED] text-[#1A1A1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#B5A264] font-sans font-semibold">
            At Your Service
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-light italic text-[#1A1A1A]">
            Contact The Estate
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/75 leading-relaxed font-light">
            Whether arranging private air dispatch, bespoke dietary requirements, or orchestrating a secret proposal, our estate concierge team is at your complete disposal.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info & Weather */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-white p-8 rounded-sm border border-[#1A1A1A]/10 space-y-6">
              <h2 className="font-serif text-2xl italic text-[#1A1A1A]">
                Estate Communications
              </h2>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-[#F5F2ED] border border-[#1A1A1A]/10 flex items-center justify-center text-[#B5A264] shrink-0">
                    <MapPin className="w-5 h-5 text-[#B5A264]" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[#B5A264] font-bold tracking-[0.2em]">Address</span>
                    <p className="text-[#1A1A1A] font-light mt-0.5">
                      Via Panoramic Cliffside 88, 80067 Sorrento Coast, Amalfi, Italy
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-[#F5F2ED] border border-[#1A1A1A]/10 flex items-center justify-center text-[#B5A264] shrink-0">
                    <Phone className="w-5 h-5 text-[#B5A264]" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[#B5A264] font-bold tracking-[0.2em]">Direct Concierge Telephone</span>
                    <p className="text-[#1A1A1A] font-light mt-0.5">+39 081 877 9000 (24/7)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-[#F5F2ED] border border-[#1A1A1A]/10 flex items-center justify-center text-[#B5A264] shrink-0">
                    <Mail className="w-5 h-5 text-[#B5A264]" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[#B5A264] font-bold tracking-[0.2em]">Email Enquiries</span>
                    <p className="text-[#1A1A1A] font-light mt-0.5">concierge@thehavenresort.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather & Helipad Info */}
            <div className="bg-[#1A1A1A] text-[#F5F2ED] p-8 rounded-sm border border-[#B5A264]/30 space-y-4">
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B5A264] font-bold">
                Live Estate Weather & Flight Operations
              </span>

              <div className="flex items-center justify-between border-b border-[#B5A264]/20 pb-4">
                <div className="flex items-center gap-3">
                  <Sun className="w-8 h-8 text-[#B5A264]" />
                  <div>
                    <span className="text-2xl font-serif italic text-[#F5F2ED]">26°C</span>
                    <span className="block text-[10px] font-sans text-[#F5F2ED]/70">Clear Skies • Sea Calm</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-serif italic text-[#B5A264]">Helipad LTHV</span>
                  <span className="text-[10px] font-sans text-[#F5F2ED]/70">Clear for Arrival</span>
                </div>
              </div>

              <p className="text-xs font-sans text-[#F5F2ED]/80 font-light leading-relaxed">
                Direct helicopter flights available from Rome (35 mins) or Naples (12 mins). Private yacht dock coordinates: 40°38'N 14°36'E.
              </p>
            </div>

            {/* Airport Transfer Request Box */}
            <div className="bg-white p-8 rounded-sm border border-[#1A1A1A]/10 space-y-4">
              <div className="flex items-center gap-2 text-[#B5A264]">
                <Plane className="w-5 h-5 text-[#B5A264]" />
                <h3 className="font-serif text-xl italic text-[#1A1A1A]">Airport Chauffeur Transfer</h3>
              </div>
              <p className="text-xs font-sans text-[#1A1A1A]/70 font-light">
                Book direct private chauffeur pickup from Naples (NAP) or Rome (FCO).
              </p>

              <form onSubmit={handleTransferSubmit} className="space-y-3 text-xs font-sans">
                <input
                  type="text"
                  required
                  placeholder="Guest Full Name"
                  value={transferName}
                  onChange={(e) => setTransferName(e.target.value)}
                  className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-sm px-4 py-2.5 text-[#1A1A1A] focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Flight Number (e.g., AF 1182)"
                  value={transferFlight}
                  onChange={(e) => setTransferFlight(e.target.value)}
                  className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-sm px-4 py-2.5 text-[#1A1A1A] focus:outline-none"
                />
                <input
                  type="date"
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                  className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-sm px-4 py-2.5 text-[#1A1A1A] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1A1A1A] text-[#F5F2ED] uppercase tracking-[0.2em] text-[10px] font-bold rounded-sm hover:bg-[#B5A264] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  Request Airport Transfer
                </button>
              </form>
            </div>

          </div>

          {/* Right: Direct Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-sm border border-[#1A1A1A]/10 shadow-sm space-y-8">
            <div>
              <h2 className="font-serif text-3xl italic text-[#1A1A1A]">
                Send Private Inquiry
              </h2>
              <p className="text-xs font-sans text-[#B5A264] mt-1 font-medium">
                Fill out the form below and our estate manager will contact you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-[#F5F2ED] border border-[#B5A264]/30 rounded-sm text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#B5A264] text-[#1A1A1A] flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl italic text-[#1A1A1A]">
                  Inquiry Dispatched
                </h3>
                <p className="text-xs font-sans text-[#1A1A1A]/75 max-w-md mx-auto leading-relaxed">
                  Thank you, {name}. Head Concierge Aurelia has received your message and will reply to {email} within 15 minutes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#1A1A1A] text-[#F5F2ED] text-[10px] font-sans uppercase tracking-[0.2em] rounded-sm font-bold cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6 text-xs font-sans">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-2 font-bold">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lady Genevieve"
                      className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-sm px-4 py-3.5 text-[#1A1A1A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-2 font-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. genevieve@monaco.mc"
                      className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-sm px-4 py-3.5 text-[#1A1A1A] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-2 font-bold">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-sm px-4 py-3.5 text-[#1A1A1A] focus:outline-none"
                  >
                    <option value="General Stay Inquiry">General Stay Inquiry</option>
                    <option value="Exclusive Villa Estate Buyout">Exclusive Villa Estate Buyout</option>
                    <option value="Helicopter & Yacht Charter">Helicopter & Yacht Charter</option>
                    <option value="Private Wedding & Event">Private Wedding & Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-2 font-bold">
                    Personal Message / Requests
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your desired stay dates, guest count, or special requirements..."
                    className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-sm p-4 text-[#1A1A1A] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1A1A1A] hover:bg-[#B5A264] text-[#F5F2ED] hover:text-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.2em] font-bold rounded-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#B5A264]" />
                  <span>Send Concierge Inquiry</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

