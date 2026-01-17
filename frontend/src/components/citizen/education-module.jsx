"use client"

import { useState } from "react"
import axiosClient from "../../utils/axiosClient"

export default function EducationModule() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    parentName: "",
    contactNumber: "",
    email: "",
    schoolName: "",
    classLevel: "",
    admissionNumber: "",
    address: "",
    medicalHistory: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /* 🔹 ONLY LOGIC CHANGE IS HERE */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosClient.post("/education", formData)
      setSubmitted(true)

      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          fullName: "",
          dateOfBirth: "",
          parentName: "",
          contactNumber: "",
          email: "",
          schoolName: "",
          classLevel: "",
          admissionNumber: "",
          address: "",
          medicalHistory: "",
        })
      }, 2000)
    } catch (error) {
      console.error(error)
      alert("Failed to submit education details")
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#8b5a2b" }}>
        Education Details
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4" style={{ color: "#8b5a2b" }}>
            Basic Information
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
                Student Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="w-full px-4 py-2 rounded border"
                style={{ borderColor: "#e5e7eb" }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded border"
                style={{ borderColor: "#e5e7eb" }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
                Parent/Guardian Name *
              </label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleInputChange}
                placeholder="Enter parent/guardian name"
                className="w-full px-4 py-2 rounded border"
                style={{ borderColor: "#e5e7eb" }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
                Contact Number *
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-2 rounded border"
                style={{ borderColor: "#e5e7eb" }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="w-full px-4 py-2 rounded border"
                style={{ borderColor: "#e5e7eb" }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
                School/Institution Name *
              </label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleInputChange}
                placeholder="Enter school name"
                className="w-full px-4 py-2 rounded border"
                style={{ borderColor: "#e5e7eb" }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
                Class/Level *
              </label>
              <select
                name="classLevel"
                value={formData.classLevel}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded border"
                style={{ borderColor: "#e5e7eb" }}
                required
              >
                <option value="">Select class level</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Class {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
                Admission Number *
              </label>
              <input
                type="text"
                name="admissionNumber"
                value={formData.admissionNumber}
                onChange={handleInputChange}
                placeholder="Enter admission number"
                className="w-full px-4 py-2 rounded border"
                style={{ borderColor: "#e5e7eb" }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
                className="w-full px-4 py-2 rounded border"
                style={{ borderColor: "#e5e7eb" }}
                rows="3"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#8b5a2b" }}>
                Medical History (if any)
              </label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleInputChange}
                placeholder="Enter any relevant medical information"
                className="w-full px-4 py-2 rounded border"
                style={{ borderColor: "#e5e7eb" }}
                rows="3"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-all"
              style={{ backgroundColor: "#2e7d32" }}
            >
              Submit Education Details
            </button>

            {submitted && (
              <div
                className="p-4 rounded-lg text-center"
                style={{ backgroundColor: "#d1fae5", color: "#065f46" }}
              >
                ✓ Details submitted successfully!
              </div>
            )}
          </form>
        </div>

        {/* Info Section */}
        <div className="space-y-4">
          <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
          >
            <h3 className="text-lg font-semibold mb-3" style={{ color: "#8b5a2b" }}>
              📋 Why Register Education Details?
            </h3>
            <ul className="space-y-2" style={{ color: "#6b7280" }}>
              <li>✓ Maintain official education records</li>
              <li>✓ Access to government education schemes</li>
              <li>✓ Digital certificates and documents</li>
              <li>✓ Scholarship eligibility tracking</li>
              <li>✓ Health and vaccination records</li>
              <li>✓ Better communication from schools</li>
            </ul>
          </div>

          <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
          >
            <h3 className="text-lg font-semibold mb-3" style={{ color: "#8b5a2b" }}>
              📚 Available Schemes
            </h3>
            <div className="space-y-3">
              <div className="pb-3 border-b" style={{ borderColor: "#e5e7eb" }}>
                <p className="font-semibold" style={{ color: "#8b5a2b" }}>
                  Mid Day Meal Scheme
                </p>
                <p className="text-sm" style={{ color: "#6b7280" }}>
                  Free meals for students
                </p>
              </div>
              <div className="pb-3 border-b" style={{ borderColor: "#e5e7eb" }}>
                <p className="font-semibold" style={{ color: "#8b5a2b" }}>
                  Scholarship Programs
                </p>
                <p className="text-sm" style={{ color: "#6b7280" }}>
                  Financial aid for eligible students
                </p>
              </div>
              <div>
                <p className="font-semibold" style={{ color: "#8b5a2b" }}>
                  Free Textbooks
                </p>
                <p className="text-sm" style={{ color: "#6b7280" }}>
                  Government distribution program
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
