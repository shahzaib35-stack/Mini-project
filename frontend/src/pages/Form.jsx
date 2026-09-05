import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios"
import {suceessToast,failureToast} from "../utilis/Toast"
import { useNavigate } from "react-router-dom";

export default function Form() {
  let navigate=useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    propertyType: "",
    purpose: "",
    location: "",
    area: "",
    minBudget: "",
    maxBudget: "",
    amenities: [],
    requirements: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, value],
      });
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter(
          (item) => item !== value
        ),
      });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:4000/form/data",formData,{withCredentials:true})
      if (res.data.success) {
        suceessToast(res.data.message)
        navigate('/')
      }
    } catch (error) {
      failureToast(error.response?.data?.message)
    }
  };

  const amenitiesList = [
    "Parking",
    "Gym",
    "Swimming Pool",
    "Lift",
    "Garden",
    "Security",
    "Club House",
    "Power Backup",
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              Property Requirement Form
            </span>

            <h1 className="text-5xl font-bold mt-6">
              Tell Us What You're Looking For
            </h1>

            <p className="text-gray-600 mt-4 text-lg">
              Submit your property requirement and verified brokers will contact
              you with matching options.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">

            <form className="space-y-8" onSubmit={handleSubmit}>

              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Full Name"
                    className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    placeholder="Mobile Number"
                    className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email Address"
                    className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                  />
                </div>
              </div>

              {/* Property Requirement */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Property Requirement
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                    className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select Property Type</option>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4+ BHK">4+ BHK</option>
                    <option value="Villa">Villa</option>
                    <option value="Plot">Plot</option>
                    <option value="Commercial Shop">Commercial Shop</option>
                    <option value="Office Space">Office Space</option>
                  </select>

                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                    className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Property Purpose</option>
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                  </select>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Preferred Location"
                    className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                    placeholder="Area (Sq Ft)"
                    className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Budget Details
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="number"
                    name="minBudget"
                    value={formData.minBudget}
                    onChange={handleChange}
                    required
                    placeholder="Minimum Budget (₹)"
                    className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  <input
                    type="number"
                    name="maxBudget"
                    value={formData.maxBudget}
                    onChange={handleChange}
                    required
                    placeholder="Maximum Budget (₹)"
                    className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Preferred Amenities
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {amenitiesList.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl"
                    >
                      <input
                        type="checkbox"
                        value={item}
                        checked={formData.amenities.includes(item)}
                        onChange={handleAmenityChange}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Requirements */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Additional Requirements
                </h2>

                <textarea
                  rows="5"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                  placeholder="Tell us anything else brokers should know..."
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition"
              >
                Submit Requirement
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}