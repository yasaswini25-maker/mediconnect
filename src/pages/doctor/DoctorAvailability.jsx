import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Save,
  Check,
  Plus,
  Trash2
} from "lucide-react";

export function DoctorAvailability() {
  const { user } = useAuth();
  const { doctors, updateDoctorAvailability } = useApp();

  const currentDoctor = doctors.find(
    (d) => d.email?.toLowerCase() === user?.email?.toLowerCase() || d.id === user?.id
  ) || doctors[0];

  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [selectedDays, setSelectedDays] = useState(
    currentDoctor.availability?.days || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  );
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("05:00 PM");
  const [breakStart, setBreakStart] = useState("01:00 PM");
  const [breakEnd, setBreakEnd] = useState("02:00 PM");
  const [slotDuration, setSlotDuration] = useState("45");
  const [slots, setSlots] = useState(
    currentDoctor.availability?.slots || [
      "09:00 AM",
      "09:45 AM",
      "10:30 AM",
      "11:15 AM",
      "02:00 PM",
      "02:45 PM",
      "03:30 PM",
      "04:15 PM"
    ]
  );
  const [newSlotInput, setNewSlotInput] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleAddCustomSlot = (e) => {
    e.preventDefault();
    if (!newSlotInput.trim() || slots.includes(newSlotInput.trim())) return;
    setSlots([...slots, newSlotInput.trim()]);
    setNewSlotInput("");
  };

  const handleRemoveSlot = (slotToRemove) => {
    setSlots(slots.filter((s) => s !== slotToRemove));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateDoctorAvailability(currentDoctor.id, {
      days: selectedDays,
      hours: `${startTime} - ${endTime}`,
      breakTime: `${breakStart} - ${breakEnd}`,
      slots
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="doctor-availability-view">
      {/* Header */}
      <div className="dash-section-header">
        <div>
          <h2>Clinical Schedule & Availability Settings</h2>
          <p>Configure your outpatient clinic days, working hours, breaks, and bookable consultation slots</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="notice-banner banner-success mt-3">
          <CheckCircle2 size={18} /> Working schedule and patient slots successfully saved and published!
        </div>
      )}

      <form onSubmit={handleSave} className="mc-card mt-4">
        {/* Working Days Selector */}
        <div className="mb-4">
          <label className="font-semibold text-secondary block mb-2">
            Active Clinical Practice Days
          </label>
          <div className="days-toggle-row">
            {allDays.map((day) => {
              const active = selectedDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  className={`day-toggle-chip ${active ? "active" : ""}`}
                  onClick={() => toggleDay(day)}
                >
                  {active && <Check size={14} />}
                  <span>{day}</span>
                </button>
              );
            })}
          </div>
        </div>

        <hr className="form-divider-line my-4" />

        {/* Working Hours & Breaks */}
        <h4 className="card-section-title mb-3">Consultation Hours & Break Interval</h4>
        <div className="form-grid-2">
          <div className="form-group">
            <label>Clinic Opens At</label>
            <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
              <option value="08:00 AM">08:00 AM</option>
              <option value="08:30 AM">08:30 AM</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="09:30 AM">09:30 AM</option>
              <option value="10:00 AM">10:00 AM</option>
            </select>
          </div>

          <div className="form-group">
            <label>Clinic Closes At</label>
            <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
              <option value="03:00 PM">03:00 PM</option>
              <option value="04:00 PM">04:00 PM</option>
              <option value="05:00 PM">05:00 PM</option>
              <option value="06:00 PM">06:00 PM</option>
              <option value="07:00 PM">07:00 PM</option>
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label>Lunch / Administrative Break Starts</label>
            <select value={breakStart} onChange={(e) => setBreakStart(e.target.value)}>
              <option value="12:00 PM">12:00 PM</option>
              <option value="12:30 PM">12:30 PM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="01:30 PM">01:30 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label>Break Ends</label>
            <select value={breakEnd} onChange={(e) => setBreakEnd(e.target.value)}>
              <option value="01:00 PM">01:00 PM</option>
              <option value="01:30 PM">01:30 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="02:30 PM">02:30 PM</option>
            </select>
          </div>
        </div>

        <hr className="form-divider-line my-4" />

        {/* Appointment Slots Config */}
        <div className="d-flex justify-between align-center mb-2">
          <h4 className="card-section-title">Published Appointment Slots ({slots.length})</h4>
          <span className="text-xs text-muted">Visible to patients during booking</span>
        </div>

        <div className="slots-editor-grid mb-3">
          {slots.map((slot, idx) => (
            <div key={idx} className="slot-editor-pill">
              <Clock size={13} className="text-teal" />
              <span>{slot}</span>
              <button
                type="button"
                className="slot-pill-delete"
                onClick={() => handleRemoveSlot(slot)}
                title="Remove slot"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Add Custom Slot Input */}
        <div className="add-slot-input-row">
          <input
            type="text"
            placeholder="Add custom slot (e.g. 05:15 PM)"
            value={newSlotInput}
            onChange={(e) => setNewSlotInput(e.target.value)}
          />
          <button
            type="button"
            className="button button-outline button-sm"
            onClick={handleAddCustomSlot}
          >
            <Plus size={14} /> Add Slot
          </button>
        </div>

        <div className="form-submit-row mt-5">
          <button type="submit" className="button button-primary">
            <Save size={16} /> Save & Publish Schedule
          </button>
        </div>
      </form>
    </div>
  );
}

export default DoctorAvailability;
