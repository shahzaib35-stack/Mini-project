import React, { useEffect, useState } from "react";
import axios from "axios";
import { suceessToast } from "../utilis/Toast";

const Admin = () => {
  let [data, setData] = useState([]);
  useEffect(() => {
    async function getdata() {
      try {
        const res = await axios.get("http://localhost:4000/form/get-all-user", {
          withCredentials: true,
        });

        if (res.data.success) {
          setData(res.data.allData);
          console.log(res.data.allData);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getdata();
  }, []);
  let handleDelete = async (id) => {
    try {
      let res = await axios.delete("http://localhost:4000/form/delete", {
        data: { id },
        withCredentials: true,
      });

      if (res.data.success) {
        suceessToast(res.data.message);
        setData((prevData) =>
        prevData.filter((lead) => lead._id !== id)
      );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 m-5">
      {data.map((lead) => (
        <div
          key={lead._id}
          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold">{lead.fullName}</h2>

                <p className="mt-0.5 text-xs text-blue-100">
                  {lead.propertyType}
                </p>
              </div>

              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold backdrop-blur">
                {lead.purpose}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-3 p-3">
            {/* Contact */}
            <div>
              <h3 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Contact Details
              </h3>

              <div className="space-y-1.5">
                <div className="rounded-lg bg-slate-50 px-2.5 py-2">
                  <p className="text-[10px] text-slate-500">Email</p>
                  <p className="break-all text-xs font-medium">{lead.email}</p>
                </div>

                <div className="rounded-lg bg-slate-50 px-2.5 py-2">
                  <p className="text-[10px] text-slate-500">Mobile</p>
                  <p className="text-xs font-medium">{lead.mobile}</p>
                </div>

                <div className="rounded-lg bg-slate-50 px-2.5 py-2">
                  <p className="text-[10px] text-slate-500">Location</p>
                  <p className="text-xs font-medium">{lead.location}</p>
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div>
              <h3 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Property Details
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-blue-50 p-2">
                  <p className="text-[10px] text-slate-500">Area</p>

                  <p className="text-xs font-semibold text-blue-700">
                    {lead.area.toLocaleString()} sq.ft
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 p-2">
                  <p className="text-[10px] text-slate-500">Budget</p>

                  <p className="text-xs font-semibold text-green-700">
                    ₹{lead.minBudget.toLocaleString()} - ₹
                    {lead.maxBudget.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Amenities
              </h3>

              <div className="flex flex-wrap gap-1">
                {lead.amenities?.map((item, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Requirements
              </h3>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-700">
                {lead.requirements}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t pt-2.5">
              <div className="mb-2.5 flex items-center justify-between text-[10px]">
                <span className="text-slate-500">Created On</span>

                <span className="font-medium text-slate-700">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </span>
              </div>

              <button
                onClick={() => {
                  handleDelete(lead._id);
                }}
                className="w-full rounded-lg bg-red-600 py-2 text-xs font-medium text-white transition hover:bg-red-700"
              >
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admin;
