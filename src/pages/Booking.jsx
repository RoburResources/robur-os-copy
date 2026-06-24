import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Zap,
  Package,
  Truck,
  ArrowRight,
  Check,
  Calendar,
  User,
  Phone,
  Sparkles,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import BookingStepper from "@/components/booking/BookingStepper";
import LocationPanel from "@/components/booking/LocationPanel";
import BookingMap from "@/components/booking/BookingMap";
import { cn } from "@/lib/utils";
import { base44 } from "@/api/base44Client";

const services = [
  { id: "skip-hire", label: "Skip Bin Hire", desc: "General waste & mixed loads", icon: Package },
  { id: "waste-collection", label: "Waste Collection", desc: "Scheduled collection services", icon: Truck },
  { id: "recycling", label: "Recycling Services", desc: "Cardboard, metal, concrete", icon: Package },
  { id: "hazardous", label: "Hazardous Waste", desc: "Asbestos, chemicals, sharps", icon: Truck },
];

const actions = [
  { id: "deliver", label: "Deliver Bin", desc: "New bin delivered to site", icon: Truck },
  { id: "exchange", label: "Exchange Bin", desc: "Swap full bin for empty", icon: Package },
  { id: "collect", label: "Collect Bin", desc: "Remove bin from site", icon: Truck },
];

const DEFAULT_CENTER = { lat: -31.9485, lng: 115.8195 };

