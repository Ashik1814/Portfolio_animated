"use client";

import { useState, useEffect, useCallback } from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { CloudMoon, MapPin, ChevronLeft, ChevronRight, Globe } from "lucide-react";

/* ───── Timezone options ───── */
const TIMEZONES = [
  { label: "UTC+6 (BST)", value: "Asia/Dhaka" },
  { label: "UTC+5:30 (IST)", value: "Asia/Kolkata" },
  { label: "UTC+8 (CST)", value: "Asia/Shanghai" },
  { label: "UTC+9 (JST)", value: "Asia/Tokyo" },
  { label: "UTC+0 (GMT)", value: "Europe/London" },
  { label: "UTC+1 (CET)", value: "Europe/Berlin" },
  { label: "UTC-5 (EST)", value: "America/New_York" },
  { label: "UTC-8 (PST)", value: "America/Los_Angeles" },
  { label: "UTC+10 (AEST)", value: "Australia/Sydney" },
  { label: "UTC+3 (MSK)", value: "Europe/Moscow" },
  { label: "UTC+7 (ICT)", value: "Asia/Bangkok" },
  { label: "UTC-6 (CST)", value: "America/Chicago" },
];

/* ───── Analog Clock ───── */
function AnalogClock({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) {
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minDeg = minutes * 6;
  const secDeg = seconds * 6;

  return (
    <div className="relative w-40 h-40 sm:w-48 sm:h-48">
      {/* Outer glow */}
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#00e5ff]/8 via-[#64b5f6]/4 to-[#a78bfa]/8 blur-lg" />

      {/* Clock face */}
      <svg viewBox="0 0 200 200" className="w-full h-full relative">
        {/* Outer ring */}
        <circle cx="100" cy="100" r="96" fill="none" stroke="url(#clockRing)" strokeWidth="1.5" opacity="0.6" />
        <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(100,181,246,0.08)" strokeWidth="0.5" />

        {/* Hour markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const isMain = i % 3 === 0;
          const r1 = isMain ? 78 : 82;
          const r2 = 88;
          return (
            <line
              key={i}
              x1={100 + r1 * Math.sin(angle)}
              y1={100 - r1 * Math.cos(angle)}
              x2={100 + r2 * Math.sin(angle)}
              y2={100 - r2 * Math.cos(angle)}
              stroke={isMain ? "#00e5ff" : "rgba(148,163,184,0.3)"}
              strokeWidth={isMain ? 2.5 : 1}
              strokeLinecap="round"
            />
          );
        })}

        {/* Minute tick marks */}
        {Array.from({ length: 60 }).map((_, i) => {
          if (i % 5 === 0) return null;
          const angle = (i * 6 * Math.PI) / 180;
          return (
            <line
              key={`m${i}`}
              x1={100 + 85 * Math.sin(angle)}
              y1={100 - 85 * Math.cos(angle)}
              x2={100 + 88 * Math.sin(angle)}
              y2={100 - 88 * Math.cos(angle)}
              stroke="rgba(148,163,184,0.12)"
              strokeWidth={0.5}
              strokeLinecap="round"
            />
          );
        })}

        {/* Hour numbers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const num = i === 0 ? 12 : i;
          const angle = (i * 30 * Math.PI) / 180;
          return (
            <text
              key={`n${i}`}
              x={100 + 68 * Math.sin(angle)}
              y={100 - 68 * Math.cos(angle)}
              textAnchor="middle"
              dominantBaseline="central"
              fill="rgba(148,163,184,0.5)"
              fontSize="10"
              fontFamily="system-ui"
              fontWeight="500"
            >
              {num}
            </text>
          );
        })}

        {/* Hour hand */}
        <line x1="100" y1="100" x2={100 + 48 * Math.sin((hourDeg * Math.PI) / 180)} y2={100 - 48 * Math.cos((hourDeg * Math.PI) / 180)} stroke="#00e5ff" strokeWidth="3.5" strokeLinecap="round" />

        {/* Minute hand */}
        <line x1="100" y1="100" x2={100 + 62 * Math.sin((minDeg * Math.PI) / 180)} y2={100 - 62 * Math.cos((minDeg * Math.PI) / 180)} stroke="#64b5f6" strokeWidth="2.5" strokeLinecap="round" />

        {/* Second hand */}
        <line x1={100 - 14 * Math.sin((secDeg * Math.PI) / 180)} y1={100 + 14 * Math.cos((secDeg * Math.PI) / 180)} x2={100 + 70 * Math.sin((secDeg * Math.PI) / 180)} y2={100 - 70 * Math.cos((secDeg * Math.PI) / 180)} stroke="#a78bfa" strokeWidth="1" strokeLinecap="round" />

        {/* Center dot */}
        <circle cx="100" cy="100" r="4" fill="#00e5ff" />
        <circle cx="100" cy="100" r="2" fill="#08050f" />

        <defs>
          <linearGradient id="clockRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#64b5f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ───── Calendar ───── */
function Calendar({ viewYear, viewMonth, today }: { viewYear: number; viewMonth: number; today: Date }) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const isToday = (d: number) =>
    d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const cells: { day: number; isCurrentMonth: boolean; isToday: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, isCurrentMonth: false, isToday: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, isCurrentMonth: true, isToday: isToday(d) });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, isCurrentMonth: false, isToday: false });
  }

  return (
    <div className="w-full">
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0.5 mb-0.5">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-[8px] font-medium dark:text-[#64748b] text-gray-500 py-0">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((cell, i) => (
          <div
            key={i}
            className={`
              aspect-square flex items-center justify-center rounded-md text-[10px] font-medium transition-all duration-200
              ${cell.isCurrentMonth
                ? cell.isToday
                  ? "bg-gradient-to-br from-[#00e5ff] to-[#64b5f6] text-[#06080f] font-bold shadow-md shadow-[#00e5ff]/20"
                  : "dark:text-white/80 text-gray-700 dark:hover:bg-white/[0.06] hover:bg-gray-100 cursor-default"
                : "dark:text-white/15 text-gray-300"
              }
            `}
          >
            {cell.day}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───── Main Component ───── */
export function LiveClockCalendar() {
  const [now, setNow] = useState(() => new Date());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [tzIndex, setTzIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const prevMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) { setViewYear((y) => y - 1); return 11; }
      return m - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) { setViewYear((y) => y + 1); return 0; }
      return m + 1;
    });
  }, []);

  // Get time in selected timezone
  const tz = TIMEZONES[tzIndex].value;
  const tzNow = new Date(now.toLocaleString("en-US", { timeZone: tz }));
  const hours = tzNow.getHours();
  const minutes = tzNow.getMinutes();
  const seconds = tzNow.getSeconds();

  const timeString = tzNow.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: tz,
  });

  const dateString = tzNow.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: tz,
  });

  const greeting =
    hours < 12 ? "Good Morning" : hours < 17 ? "Good Afternoon" : hours < 21 ? "Good Evening" : "Good Night";

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <section className="py-6 section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-900 mb-0.5">
            <span className="gradient-text-cyan">{greeting}</span>
          </h2>
          <p className="text-xs dark:text-[#64748b] text-gray-500">{dateString}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-9 lg:gap-12">
          {/* Left — Clock + Info */}
          <CardSpotlight className="glass-card-solid p-2.5 sm:p-3 flex flex-col items-center justify-center">
            {/* Analog clock */}
            <AnalogClock hours={hours} minutes={minutes} seconds={seconds} />

            {/* Digital time */}
            <div className="mt-2 text-center">
              <p className="text-lg sm:text-xl font-bold dark:text-white text-gray-900 font-mono tracking-wider">
                {timeString}
              </p>
            </div>

            {/* Info row */}
            <div className="mt-1.5 flex flex-wrap items-center justify-center gap-3 text-[11px] dark:text-[#94a3b8] text-gray-600">
              <div className="flex items-center gap-1">
                <CloudMoon className="w-3 h-3 text-[#64b5f6]" />
                <span>{hours >= 6 && hours < 18 ? "☀️ Day" : "🌙 Night"}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#a78bfa]" />
                <span>{tz.split("/").pop()?.replace("_", " ")}</span>
              </div>
            </div>

            {/* Timezone selector — centered */}
            <div className="mt-2 flex items-center justify-center gap-1.5 w-full">
              <Globe className="w-3 h-3 dark:text-[#00e5ff] text-[#00a8cc] shrink-0" />
              <select
                value={tzIndex}
                onChange={(e) => setTzIndex(Number(e.target.value))}
                className="bg-transparent dark:text-[#00e5ff] text-[#00a8cc] text-[11px] font-medium border-none outline-none cursor-pointer appearance-none text-center"
              >
                {TIMEZONES.map((t, i) => (
                  <option key={t.value} value={i} className="dark:bg-[#0d1525] bg-white dark:text-white text-gray-900">
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </CardSpotlight>

          {/* Right — Calendar */}
          <CardSpotlight className="glass-card-solid p-2.5 sm:p-3">
            {/* Month header with nav */}
            <div className="flex items-center justify-between mb-1.5">
              <button onClick={prevMonth} className="w-6 h-6 rounded-md flex items-center justify-center dark:hover:bg-white/[0.06] hover:bg-gray-100 dark:text-[#94a3b8] text-gray-500 transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <h4 className="text-sm font-bold dark:text-white text-gray-900">
                {monthNames[viewMonth]} {viewYear}
              </h4>
              <button onClick={nextMonth} className="w-6 h-6 rounded-md flex items-center justify-center dark:hover:bg-white/[0.06] hover:bg-gray-100 dark:text-[#94a3b8] text-gray-500 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <Calendar viewYear={viewYear} viewMonth={viewMonth} today={now} />

            {/* Today indicator */}
            <div className="mt-1.5 pt-1.5 border-t dark:border-white/[0.06] border-gray-200/60 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
              <span className="text-[10px] dark:text-[#64748b] text-gray-500">
                {viewMonth === now.getMonth() && viewYear === now.getFullYear() ? "Today highlighted" : "Viewing different month"}
              </span>
            </div>
          </CardSpotlight>
        </div>
      </div>
    </section>
  );
}
