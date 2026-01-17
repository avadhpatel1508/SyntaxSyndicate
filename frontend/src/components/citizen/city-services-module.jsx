"use client"

import { useState } from "react"

export default function CityServicesModule() {
  const [activeTab, setActiveTab] = useState("complaints")
  const [showComplaintForm, setShowComplaintForm] = useState(false)
  const [complaintData, setComplaintData] = useState({
    category: "",
    location: "",
    description: "",
    photo: null,
  })

  const complaints = [
    { id: 1, category: "Water Issue", location: "Sector 5, Ward 12", status: "In Progress", date: "2024-02-10" },
    { id: 2, category: "Road Damage", location: "Main Street, Area 3", status: "Resolved", date: "2024-02-05" },
    { id: 3, category: "Waste Management", location: "Residential Complex A", status: "Pending", date: "2024-02-12" },
  ]

  const serviceRequests = [
    { id: 1, service: "Street Light Repair", location: "Park Avenue", status: "Assigned", priority: "High" },
    { id: 2, service: "Pothole Repair", location: "Industrial Road", status: "In Progress", priority: "Medium" },
    { id: 3, service: "Drainage Cleaning", location: "Downtown Area", status: "Scheduled", priority: "Medium" },
  ]

  const handleComplaintSubmit = (e) => {
    e.preventDefault()
    alert("Complaint submitted successfully! Complaint ID: #" + Math.floor(Math.random() * 10000))
    setShowComplaintForm(false)
    setComplaintData({ category: "", location: "", description: "", photo: null })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#8b5a2b" }}>
        City Services
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b" style={{ borderColor: "#e5e7eb" }}>
        {["complaints", "requests"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-3 font-semibold border-b-2 transition-colors"
            style={{
              color: activeTab === tab ? "#2e7d32" : "#6b7280",
              borderColor: activeTab === tab ? "#2e7d32" : "transparent",
            }}
          >
            {tab === "complaints" && "File Complaint"}
            {tab === "requests" && "Service Requests"}
          </button>
        ))}
      </div>

      {/* Complaints Tab */}
      {activeTab === "complaints" && (
        <div>
          <button
            onClick={() => setShowComplaintForm(!showComplaintForm)}
            className="mb-6 px-6 py-3 rounded-lg font-semibold text-white transition-all"
            style={{ backgroundColor: "#2e7d32" }}
          >
            + File New Complaint
          </button>

          {showComplaintForm && (
            <form
              onSubmit={handleComplaintSubmit}
              className="mb-6 p-6 rounded-lg"
              style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb", border: "1px solid" }}
            >
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
                  Complaint Category
                </label>
                <select
                  value={complaintData.category}
                  onChange={(e) => setComplaintData({ ...complaintData, category: e.target.value })}
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: "#e5e7eb" }}
                  required
                >
                  <option value="">Select category</option>
                  <option value="water">Water Issue</option>
                  <option value="road">Road Damage</option>
                  <option value="waste">Waste Management</option>
                  <option value="street-light">Street Light</option>
                  <option value="drainage">Drainage Issue</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
                  Location
                </label>
                <input
                  type="text"
                  value={complaintData.location}
                  onChange={(e) => setComplaintData({ ...complaintData, location: e.target.value })}
                  placeholder="Enter specific location"
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: "#e5e7eb" }}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
                  Description
                </label>
                <textarea
                  value={complaintData.description}
                  onChange={(e) => setComplaintData({ ...complaintData, description: e.target.value })}
                  placeholder="Describe the issue in detail"
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: "#e5e7eb" }}
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
                  Attach Photo (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setComplaintData({ ...complaintData, photo: e.target.files?.[0] })}
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: "#e5e7eb" }}
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{ backgroundColor: "#2e7d32" }}
              >
                Submit Complaint
              </button>
            </form>
          )}

          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="p-6 rounded-lg"
                style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb", border: "1px solid" }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: "#8b5a2b" }}>
                      {complaint.category}
                    </h3>
                    <p style={{ color: "#6b7280" }} className="text-sm mt-1">
                      📍 {complaint.location}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor:
                        complaint.status === "Resolved"
                          ? "#d1fae5"
                          : complaint.status === "In Progress"
                            ? "#bfdbfe"
                            : "#fef3c7",
                      color:
                        complaint.status === "Resolved"
                          ? "#065f46"
                          : complaint.status === "In Progress"
                            ? "#1e40af"
                            : "#92400e",
                    }}
                  >
                    {complaint.status}
                  </span>
                </div>
                <p style={{ color: "#6b7280" }} className="text-sm">
                  Filed on: {complaint.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service Requests Tab */}
      {activeTab === "requests" && (
        <div className="space-y-4">
          {serviceRequests.map((request) => (
            <div
              key={request.id}
              className="p-6 rounded-lg"
              style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb", border: "1px solid" }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: "#8b5a2b" }}>
                    {request.service}
                  </h3>
                  <p style={{ color: "#6b7280" }} className="text-sm mt-1">
                    📍 {request.location}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span
                    className="px-3 py-1 rounded text-sm font-semibold"
                    style={{
                      backgroundColor: request.priority === "High" ? "#fee2e2" : "#fef3c7",
                      color: request.priority === "High" ? "#991b1b" : "#92400e",
                    }}
                  >
                    {request.priority}
                  </span>
                  <span
                    className="px-3 py-1 rounded text-sm font-semibold"
                    style={{
                      backgroundColor: "#bfdbfe",
                      color: "#1e40af",
                    }}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