export default function Booking() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [action, setAction] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [binPosition, setBinPosition] = useState(DEFAULT_CENTER);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [searching, setSearching] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleSearchAddress = async () => {
    if (!address.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}&limit=1`
      );
      const data = await res.json();
      if (data.length > 0) {
        const pos = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        setBinPosition(pos);
        setMapCenter(pos);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const p = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setBinPosition(p);
        setMapCenter(p);
        if (!address) setAddress("Current location");
      },
      (err) => console.error(err)
    );
  };

  const handleConfirm = async () => {
    setSaving(true);
    try {
      await base44.entities.Booking.create({
        service_type: service,
        action_type: action,
        site_address: address,
        latitude: binPosition.lat,
        longitude: binPosition.lng,
        placement_notes: notes,
        contact_name: contactName,
        contact_phone: contactPhone,
        preferred_date: preferredDate,
      });
      setConfirmed(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (confirmed) {
    return (
      <div
        className="max-w-2xl mx-auto flex flex-col items-center justify-center"
        style={{ minHeight: "calc(100vh - 160px)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <GlassCard level={3} className="p-10 text-center">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-400/15 mb-5">
              <Check className="h-8 w-8 text-emerald-500" strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-bold text-robur-charcoal mb-2">
              Booking Confirmed
            </h2>
            <p className="text-sm text-robur-steel mb-6">
              Your {services.find((s) => s.id === service)?.label} request has
              been submitted.
            </p>
            <div className="rounded-xl bg-robur-charcoal/[0.03] p-4 text-left space-y-2 mb-6">
              <SummaryRow label="Service" value={services.find((s) => s.id === service)?.label} />
              <SummaryRow label="Action" value={actions.find((a) => a.id === action)?.label} />
              <SummaryRow label="Address" value={address} />
              <SummaryRow
                label="Coordinates"
                value={`${binPosition.lat.toFixed(5)}, ${binPosition.lng.toFixed(5)}`}
              />
              {notes && <SummaryRow label="Notes" value={notes} />}
            </div>
            <button
              onClick={() => {
                setStep(1);
                setService("");
                setAction("");
                setAddress("");
                setNotes("");
                setContactName("");
                setContactPhone("");
                setPreferredDate("");
                setConfirmed(false);
              }}
              className="w-full rounded-xl bg-robur-charcoal py-3 text-sm font-semibold text-white hover:bg-robur-charcoal/90 transition-colors"
            >
              New Booking
            </button>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              step > 1 ? setStep(step - 1) : navigate(-1)
            }
            className="flex items-center gap-1 text-sm font-medium text-robur-steel hover:text-robur-charcoal transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="text-xl font-bold text-robur-charcoal">
            {step === 3
              ? "Where do you need the bin?"
              : step === 4
              ? "Complete your booking"
              : "Book a collection"}
          </h1>
        </div>
        {step === 3 && (
          <GlassCard level={2} className="flex items-center gap-2 px-3 py-2">
            <Zap className="h-3.5 w-3.5 text-robur-yellow" />
            <span className="text-[11px] font-medium text-robur-steel">
              Drag to position. Snap to flat, accessible areas.
            </span>
          </GlassCard>
        )}
      </div>

      {/* Stepper */}
      <div className="mb-6">
        <BookingStepper currentStep={step} />
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((s) => (
                <GlassCard
                  key={s.id}
                  level={2}
                  hover
                  className="p-5 cursor-pointer group"
                  onClick={() => {
                    setService(s.id);
                    setStep(2);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                        service === s.id
                          ? "bg-robur-yellow"
                          : "bg-robur-charcoal/5 group-hover:bg-robur-charcoal/10"
                      )}
                    >
                      <s.icon
                        className={cn(
                          "h-6 w-6",
                          service === s.id ? "text-robur-charcoal" : "text-robur-steel"
                        )}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-robur-charcoal">
                        {s.label}
                      </h3>
                      <p className="text-xs text-robur-steel">{s.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-robur-light ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {actions.map((a) => (
                <GlassCard
                  key={a.id}
                  level={2}
                  hover
                  className="p-5 cursor-pointer group"
                  onClick={() => {
                    setAction(a.id);
                    setStep(3);
                  }}
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                        action === a.id
                          ? "bg-robur-yellow"
                          : "bg-robur-charcoal/5 group-hover:bg-robur-charcoal/10"
                      )}
                    >
                      <a.icon
                        className={cn(
                          "h-6 w-6",
                          action === a.id ? "text-robur-charcoal" : "text-robur-steel"
                        )}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-robur-charcoal">
                        {a.label}
                      </h3>
                      <p className="text-xs text-robur-steel mt-0.5">{a.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div
              className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-5"
              style={{ height: "calc(100vh - 240px)" }}
            >
              <LocationPanel
                address={address}
                onAddressChange={setAddress}
                onSearchAddress={handleSearchAddress}
                onUseCurrentLocation={handleUseCurrentLocation}
                notes={notes}
                onNotesChange={setNotes}
                onContinue={() => setStep(4)}
                searching={searching}
              />
              <BookingMap
                binPosition={binPosition}
                onBinDrag={(latlng) =>
                  setBinPosition({ lat: latlng.lat, lng: latlng.lng })
                }
                mapCenter={mapCenter}
                initialPosition={DEFAULT_CENTER}
              />
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <GlassCard level={2} className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="h-4 w-4 text-robur-yellow" />
                  <h3 className="text-sm font-semibold text-robur-charcoal">
                    Booking Summary
                  </h3>
                </div>
                <div className="space-y-3">
                  <SummaryRow
                    label="Service"
                    value={services.find((s) => s.id === service)?.label}
                  />
                  <SummaryRow
                    label="Action"
                    value={actions.find((a) => a.id === action)?.label}
                  />
                  <SummaryRow label="Site address" value={address} />
                  <SummaryRow
                    label="Coordinates"
                    value={`${binPosition.lat.toFixed(5)}, ${binPosition.lng.toFixed(5)}`}
                  />
                  {notes && (
                    <SummaryRow label="Placement notes" value={notes} />
                  )}
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="mt-5 text-xs font-medium text-robur-yellow hover:underline"
                >
                  Edit location
                </button>
              </GlassCard>

              <GlassCard level={2} className="p-6">
                <h3 className="text-sm font-semibold text-robur-charcoal mb-5">
                  Contact Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-medium text-robur-steel mb-1.5 block">
                      Contact name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-robur-steel/50" />
                      <input
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Smith"
                        className="w-full rounded-xl border border-robur-light/30 bg-white/60 pl-9 pr-3 py-2.5 text-sm text-robur-charcoal placeholder:text-robur-steel/40 focus:outline-none focus:ring-2 focus:ring-robur-yellow/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-robur-steel mb-1.5 block">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-robur-steel/50" />
                      <input
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="0412 345 678"
                        className="w-full rounded-xl border border-robur-light/30 bg-white/60 pl-9 pr-3 py-2.5 text-sm text-robur-charcoal placeholder:text-robur-steel/40 focus:outline-none focus:ring-2 focus:ring-robur-yellow/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-robur-steel mb-1.5 block">
                      Preferred date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-robur-steel/50" />
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full rounded-xl border border-robur-light/30 bg-white/60 pl-9 pr-3 py-2.5 text-sm text-robur-charcoal focus:outline-none focus:ring-2 focus:ring-robur-yellow/30"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleConfirm}
                  disabled={saving || !contactName || !contactPhone}
                  className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-robur-yellow py-3 text-sm font-bold text-robur-charcoal transition-all hover:bg-robur-yellow/90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {saving ? "Confirming..." : "Confirm Booking"}
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </GlassCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between items-start gap-4 pb-3 border-b border-robur-light/15 last:border-0">
      <span className="text-xs font-medium text-robur-steel">{label}</span>
      <span className="text-xs font-semibold text-robur-charcoal text-right">
        {value}
      </span>
    </div>
  );
}