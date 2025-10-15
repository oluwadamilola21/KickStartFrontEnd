import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { BarChart3, BookOpen, Award } from "lucide-react";
import BootImg from "../assets/Images/Bootcamp1.jpeg";
import ser1 from "../assets/Images/dataAnalysis.webp";
import ser2 from "../assets/Images/cyber.webp";
import ser3 from "../assets/Images/content.webp";
import ser4 from "../assets/Images/autoEng.webp";
import ser5 from "../assets/Images/dataentry.webp";
import ser6 from "../assets/Images/programming.webp";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const token = q.get("token");
    const uname = q.get("username");

    if (token && uname) {
      localStorage.setItem("token", token);
      localStorage.setItem("username", uname);
      if (!localStorage.getItem("lessonsCompleted")) {
        localStorage.setItem("lessonsCompleted", "0");
      }
      setUsername(uname);
      navigate("/dashboard", { replace: true });
    } else {
      setUsername(localStorage.getItem("username") || "");
    }
  }, [location.search, navigate]);

  const stats = [
    { title: "Enrolled Courses", value: 0, icon: BookOpen },
    {
      title: "Lessons Completed",
      value: localStorage.getItem("lessonsCompleted") || 0,
      icon: BarChart3,
    },
    { title: "Certificates Earned", value: 0, icon: Award },
  ];

  const services = [
    {
      title: "Data Analytics Training",
      desc: "Learn Excel, SQL, BI tools and visualization to unlock insights and land analytics jobs.",
      link: "#",
      image: ser1,
    },
    {
      title: "Cyber Security",
      desc: "Discover strategies to protect systems and data with expert-led, hands-on training.",
      link: "#",
      image: ser2,
    },
    {
      title: "Content Writing",
      desc: "Develop engaging content skills to grow businesses and enhance storytelling abilities.",
      link: "#",
      image: ser3,
    },
    {
      title: "Automation Engineering",
      desc: "Build process automation skills with RPA tools and integrate them into modern workflows.",
      link: "#",
      image: ser4,
    },
    {
      title: "Data Entry",
      desc: "Acquire the discipline and accuracy required for effective data management tasks.",
      link: "#",
      image: ser5,
    },
    {
      title: "Programming",
      desc: "Start coding with Python, JavaScript, and React to develop real-world software solutions.",
      link: "#",
      image: ser6,
    },
  ];

  const events = [
    { name: "School of Spreadsheet Bootcamp", date: "Starts Oct 08", img: BootImg },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-montserrat">
      {/* Header */}
      <header className="text-black shadow">
        <div className="max-w-6xl mx-auto text-center py-8 px-4 sm:py-10">
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
            Welcome, {username || "Learner"} 👋
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-gray-700">
            Explore services, track your progress, and join upcoming programs.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-10 space-y-10 sm:space-y-12">
        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div key={i}className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-lg transition text-center">
              <div className="flex justify-center items-center mb-2 sm:mb-3">
                <stat.icon className="text-blue-600" size={28} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {stat.title}
              </p>
            </div>
          ))}
        </section>

        {/* Services */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6">
            Apply for Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                <img src={service.image} alt={service.title} className="h-36 sm:h-40 w-full object-cover"/>
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 flex-1">
                    {service.desc}
                  </p>
                  <button type="submit" className="w-full bg-blue-900 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 rounded text-xs sm:text-sm transition">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Programs */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6">
            Upcoming Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {events.map((e, i) => (
              <div  key={i} className="bg-white rounded-xl shadow hover:shadow-md overflow-hidden flex flex-col sm:flex-row">
                <img src={e.img} alt={e.name} className="w-full sm:w-40 h-40 sm:h-auto object-cover"/>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                      {e.name}
                    </h3>
                    <p className="text-sm text-blue-600 mt-1">{e.date}</p>
                  </div>
                  <p className="mt-3 sm:mt-4 inline-flex items-center text-blue-600 font-medium text-sm sm:text-base">
                    Learn Excel from Zero to Dashboard
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/bootcamp" className="px-5 sm:px-6 py-2 sm:py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base">
              Go to Bootcamp
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
