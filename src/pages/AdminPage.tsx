import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { ShieldCheck, BedDouble, CalendarCheck, FileText, LogOut, Edit2, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export const AdminPage: React.FC = () => {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    rooms,
    updateRoom,
    bookings,
    updateBookingStatus,
    tableReservations,
    spaAppointments,
    cmsContent,
    updateCmsContent,
    showToast,
  } = useHotel();

  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'rooms' | 'bookings' | 'dining-spa' | 'cms'>('rooms');

  // Room Edit Modal
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editName, setEditName] = useState<string>('');
  const [editSub, setEditSub] = useState<string>('');

  // CMS Edit State
  const [cmsHeadline, setCmsHeadline] = useState(cmsContent.heroHeadline);
  const [cmsSubheadline, setCmsSubheadline] = useState(cmsContent.heroSubheadline);
  const [cmsPhone, setCmsPhone] = useState(cmsContent.phone);
  const [cmsEmail, setCmsEmail] = useState(cmsContent.email);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      showToast('Admin Portal Unlocked.');
    } else {
      showToast('Invalid Access Code. (Default code: haven2026)');
    }
  };

  const handleOpenRoomEdit = (roomId: string) => {
    const rm = rooms.find((r) => r.id === roomId);
    if (!rm) return;
    setEditingRoomId(roomId);
    setEditPrice(rm.pricePerNight);
    setEditName(rm.name);
    setEditSub(rm.subtitle);
  };

  const handleSaveRoomEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRoomId) {
      updateRoom(editingRoomId, {
        pricePerNight: editPrice,
        name: editName,
        subtitle: editSub
      });
      setEditingRoomId(null);
      showToast('Room rates & details updated successfully.');
    }
  };

  const handleSaveCms = (e: React.FormEvent) => {
    e.preventDefault();
    updateCmsContent({
      heroHeadline: cmsHeadline,
      heroSubheadline: cmsSubheadline,
      phone: cmsPhone,
      email: cmsEmail
    });
    showToast('CMS Content published to website.');
  };

  // If not logged in, show luxury lock screen
  if (!isAdminLoggedIn) {
    return (
      <div className="py-32 bg-[#1A1A1A] text-[#F5F2ED] min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#242424] border border-[#B5A264]/30 p-8 sm:p-12 rounded-sm max-w-md w-full shadow-2xl space-y-6 text-center"
        >
          <div className="w-14 h-14 mx-auto rounded-full bg-[#1A1A1A] border border-[#B5A264]/40 flex items-center justify-center text-[#B5A264]">
            <Lock className="w-6 h-6 text-[#B5A264]" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#B5A264] font-bold">
              The Haven Estate Management
            </span>
            <h1 className="font-serif text-3xl italic text-[#F5F2ED]">
              Admin Portal
            </h1>
            <p className="text-xs font-sans text-[#F5F2ED]/70 font-light leading-relaxed">
              Enter your estate access credential. (Default: <code className="text-[#B5A264]">haven2026</code>)
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-sans">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Access Key Code"
              className="w-full bg-[#1A1A1A] border border-[#B5A264]/30 rounded-sm px-4 py-3.5 text-[#F5F2ED] text-center tracking-widest focus:outline-none"
            />

            <button
              type="submit"
              className="w-full py-4 bg-[#B5A264] text-[#1A1A1A] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#c4b377] transition-colors cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = bookings.reduce((acc, b) => acc + (b.status === 'confirmed' ? b.totalPrice : 0), 0);

  return (
    <div className="py-24 bg-[#F5F2ED] text-[#1A1A1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1A1A1A]/10 pb-6 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#B5A264] font-sans font-semibold">
              Management Portal
            </span>
            <h1 className="font-serif text-4xl italic text-[#1A1A1A]">
              The Haven Estate Dashboard
            </h1>
          </div>

          <button
            onClick={() => {
              logoutAdmin();
              showToast('Logged out of Admin Portal.');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1A1A1A]/20 rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F5F2ED] transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock & Exit</span>
          </button>
        </div>

        {/* Analytics Top Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-sm border border-[#1A1A1A]/10 space-y-1">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#B5A264] font-bold">Total Revenue</span>
            <p className="font-serif text-3xl text-[#1A1A1A] font-normal italic">${totalRevenue.toLocaleString()} USD</p>
          </div>
          <div className="bg-white p-6 rounded-sm border border-[#1A1A1A]/10 space-y-1">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#B5A264] font-bold">Active Sanctuaries</span>
            <p className="font-serif text-3xl text-[#1A1A1A] font-normal italic">{rooms.length}</p>
          </div>
          <div className="bg-white p-6 rounded-sm border border-[#1A1A1A]/10 space-y-1">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#B5A264] font-bold">Stay Requests</span>
            <p className="font-serif text-3xl text-[#1A1A1A] font-normal italic">{bookings.length}</p>
          </div>
          <div className="bg-white p-6 rounded-sm border border-[#1A1A1A]/10 space-y-1">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#B5A264] font-bold">Dining & Spa</span>
            <p className="font-serif text-3xl text-[#1A1A1A] font-normal italic">{tableReservations.length + spaAppointments.length}</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#1A1A1A]/10 gap-6 text-xs font-sans overflow-x-auto">
          {[
            { id: 'rooms', label: 'Rooms & Pricing', icon: BedDouble },
            { id: 'bookings', label: 'Guest Reservations', icon: CalendarCheck },
            { id: 'dining-spa', label: 'Dining & Spa', icon: ShieldCheck },
            { id: 'cms', label: 'Website CMS Content', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 pb-4 uppercase tracking-[0.2em] text-[10px] border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#1A1A1A] text-[#1A1A1A] font-bold'
                    : 'border-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#B5A264]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ROOMS MANAGEMENT */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl italic text-[#1A1A1A]">
              Manage Room Catalog & Rates
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div key={room.id} className="bg-white p-6 rounded-sm border border-[#1A1A1A]/10 space-y-4">
                  <div className="aspect-[16/9] rounded-sm overflow-hidden bg-neutral-900 border border-[#1A1A1A]/10">
                    <img src={room.heroImage} alt={room.name} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-sans text-[#B5A264] font-bold tracking-[0.2em]">{room.category}</span>
                    <h3 className="font-serif text-xl italic text-[#1A1A1A]">{room.name}</h3>
                    <p className="text-xs font-sans text-[#1A1A1A]/70 italic">{room.subtitle}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#1A1A1A]/10">
                    <div>
                      <span className="text-[9px] text-[#B5A264] uppercase tracking-[0.2em] font-bold block">Rate / Night</span>
                      <span className="font-serif text-xl font-normal text-[#1A1A1A]">${room.pricePerNight} USD</span>
                    </div>

                    <button
                      onClick={() => handleOpenRoomEdit(room.id)}
                      className="px-4 py-2 bg-[#1A1A1A] text-[#F5F2ED] text-[10px] font-sans uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#B5A264] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Rate</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS LIST */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl italic text-[#1A1A1A]">
              Guest Stay Bookings ({bookings.length})
            </h2>

            <div className="overflow-x-auto bg-white rounded-sm border border-[#1A1A1A]/10">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#F5F2ED] border-b border-[#1A1A1A]/10 text-[#B5A264] uppercase tracking-[0.2em] text-[10px] font-bold">
                  <tr>
                    <th className="p-4">Ref Code</th>
                    <th className="p-4">Guest Name</th>
                    <th className="p-4">Sanctuary</th>
                    <th className="p-4">Dates</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]/10">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#F5F2ED]/50">
                      <td className="p-4 font-mono font-semibold text-[#1A1A1A]">{b.confirmationCode}</td>
                      <td className="p-4">
                        <div className="font-semibold text-[#1A1A1A]">{b.guestName}</div>
                        <div className="text-[11px] text-[#B5A264]">{b.guestEmail}</div>
                      </td>
                      <td className="p-4">{b.roomName}</td>
                      <td className="p-4">{b.checkInDate} — {b.checkOutDate}</td>
                      <td className="p-4 font-serif text-sm font-semibold">${b.totalPrice} USD</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-sm text-[9px] uppercase font-bold tracking-[0.1em] ${
                          b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {b.status === 'confirmed' ? (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'cancelled')}
                            className="px-3 py-1 bg-red-50 text-red-700 rounded-sm text-[9px] uppercase font-bold tracking-[0.1em] cursor-pointer"
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'confirmed')}
                            className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-sm text-[9px] uppercase font-bold tracking-[0.1em] cursor-pointer"
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DINING & SPA RESERVATIONS */}
        {activeTab === 'dining-spa' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl italic text-[#1A1A1A]">Dining Table Reservations</h2>
              <div className="space-y-3">
                {tableReservations.map((res) => (
                  <div key={res.id} className="p-4 bg-white rounded-sm border border-[#1A1A1A]/10 space-y-1 text-xs">
                    <div className="flex items-center justify-between font-semibold text-[#1A1A1A]">
                      <span>{res.guestName} ({res.guestsCount} Guests)</span>
                      <span className="text-[#B5A264] font-medium">{res.date} @ {res.time}</span>
                    </div>
                    <p className="text-[11px] text-[#1A1A1A]/70">{res.venue} • {res.seatingPreference} seating</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl italic text-[#1A1A1A]">Spa Appointments</h2>
              <div className="space-y-3">
                {spaAppointments.map((spa) => (
                  <div key={spa.id} className="p-4 bg-white rounded-sm border border-[#1A1A1A]/10 space-y-1 text-xs">
                    <div className="flex items-center justify-between font-semibold text-[#1A1A1A]">
                      <span>{spa.guestName}</span>
                      <span className="font-serif text-sm">${spa.totalPrice} USD</span>
                    </div>
                    <p className="text-[11px] text-[#B5A264]">{spa.treatmentName} • {spa.date} @ {spa.time}</p>
                    <p className="text-[10px] text-[#1A1A1A]/70">Therapist: {spa.therapistPreference}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CMS EDIT */}
        {activeTab === 'cms' && (
          <form onSubmit={handleSaveCms} className="bg-white p-8 rounded-sm border border-[#1A1A1A]/10 max-w-2xl space-y-6 text-xs font-sans">
            <h2 className="font-serif text-3xl italic text-[#1A1A1A]">Edit Website Copy & Contact Info</h2>

            <div>
              <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">Hero Main Headline</label>
              <input
                type="text"
                value={cmsHeadline}
                onChange={(e) => setCmsHeadline(e.target.value)}
                className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-sm px-4 py-3 text-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">Hero Subheadline</label>
              <textarea
                rows={3}
                value={cmsSubheadline}
                onChange={(e) => setCmsSubheadline(e.target.value)}
                className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-sm p-4 text-[#1A1A1A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">Concierge Telephone</label>
                <input
                  type="text"
                  value={cmsPhone}
                  onChange={(e) => setCmsPhone(e.target.value)}
                  className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-sm px-4 py-3 text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">Concierge Email</label>
                <input
                  type="email"
                  value={cmsEmail}
                  onChange={(e) => setCmsEmail(e.target.value)}
                  className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-sm px-4 py-3 text-[#1A1A1A]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-4 px-8 bg-[#1A1A1A] text-[#F5F2ED] font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#B5A264] hover:text-[#1A1A1A] transition-colors cursor-pointer"
            >
              Save & Publish Content
            </button>
          </form>
        )}

      </div>

      {/* Edit Room Modal */}
      {editingRoomId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#F5F2ED] border border-[#1A1A1A]/20 p-8 rounded-sm max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-serif text-2xl italic text-[#1A1A1A]">Edit Room Pricing</h3>
            <form onSubmit={handleSaveRoomEdit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">Room Title</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-white border border-[#1A1A1A]/10 rounded-sm px-4 py-2.5 text-[#1A1A1A]"
                />
              </div>
              <div>
                <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">Nightly Price ($ USD)</label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  className="w-full bg-white border border-[#1A1A1A]/10 rounded-sm px-4 py-2.5 font-semibold text-[#1A1A1A]"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingRoomId(null)}
                  className="flex-1 py-3 border border-[#1A1A1A]/20 rounded-sm text-[10px] uppercase tracking-[0.2em] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#1A1A1A] text-[#F5F2ED] rounded-sm font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#B5A264] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

