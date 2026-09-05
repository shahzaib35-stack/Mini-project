import {
  Search,
  Users,
  ShieldCheck,
  Clock,
  Wallet,
  CheckCircle2,
  ArrowRight,
  Building2,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUser } from "../redux/slices/auth.slice";
import { useDispatch } from "react-redux";

export default function Home() {
  let dispatch = useDispatch();
  useEffect(() => {
    async function getCrrUser() {
      try {
        let res = await axios.get("http://localhost:4000/auth/get-me", { withCredentials: true });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    }
    getCrrUser();
  }, []);
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Sora', sans-serif; }

        @keyframes shine {
          0% { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(220%) skewX(-15deg); }
        }
        .btn-primary { position: relative; overflow: hidden; }
        .btn-primary::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.45), transparent);
          transform: translateX(-120%) skewX(-15deg);
        }
        .btn-primary:hover::after { animation: shine 0.9s ease; }

        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .float { animation: floatY 4.5s ease-in-out infinite; }

        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(37,99,235,0.45); }
          70% { box-shadow: 0 0 0 12px rgba(37,99,235,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
        }
        .pulse-ring { animation: pulseRing 2.2s cubic-bezier(0.4,0,0.6,1) infinite; }

        @keyframes dashFlow {
          to { stroke-dashoffset: -40; }
        }
        .flow-line { stroke-dasharray: 6 6; animation: dashFlow 1.4s linear infinite; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease both; }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold ring-1 ring-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 pulse-ring"></span>
              Find Your Dream Property
            </span>

            <h1 className="font-display mt-6 text-5xl font-bold leading-[1.1] text-slate-900">
              Tell us what you need.
              <br />
              <span className="text-blue-600">We connect you to brokers.</span>
            </h1>

            <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-md">
              Looking for a 1 BHK, 2 BHK, 3 BHK, villa, commercial shop, office,
              or plot? Submit your requirement and verified brokers will reach
              out with options that actually fit.
            </p>

            <div className="flex gap-4 mt-9">
              <Link to={"/form"}>
                <button className="cursor-pointer btn-primary group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all">
                  Submit Requirement
                </button>
              </Link>

              <Link to={"/how-it-work"}>
                <button className="cursor-pointer border-2 border-blue-200 text-blue-700 px-7 py-3.5 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all">
                  Learn More
                </button>
              </Link>
            </div>

            <div className="flex gap-10 mt-12 pt-8 border-t border-slate-100">
              {[
                ["10K+", "Property Leads"],
                ["500+", "Verified Brokers"],
                ["25+", "Cities Covered"],
              ].map(([num, label]) => (
                <div key={label}>
                  <h3 className="font-display text-2xl font-bold text-slate-900">
                    {num}
                  </h3>
                  <p className="text-slate-500 text-sm mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Signature live-matching visual */}
          <div className="relative">
            <div className="float bg-gradient-to-b from-blue-50 to-white border border-blue-100 rounded-3xl shadow-xl shadow-blue-900/5 p-8">
              {/* requirement chip */}
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm ring-1 ring-blue-100">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    3 BHK · Andheri West
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Wallet className="w-3 h-3" /> Budget ₹1.2–1.5 Cr
                  </p>
                </div>
              </div>

              {/* connecting flow lines */}
              <svg viewBox="0 0 320 110" className="w-full h-[100px] mt-2">
                <path
                  d="M160 0 L70 60"
                  stroke="#93C5FD"
                  strokeWidth="2"
                  className="flow-line"
                  fill="none"
                />
                <path
                  d="M160 0 L160 60"
                  stroke="#93C5FD"
                  strokeWidth="2"
                  className="flow-line"
                  fill="none"
                />
                <path
                  d="M160 0 L250 60"
                  stroke="#93C5FD"
                  strokeWidth="2"
                  className="flow-line"
                  fill="none"
                />
              </svg>

              {/* matched brokers */}
              <div className="grid grid-cols-3 gap-3">
                {["RS", "AK", "MP"].map((initials, i) => (
                  <div
                    key={initials}
                    className="bg-white rounded-xl p-3 text-center shadow-sm ring-1 ring-blue-50"
                  >
                    <div className="w-10 h-10 mx-auto rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center text-sm">
                      {initials}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5">
                      Broker {i + 1}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full py-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Matched in 2 min 14 sec
              </div>
            </div>

            {/* ambient blue glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200/40 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100/60 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-14">
          <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">
            The Difference
          </span>
          <h2 className="font-display text-4xl font-bold mt-2 text-slate-900">
            Why Choose Us?
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: "Verified Brokers", icon: ShieldCheck },
            { title: "Quick Responses", icon: Clock },
            { title: "Multiple Property Options", icon: Building2 },
            { title: "100% Free For Buyers", icon: Wallet },
          ].map(({ title, icon: Icon }) => (
            <div
              key={title}
              className="group border border-blue-100 rounded-2xl p-7 text-center hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-slate-800">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-700/40 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto text-center px-6">
          <h2 className="font-display text-4xl font-bold">
            Ready to find your next property?
          </h2>

          <p className="mt-4 text-blue-100 max-w-lg mx-auto">
            Submit your requirement today and let verified brokers bring the
            best options to you — no fees, no pressure.
          </p>

          <Link to={"/form"}>
            <button className="cursor-pointer btn-primary group mt-8 inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
              Submit Requirement
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
