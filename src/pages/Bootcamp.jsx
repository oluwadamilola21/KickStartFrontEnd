import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/Images/logo.jpg";
import Player from "@vimeo/player";
import axios from "axios";

const userEmail = localStorage.getItem("user_email") || "guest";
const keyPrefix = `${userEmail}-`;

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
  // players.current[refKey] = { player, completed, lastSaved, handlers }
  const players = useRef({});

  const token = localStorage.getItem("access_token");
  const isGuest = !token;

  // Fetch progress for a lesson
  const fetchProgress = async (lesson) => {
    if (isGuest) return;

    try {
      const res = await axios.get(`${API_BASE_URL}/get/${lesson.vimeoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const lessonProgress = res.data || {};

      setProgress((prev) => ({
        ...prev,
        [lesson.id]: {
          // allow 0 explicitly
          position:
            typeof lessonProgress.progress === "number"
              ? lessonProgress.progress
              : 0,
          completed: !!lessonProgress.completed,
        },
      }));
    } catch (err) {
      console.error("Error fetching progress:", err);
    }
  };

  // Save progress
  const saveProgress = async (lesson, position, markComplete = false) => {
    const payload = {
      video_id: lesson.vimeoId,
      progress: Math.floor(position),
      completed: markComplete,
    };

    // if guest: persist in localStorage
    if (isGuest) {
      localStorage.setItem(
        `${keyPrefix}lesson-${lesson.id}-progress`,
        JSON.stringify(payload)
      );
      // update UI for guests too
      setProgress((prev) => ({
        ...prev,
        [lesson.id]: {
          position: payload.progress,
          completed: markComplete || prev[lesson.id]?.completed || false,
        },
      }));
      return;
    }

    // For logged-in users: POST to backend
    try {
      // optimistic UI update if marking complete
      if (markComplete) {
        setProgress((prev) => ({
          ...prev,
          [lesson.id]: {
            position: Math.floor(position),
            completed: true,
          },
        }));
      }

      const res = await axios.post(`${API_BASE_URL}/save`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // server response may contain canonical progress/completed fields
      if (res && res.data) {
        setProgress((prev) => ({
          ...prev,
          [lesson.id]: {
            position:
              typeof res.data.progress === "number"
                ? res.data.progress
                : Math.floor(position),
            completed:
              typeof res.data.completed === "boolean"
                ? res.data.completed
                : markComplete || prev[lesson.id]?.completed || false,
          },
        }));
      }
    } catch (err) {
      console.error("Error saving progress:", err);
      // don't revert optimistic UI for markComplete, but you could show an error toast
    }
  };

  // Attach Vimeo player listeners
  const attachPlayerListeners = (refKey, lesson) => {
    // already attached
    if (players.current[refKey]?.player) return;

    const iframeEl = iframeRefs.current[refKey];
    if (!iframeEl) return;

    const player = new Player(iframeEl);
    // prepare wrapper object
    players.current[refKey] = {
      player,
      completed: false, // local flag to avoid overwrites
      lastSaved: 0,
      handlers: {},
    };

    // restore saved time if available (allow 0)
    const lessonProgress = progress[lesson.id];
    if (lessonProgress && typeof lessonProgress.position === "number") {
      player
        .setCurrentTime(lessonProgress.position)
        .catch((err) => {
          // sometimes setting 0 causes a rejection; ignore
          // console.debug("setCurrentTime rejected:", err);
        });
    }

    // timeupdate handler
    const timeUpdateHandler = (data) => {
      // if we've already marked this player completed, ignore further updates
      if (players.current[refKey].completed) return;

      const secs = Math.floor(data.seconds);
      // only save every 10 seconds (or if lastSaved is 0)
      if (secs - players.current[refKey].lastSaved >= 10) {
        players.current[refKey].lastSaved = secs;
        // save progress (non-final)
        saveProgress(lesson, secs, false);
      }
    };

    // ended handler - use duration as final progress and set completed
    const endedHandler = async () => {
      try {
        const dur = await player.getDuration();
        // mark local as completed to prevent timeupdate overwriting
        players.current[refKey].completed = true;

        // update UI optimistically
        setProgress((prev) => ({
          ...prev,
          [lesson.id]: {
            position: Math.floor(dur),
            completed: true,
          },
        }));

        // save final progress using duration and completed flag
        await saveProgress(lesson, dur, true);
      } catch (err) {
        console.error("Error handling ended:", err);
        // fallback: mark completed with 0 if something fails
        players.current[refKey].completed = true;
        setProgress((prev) => ({
          ...prev,
          [lesson.id]: {
            position: prev[lesson.id]?.position || 0,
            completed: true,
          },
        }));
        saveProgress(lesson, 0, true);
      }
    };

    // store handlers so we can remove later if needed
    players.current[refKey].handlers = {
      timeUpdateHandler,
      endedHandler,
    };

    player.on("timeupdate", timeUpdateHandler);
    player.on("ended", endedHandler);
  };

  // cleanup function if component unmounts (remove listeners)
  useEffect(() => {
    return () => {
      Object.keys(players.current).forEach((refKey) => {
        const entry = players.current[refKey];
        if (entry && entry.player && entry.handlers) {
          try {
            entry.player.off("timeupdate", entry.handlers.timeUpdateHandler);
            entry.player.off("ended", entry.handlers.endedHandler);
          } catch (e) {
            // ignore
          }
        }
      });
      players.current = {};
    };
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      for (let level of bootcampLevels) {
        for (let lesson of level.lessons) {
          await fetchProgress(lesson);
        }
      }
      setAllProgressFetched(true);
    };
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // Attach players once after all progress fetched
  useEffect(() => {
    if (!allProgressFetched) return;
    bootcampLevels.forEach((level) => {
      level.lessons.forEach((lesson) => {
        const refKey = `lesson-${lesson.id}`;
        const el = iframeRefs.current[refKey];
        if (el) attachPlayerListeners(refKey, lesson);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProgressFetched, progress]); // note: progress in deps ensures restored time gets applied if fetchProgress resolves later

  const canAccessLesson = (levelIndex, lessonIndex) => {
    if (levelIndex === 0 && lessonIndex === 0) return true;

    const prevLesson =
      bootcampLevels[levelIndex].lessons[lessonIndex - 1] ||
      bootcampLevels[levelIndex - 1]?.lessons?.slice(-1)[0];

    if (!prevLesson) return false;
    return progress[prevLesson.id]?.completed === true;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-montserrat">
      <header className="bg-white shadow relative flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 sm:px-8">
        <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-3xl font-bold">School of Spreadsheet</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
            Learn Excel from Zero to Dashboard
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-10">
        {bootcampLevels.map((level, dIndex) => (
          <div key={dIndex} className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">
                Level {level.level}: {level.title}
              </h3>
              {!isGuest && (
                <p className="text-xs sm:text-sm text-gray-600">
                  {level.lessons.filter((l) => progress[l.id]?.completed).length}/
                  {level.lessons.length} completed
                </p>
              )}
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full">
              {!isGuest && (
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
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {level.lessons.map((lesson, lessonIndex) => {
                const refKey = `lesson-${lesson.id}`;
                const access = canAccessLesson(dIndex, lessonIndex);
                const isCompleted = progress[lesson.id]?.completed;

                return (
                  <div
                    key={lesson.id}
                    className={`bg-gray-50 p-3 sm:p-4 rounded-lg border ${!access ? "opacity-50 pointer-events-none" : ""
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

                    {!isGuest && (
                      <p
                        className={`mt-2 text-xs sm:text-sm font-semibold ${isCompleted ? "text-green-600" : "text-gray-600"
                          }`}
                      >
                        {isCompleted
                          ? "✅ Completed"
                          : "Watch the full video to mark as completed."}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Bootcamp;
