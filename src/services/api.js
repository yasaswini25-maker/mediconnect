import storageService from "./storageService";

const API_BASE_URL = "http://localhost:5000/api";

// Helper for HTTP requests
async function request(endpoint, options = {}) {
  const token = localStorage.getItem("mediconnect_jwt_token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Check backend server connectivity
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(1800) });
      if (!res.ok) return { online: false };
      const data = await res.json();
      return { online: true, ...data };
    } catch {
      return { online: false };
    }
  },

  // Auth API
  auth: {
    async signup(userData) {
      try {
        const data = await request("/auth/signup", {
          method: "POST",
          body: JSON.stringify(userData)
        });
        if (data.token) {
          localStorage.setItem("mediconnect_jwt_token", data.token);
        }
        return data;
      } catch (err) {
        // Fallback to local storage if server is offline
        console.warn("Backend API offline. Falling back to local storage authentication.");
        return null;
      }
    },

    async login(email, password) {
      try {
        const data = await request("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password })
        });
        if (data.token) {
          localStorage.setItem("mediconnect_jwt_token", data.token);
        }
        return data;
      } catch (err) {
        console.warn("Backend API offline. Falling back to local storage authentication.");
        return null;
      }
    },

    async getMe() {
      try {
        return await request("/auth/me");
      } catch {
        return null;
      }
    }
  },

  // Doctors API
  doctors: {
    async getAll(params = {}) {
      try {
        const query = new URLSearchParams(params).toString();
        const data = await request(`/doctors${query ? `?${query}` : ""}`);
        return data.doctors;
      } catch {
        return storageService.getDoctors();
      }
    },

    async getById(id) {
      try {
        const data = await request(`/doctors/${id}`);
        return data.doctor;
      } catch {
        const docs = storageService.getDoctors();
        return docs.find((d) => d.id === id) || null;
      }
    },

    async updateQueue(doctorId, currentServingToken) {
      try {
        return await request(`/doctors/${doctorId}/queue`, {
          method: "PUT",
          body: JSON.stringify({ currentServingToken })
        });
      } catch {
        return null;
      }
    }
  },

  // Appointments API
  appointments: {
    async book(appointmentData) {
      try {
        return await request("/appointments", {
          method: "POST",
          body: JSON.stringify(appointmentData)
        });
      } catch {
        return null;
      }
    },

    async getAll(params = {}) {
      try {
        const query = new URLSearchParams(params).toString();
        const data = await request(`/appointments${query ? `?${query}` : ""}`);
        return data.appointments;
      } catch {
        return storageService.getAppointments();
      }
    }
  },

  // Reviews API
  reviews: {
    async submit(reviewData) {
      try {
        return await request("/reviews", {
          method: "POST",
          body: JSON.stringify(reviewData)
        });
      } catch {
        return null;
      }
    },

    async getRecent() {
      try {
        const data = await request("/reviews/recent");
        return data.reviews;
      } catch {
        return [];
      }
    },

    async getByDoctor(doctorId) {
      try {
        const data = await request(`/reviews/doctor/${doctorId}`);
        return data.reviews;
      } catch {
        return [];
      }
    }
  }
};

export default api;
