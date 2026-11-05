// Appointment Service: calculations, token sequencing, and smart doctor matching

export const appointmentService = {
  // Calculate wait time based on queue difference
  calculateWaitTimeMinutes(myToken, currentServingToken, avgMinutesPerPatient = 15) {
    const diff = myToken - currentServingToken;
    return Math.max(0, diff * avgMinutesPerPatient);
  },

  // Smart doctor matching based on criteria
  matchDoctors(doctors, { specialty, preferredTime, minRating = 4.5, consultationMode }) {
    return doctors.filter((doc) => {
      if (doc.status !== "Active") return false;
      const matchesSpec = !specialty || specialty === "All" || doc.specialty.toLowerCase() === specialty.toLowerCase();
      const matchesRating = doc.rating >= minRating;
      const matchesMode = !consultationMode || consultationMode === "All" || doc.modes.includes(consultationMode);
      return matchesSpec && matchesRating && matchesMode;
    });
  },

  // Format appointment date for display
  formatAppointmentDate(dateString) {
    try {
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return dateString;
    }
  }
};

export default appointmentService;
