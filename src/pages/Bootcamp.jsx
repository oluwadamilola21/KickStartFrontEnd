import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/Images/logo.jpg";
import Player from "@vimeo/player";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const bootcampLevels = [
  {
    level: 1,
    title: "Excel Basics",
    lessons: [
      { id: 1, title: "EXCEL INTERFACE A", vimeoId: "1126791548" },
      { id: 2, title: "EXCEL INTERFACE B", vimeoId: "1126793172" },
      { id: 3, title: "CELL REFERENCING", vimeoId: "1126796160" },
      { id: 4, title: "RELATIVE AND ABSOLUTE REFERENCING", vimeoId: "1126799661" },
      { id: 5, title: "MIXED REFERENCING", vimeoId: "1126800435" },
      { id: 6, title: "STRUCTURED REFERENCING", vimeoId: "1126800791" },
      { id: 7, title: "SUMIF", vimeoId: "1126801314" },
      { id: 8, title: "COUNTIF", vimeoId: "1126801648" },
      { id: 9, title: "VLOOKUP", vimeoId: "1126801818" },
    ],
  },
  {
    level: 2,
    title: "Formulas & Functions",
    lessons: [
      { id: 10, title: "Basic Formulas", vimeoId: "1126791548" },
      { id: 11, title: "Functions in Excel", vimeoId: "1126791548" },
    ],
  },
];

const Bootcamp = () => {
  const [progress, setProgress] = useState({});
  const [allProgressFetched, setAllProgressFetched] = useState(false);
  const iframeRefs = useRef({});
  const players = useRef({});
  const token = localStorage.getItem("access_token");

  // ✅ Fetch all progress from backend
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user-progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Expect res.data = { vimeoId: { progress, completed }, ... }
        const backendProgress = {};
        bootcampLevels.forEach((level) => {
          level.lessons.forEach((lesson) => {
            const data = res.data?.[lesson.vimeoId] || {};
            backendProgress[lesson.id] = {
              position: typeof data.progress === "number" ? data.progress : 0,
              completed: !!data.completed,
            };
          });
        });

        setProgress(backendProgress);
        setAllProgressFetched(true);
      } catch (err) {
        console.error("Error fetching progress:", err);
        setAllProgressFetched(true);
      }
    };
    if (token) fetchAll();
    else setAllProgressFetched(true);
  }, [token]);

  // ✅ Save progress to backend
  const saveProgress = async (lesson, position, markComplete = false) => {
    if (!token) return;

    const payload = {
      video_id: lesson.vimeoId,
      progress: Math.floor(position),
      completed: markComplete,
    };

    try {
      if (markComplete) {
        setProgress((prev) => ({
          ...prev,
          [lesson.id]: { position: Math.floor(position), completed: true },
        }));
      }

      const res = await axios.post(`${API_BASE_URL}/save`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data) {
        setProgress((prev) => ({
          ...prev,
          [lesson.id]: {
            position: res.data.progress ?? position,
            completed: res.data.completed ?? markComplete,
          },
        }));
      }
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  };

  // ✅ Vimeo event handling
  const attachPlayerListeners = (refKey, lesson) => {
    if (players.current[refKey]?.player) return;
    const iframeEl = iframeRefs.current[refKey];
    if (!iframeEl) return;

    const player = new Player(iframeEl);
    players.current[refKey] = { player, completed: false, lastSaved: 0 };

    const lessonProgress = progress[lesson.id];
    if (lessonProgress && typeof lessonProgress.position === "number") {
      player.setCurrentTime(lessonProgress.position).catch(() => {});
    }

    player.on("timeupdate", (data) => {
      if (players.current[refKey].completed) return;
      const secs = Math.floor(data.seconds);
      if (secs - players.current[refKey].lastSaved >= 10) {
        players.current[refKey].lastSaved = secs;
        saveProgress(lesson, secs, false);
      }
    });

    player.on("ended", async () => {
      const dur = await player.getDuration();
      players.current[refKey].completed = true;
      await saveProgress(lesson, dur, true);
    });
  };

  // ✅ Initialize Vimeo players only after progress fetched
  useEffect(() => {
    if (!allProgressFetched) return;
    bootcampLevels.forEach((level) => {
      level.lessons.forEach((lesson) => {
        const refKey = `lesson-${lesson.id}`;
        if (iframeRefs.current[refKey]) attachPlayerListeners(refKey, lesson);
      });
    });
  }, [allProgressFetched, progress]);

  // ✅ Unlock rule: previous lesson must be completed
  const canAccessLesson = (levelIndex, lessonIndex) => {
    if (levelIndex === 0 && lessonIndex === 0) return true;
    const prevLesson =
      bootcampLevels[levelIndex].lessons[lessonIndex - 1] ||
      bootcampLevels[levelIndex - 1]?.lessons?.slice(-1)[0];
    return progress[prevLesson?.id]?.completed;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-montserrat">
      <header className="bg-white shadow flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 sm:px-8">
        <img
          src={logo}
          alt="Logo"
          className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-full shadow-lg"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-3xl font-bold">School of Spreadsheet</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
            Learn Excel from Zero to Dashboard
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-10">
        {!allProgressFetched ? (
          <p className="text-center text-gray-600">Loading progress...</p>
        ) : (
          bootcampLevels.map((level, dIndex) => (
            <div key={dIndex} className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h3 className="text-base sm:text-lg font-bold text-gray-800">
                  Level {level.level}: {level.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {level.lessons.filter((l) => progress[l.id]?.completed).length}/
                  {level.lessons.length} completed
                </p>
              </div>

              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${
                      (level.lessons.filter((l) => progress[l.id]?.completed).length /
                        level.lessons.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {level.lessons.map((lesson, lessonIndex) => {
                  const refKey = `lesson-${lesson.id}`;
                  const access = canAccessLesson(dIndex, lessonIndex);
                  const isCompleted = progress[lesson.id]?.completed;
                  return (
                    <div
                      key={lesson.id}
                      className={`bg-gray-50 p-3 sm:p-4 rounded-lg border ${
                        !access ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      <h4 className="text-sm sm:text-base font-medium">{lesson.title}</h4>
                      <div className="aspect-video mt-2 rounded overflow-hidden">
                        <iframe
                          ref={(el) => (iframeRefs.current[refKey] = el)}
                          src={`https://player.vimeo.com/video/${lesson.vimeoId}?badge=0&autopause=0&app_id=58479`}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          title={lesson.title}
                        ></iframe>
                      </div>
                      <p
                        className={`mt-2 text-xs sm:text-sm font-semibold ${
                          isCompleted ? "text-green-600" : "text-gray-600"
                        }`}
                      >
                        {isCompleted
                          ? "✅ Completed"
                          : "Watch the full video to mark as completed."}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Bootcamp;
