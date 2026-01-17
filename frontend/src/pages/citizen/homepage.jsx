"use client"

import { useState } from "react"
import { useSelector } from "react-redux"

import HealthcareModule from "../../components/citizen/healthcare-module"
import AgricultureModule from "../../components/citizen/agriculture-module"
import CityServicesModule from "../../components/citizen/city-services-module"
import EducationModule from "../../components/citizen/education-module"

export default function CitizenPortal() {
  const [activeModule, setActiveModule] = useState("healthcare")

  // ✅ Get authenticated user
  const { user } = useSelector((state) => state.auth)

  const fullName = user
    ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
    : "Citizen"

  const initials = user?.firstName
    ? user.firstName.slice(0, 2).toUpperCase()
    : "CU"

  const modules = [
    {
      id: "healthcare",
      name: "Healthcare",
      icon: "🧑‍⚕️",
      component: HealthcareModule,
      description: "Medical services and appointments",
    },
    {
      id: "agriculture",
      name: "Agriculture",
      icon: "🌾",
      component: AgricultureModule,
      description: "Crop advisory and weather alerts",
    },
    {
      id: "city-services",
      name: "City Services",
      icon: "🏙️",
      component: CityServicesModule,
      description: "Report issues and request services",
    },
    {
      id: "education",
      name: "Education",
      icon: "📚",
      component: EducationModule,
      description: "Education details and records",
    },
  ]

  const ActiveComponent =
    modules.find((m) => m.id === activeModule)?.component || HealthcareModule

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5efe6" }}>
      
      {/* ================= HEADER ================= */}
      <header
        className="border-b"
        style={{ borderColor: "#e5e7eb", backgroundColor: "#ffffff" }}
      >
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          
          {/* Left: Title */}
          <div>
            <h1 className="text-4xl font-bold" style={{ color: "#8b5a2b" }}>
              Citizen Services Portal
            </h1>
            <p className="text-lg mt-1" style={{ color: "#6b7280" }}>
              Access government services and citizen utilities
            </p>
          </div>

          {/* Right: User Info */}
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md"
              style={{
                backgroundColor: "#2e7d32",
                color: "#ffffff",
              }}
            >
              {initials}
            </div>

            <div className="text-right">
              <p className="font-semibold" style={{ color: "#8b5a2b" }}>
                {fullName}
              </p>
              <p className="text-sm capitalize" style={{ color: "#6b7280" }}>
                {user?.role || "citizen"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MODULE NAV ================= */}
      <div
        className="border-b"
        style={{ borderColor: "#e5e7eb", backgroundColor: "#ffffff" }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 border"
                style={{
                  backgroundColor:
                    activeModule === module.id ? "#2e7d32" : "#ffffff",
                  color:
                    activeModule === module.id ? "#ffffff" : "#8b5a2b",
                  borderColor:
                    activeModule === module.id ? "#2e7d32" : "#e5e7eb",
                }}
              >
                <span className="mr-2">{module.icon}</span>
                {module.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MODULE CONTENT ================= */}
      <div className="container mx-auto px-4 py-8">
        <ActiveComponent />
      </div>
    </div>
  )
}
