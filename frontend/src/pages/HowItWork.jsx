import React from 'react'
import { Search, Users, ShieldCheck, Clock, Wallet, CheckCircle2, ArrowRight, Building2, MapPin } from "lucide-react";
import Navbar from '../components/Navbar';


const HowItWork = () => {
  return (
    <div>
        <Navbar/>
            <section className="bg-blue-50/60 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">The Process</span>
            <h2 className="font-display text-4xl font-bold mt-2 text-slate-900">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              { n: "1", title: "Submit Requirement", desc: "Fill in your property preferences, location, and budget.", icon: Search },
              { n: "2", title: "Brokers Receive Lead", desc: "Verified brokers review your requirement instantly.", icon: Users },
              { n: "3", title: "Get Property Options", desc: "Receive matching properties and schedule visits easily.", icon: MapPin },
            ].map((step, i) => (
              <div
                key={step.n}
                className="group bg-white rounded-2xl p-8 shadow-sm ring-1 ring-blue-100/70 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                    {step.n}
                  </div>
                  <step.icon className="w-6 h-6 text-blue-300 group-hover:text-blue-500 transition-colors" />
                </div>
                <h3 className="font-display font-bold text-xl mt-5 text-slate-900">{step.title}</h3>
                <p className="text-slate-500 mt-2.5 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWork
