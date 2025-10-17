import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { BarChart3, BookOpen, Award } from "lucide-react";
import axios from "axios";
import BootImg from "../assets/Images/Bootcamp1.jpeg";
import ser1 from "../assets/Images/dataAnalysis.webp";
import ser2 from "../assets/Images/cyber.webp";
import ser3 from "../assets/Images/content.webp";
import ser4 from "../assets/Images/autoEng.webp";
import ser5 from "../assets/Images/dataentry.webp";
import ser6 from "../assets/Images/programming.webp";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const token = q.get("token");
    const uname = q.get("username");

    if (token && uname) {
      localStorage.setItem("access_token", token);
      localStorage.setItem("username", uname);
      setUsername(uname);
      navigate("/dashboard", { replace: true });
    } else {
      setUsername(localStorage.getItem("username") || "");
    }
  }, [location.search, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    const fetchSummary = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user-progress-summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLessonsCompleted(res.data?.completed || 0);
      } catch (err) {
        console.error("Error fetching progress summary:", err);
      }
    };
    fetchSummary();
  }, []);

  const stats = [
    { title: "Enrolled Courses", value: 0, icon: BookOpen },
    { title: "Lessons Completed", value: lessonsCompleted, icon: BarChart3 },
    { title: "Certificates Earned", value: 0, icon: Award },
  ];

  const services = [
    { title: "Data Analytics Training", desc: "Learn Excel, SQL, BI tools...", image: ser1 },
    { title: "Cyber Security", desc: "Protect systems and data...", image: ser2 },
    { title: "Content Writing", desc: "Master storytelling and SEO...", image: ser3 },
    { title: "Automation Engineering", desc: "Build process automation...", image: ser4 },
    { title: "Data Entry", desc: "Improve accuracy and workflow...", image: ser5 },
    { title: "Programming", desc: "Learn Python, JS, and React...", image: ser6 },
  ];

  const events = [
    { name: "School of Spreadsheet Bootcamp", date: "Ongoing", img: BootImg },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-montserrat">
      <header className="text-black shadow">
        <div className="max-w-6xl mx-auto text-center py-8 px-4">
          <h1 className="text-2xl sm:text-4xl font-bold">
            Welcome, {username || "Learner"} 👋
          </h1>
          <p className="mt-2 text-sm sm:text-lg text-gray-700">
            Explore services, track your progress, and join upcoming programs.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <div className="flex justify-center mb-3">
                <stat.icon className="text-blue-600" size={28} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Apply for Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
                <img src={s.image} alt={s.title} className="h-40 w-full object-cover" />
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{s.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 flex-1">{s.desc}</p>
                  <button className="mt-4 bg-blue-900 hover:bg-blue-700 text-white py-2 rounded text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Upcoming Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((e, i) => (
              <div key={i} className="bg-white rounded-xl shadow flex flex-col sm:flex-row overflow-hidden">
                <img src={e.img} alt={e.name} className="w-full sm:w-40 h-40 object-cover" />
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-semibold">{e.name}</h3>
                    <p className="text-sm text-blue-600 mt-1">{e.date}</p>
                  </div>
                  <p className="mt-3 text-blue-600 font-medium text-sm">
                    Learn Excel from Zero to Dashboard
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/bootcamp"
              className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition text-sm"
            >
              Go to Bootcamp
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
