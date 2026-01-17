"use client"

import { useState } from "react"

export default function AgricultureModule() {
  const [activeTab, setActiveTab] = useState("advisory")

  const cropAdvisories = [
    {
      id: 1,
      crop: "Wheat",
      advice: "Irrigation recommended in dry spell. Monitor for pest activity.",
      date: "2024-02-10",
    },
    { id: 2, crop: "Rice", advice: "Prepare fields for next season. Check soil moisture levels.", date: "2024-02-08" },
    {
      id: 3,
      crop: "Cotton",
      advice: "Flowering stage - ensure proper drainage and fertilizer application.",
      date: "2024-02-05",
    },
  ]

  const weatherAlerts = [
    {
      id: 1,
      type: "Heavy Rain Warning",
      message: "Heavy rainfall expected next 48 hours. Secure crops and equipment.",
      severity: "high",
    },
    {
      id: 2,
      type: "Temperature Drop",
      message: "Frost warning: Temperature may drop below freezing. Protect sensitive crops.",
      severity: "medium",
    },
    {
      id: 3,
      type: "Wind Advisory",
      message: "Strong winds expected. May affect crops and structures.",
      severity: "medium",
    },
  ]

  const subsidyInfo = [
    { id: 1, scheme: "Soil Health Card Scheme", benefit: "Free soil testing and card issuance", status: "Active" },
    { id: 2, scheme: "PM-KISAN", benefit: "Direct income support to farmers", status: "Active" },
    { id: 3, scheme: "Subsidy on Seeds", benefit: "Up to 50% subsidy on quality seeds", status: "Registration Open" },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#8b5a2b" }}>
        Agriculture Department
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b" style={{ borderColor: "#e5e7eb" }}>
        {["advisory", "weather", "subsidy"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-3 font-semibold border-b-2 transition-colors"
            style={{
              color: activeTab === tab ? "#2e7d32" : "#6b7280",
              borderColor: activeTab === tab ? "#2e7d32" : "transparent",
            }}
          >
            {tab === "advisory" && "Crop Advisory"}
            {tab === "weather" && "Weather Alerts"}
            {tab === "subsidy" && "Subsidies & Schemes"}
          </button>
        ))}
      </div>

      {/* Crop Advisory */}
      {activeTab === "advisory" && (
        <div className="space-y-4">
          {cropAdvisories.map((advisory) => (
            <div
              key={advisory.id}
              className="p-6 rounded-lg"
              style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb", border: "1px solid" }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold" style={{ color: "#8b5a2b" }}>
                  {advisory.crop}
                </h3>
                <span style={{ color: "#6b7280" }} className="text-sm">
                  {advisory.date}
                </span>
              </div>
              <p style={{ color: "#6b7280" }}>{advisory.advice}</p>
            </div>
          ))}
        </div>
      )}

      {/* Weather Alerts */}
      {activeTab === "weather" && (
        <div className="space-y-4">
          {weatherAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-6 rounded-lg border-l-4 flex items-start gap-4"
              style={{
                backgroundColor: "#ffffff",
                borderColor: alert.severity === "high" ? "#dc2626" : "#f59e0b",
              }}
            >
              <div
                className="text-2xl flex-shrink-0"
                style={{ color: alert.severity === "high" ? "#dc2626" : "#f59e0b" }}
              >
                ⚠️
              </div>
              <div className="flex-1">
                <h3 className="font-semibold" style={{ color: "#8b5a2b" }}>
                  {alert.type}
                </h3>
                <p style={{ color: "#6b7280" }} className="mt-1">
                  {alert.message}
                </p>
              </div>
              <span
                className="px-3 py-1 rounded text-sm font-semibold flex-shrink-0"
                style={{
                  backgroundColor: alert.severity === "high" ? "#fee2e2" : "#fef3c7",
                  color: alert.severity === "high" ? "#991b1b" : "#92400e",
                }}
              >
                {alert.severity === "high" ? "High" : "Medium"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Subsidies & Schemes */}
      {activeTab === "subsidy" && (
        <div className="space-y-4">
          {subsidyInfo.map((scheme) => (
            <div
              key={scheme.id}
              className="p-6 rounded-lg"
              style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb", border: "1px solid" }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: "#8b5a2b" }}>
                    {scheme.scheme}
                  </h3>
                  <p style={{ color: "#6b7280" }} className="mt-2">
                    {scheme.benefit}
                  </p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0"
                  style={{
                    backgroundColor: scheme.status === "Active" ? "#d1fae5" : "#fef3c7",
                    color: scheme.status === "Active" ? "#065f46" : "#92400e",
                  }}
                >
                  {scheme.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
