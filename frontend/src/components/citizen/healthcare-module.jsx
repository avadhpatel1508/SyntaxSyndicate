"use client"

import { useEffect, useState } from "react"
import axiosClient from "../../utils/axiosClient"

export default function HealthcareModule() {
  const [activeTab, setActiveTab] = useState("appointments")
  const [showBookingForm, setShowBookingForm] = useState(false)

  const [appointments, setAppointments] = useState([])
  const [prescriptions, setPrescriptions] = useState([])
  const [medicalHistory, setMedicalHistory] = useState([])
  const [vaccinations, setVaccinations] = useState([])

  const [bookingData, setBookingData] = useState({
    doctorName: "",
    date: "",
    time: "",
    reason: "",
  })

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    if (activeTab === "appointments") {
      axiosClient.get("/healthcare/appointments")
        .then(res => setAppointments(res.data))
        .catch(console.error)
    }

    if (activeTab === "prescriptions") {
      axiosClient.get("/healthcare/prescriptions")
        .then(res => setPrescriptions(res.data))
        .catch(console.error)
    }

    if (activeTab === "medical-history") {
      axiosClient.get("/healthcare/medical-history")
        .then(res => setMedicalHistory(res.data))
        .catch(console.error)
    }

    if (activeTab === "vaccinations") {
      axiosClient.get("/healthcare/vaccinations")
        .then(res => setVaccinations(res.data))
        .catch(console.error)
    }
  }, [activeTab])

  /* ================= BOOK APPOINTMENT ================= */

  const handleBookAppointment = async (e) => {
    e.preventDefault()
    try {
      await axiosClient.post("/healthcare/appointments", bookingData)
      alert("Appointment booked successfully!")
      setShowBookingForm(false)
      setBookingData({ doctorName: "", date: "", time: "", reason: "" })

      const res = await axiosClient.get("/healthcare/appointments")
      setAppointments(res.data)
    } catch (err) {
      console.error(err)
      alert("Failed to book appointment")
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#8b5a2b" }}>
        Healthcare Module
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b" style={{ borderColor: "#e5e7eb" }}>
        {["appointments", "prescriptions", "medical-history", "vaccinations"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-3 font-semibold border-b-2 transition-colors"
            style={{
              color: activeTab === tab ? "#2e7d32" : "#6b7280",
              borderColor: activeTab === tab ? "#2e7d32" : "transparent",
            }}
          >
            {tab === "appointments" && "Doctor Appointments"}
            {tab === "prescriptions" && "Digital Prescriptions"}
            {tab === "medical-history" && "Medical History"}
            {tab === "vaccinations" && "Vaccination Records"}
          </button>
        ))}
      </div>

      {/* Appointments Tab */}
      {activeTab === "appointments" && (
        <div>
          <button
            onClick={() => setShowBookingForm(!showBookingForm)}
            className="mb-6 px-6 py-3 rounded-lg font-semibold text-white transition-all"
            style={{ backgroundColor: "#2e7d32" }}
          >
            + Book New Appointment
          </button>

          {showBookingForm && (
  <form
    onSubmit={handleBookAppointment}
    className="mb-6 p-6 rounded-lg"
    style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
          Doctor Name
        </label>
        <input
          type="text"
          value={bookingData.doctorName}
          onChange={(e) =>
            setBookingData({ ...bookingData, doctorName: e.target.value })
          }
          className="w-full px-4 py-2 rounded border"
          style={{ borderColor: "#e5e7eb" }}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
          Date
        </label>
        <input
          type="date"
          value={bookingData.date}
          onChange={(e) =>
            setBookingData({ ...bookingData, date: e.target.value })
          }
          className="w-full px-4 py-2 rounded border"
          style={{ borderColor: "#e5e7eb" }}
          required
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
          Time
        </label>
        <input
          type="time"
          value={bookingData.time}
          onChange={(e) =>
            setBookingData({ ...bookingData, time: e.target.value })
          }
          className="w-full px-4 py-2 rounded border"
          style={{ borderColor: "#e5e7eb" }}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
          Reason for Visit
        </label>
        <input
          type="text"
          value={bookingData.reason}
          onChange={(e) =>
            setBookingData({ ...bookingData, reason: e.target.value })
          }
          className="w-full px-4 py-2 rounded border"
          style={{ borderColor: "#e5e7eb" }}
          required
        />
      </div>
    </div>

    <button
      type="submit"
      className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-all"
      style={{ backgroundColor: "#2e7d32" }}
    >
      Confirm Appointment
    </button>
  </form>
)}


          <div className="space-y-4">
            {appointments.map((apt) => (
              <div
                key={apt._id}
                className="p-6 rounded-lg"
                style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: "#8b5a2b" }}>
                      {apt.doctorName}
                    </h3>
                    <p style={{ color: "#6b7280" }} className="mt-2">
                      📅 {new Date(apt.date).toLocaleDateString()} at {apt.time}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: apt.status === "Confirmed" ? "#d1fae5" : "#fef3c7",
                      color: apt.status === "Confirmed" ? "#065f46" : "#92400e",
                    }}
                  >
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prescriptions Tab */}
      {activeTab === "prescriptions" && (
        <div className="space-y-4">
          {prescriptions.map((rx) => (
            <div
              key={rx._id}
              className="p-6 rounded-lg"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
            >
              <h3 className="text-lg font-semibold" style={{ color: "#8b5a2b" }}>
                {rx.doctorName}
              </h3>
              <ul className="list-disc list-inside">
                {rx.medicines.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Medical History Tab */}
      {activeTab === "medical-history" && (
        <div className="p-6 rounded-lg" style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}>
          {medicalHistory.map((item) => (
            <div key={item._id} className="mb-4">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Vaccinations Tab */}
      {activeTab === "vaccinations" && (
        <div className="space-y-4">
          {vaccinations.map((vac) => (
            <div
              key={vac._id}
              className="p-6 rounded-lg flex justify-between"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
            >
              <div>
                <h3 className="font-semibold">{vac.vaccineName}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(vac.date).toLocaleDateString()}
                </p>
              </div>
              <span className="px-4 py-2 rounded-full bg-green-100 text-green-700">
                {vac.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
