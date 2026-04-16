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
    <div className="relative w-36 h-36 sm:w-40 sm:h-40">
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
function Calendar({
  viewYear,
  viewMonth,
  today,
  selectedDate,
  onSelectDate,
}: {
  viewYear: number;
  viewMonth: number;
  today: Date;
  selectedDate: number | null;
  onSelectDate: (day: number) => void;
}) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const isToday = (d: number) =>
    d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const cells: { day: number; isCurrentMonth: boolean; isToday: boolean; isSelected: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, isCurrentMonth: false, isToday: false, isSelected: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, isCurrentMonth: true, isToday: isToday(d), isSelected: d === selectedDate });
  }

  // Use only as many rows as needed (5 or 6), not always 6
  const totalCells = cells.length;
  const rows = Math.ceil(totalCells / 7);
  const targetCells = rows * 7;
  const remaining = targetCells - totalCells;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, isCurrentMonth: false, isToday: false, isSelected: false });
  }

  return (
    <div className="w-full">
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0.5 mb-0.5">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-[8px] font-medium dark:text-[#64748b] text-gray-500">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((cell, i) => (
          <button
            key={i}
            type="button"
            onClick={() => cell.isCurrentMonth && onSelectDate(cell.day)}
            className={`
              aspect-square flex items-center justify-center rounded-md text-[10px] font-medium transition-all duration-200
              ${cell.isCurrentMonth
                ? cell.isSelected
                  ? "bg-gradient-to-br from-[#00e5ff] to-[#64b5f6] text-[#06080f] font-bold shadow-md shadow-[#00e5ff]/20"
                  : cell.isToday
                    ? "dark:text-white/80 text-gray-700 ring-1 ring-[#00e5ff]/40 font-semibold cursor-pointer dark:hover:bg-white/[0.06] hover:bg-gray-100"
                    : "dark:text-white/80 text-gray-700 cursor-pointer dark:hover:bg-white/[0.06] hover:bg-gray-100"
                : "dark:text-white/15 text-gray-300 cursor-default"
              }
            `}
          >
            {cell.day}
          </button>
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
  const [selectedDate, setSelectedDate] = useState<number | null>(new Date().getDate());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const prevMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) { setViewYear((y) => y - 1); return 11; }
      return m - 1;
    });
    setSelectedDate(null);
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) { setViewYear((y) => y + 1); return 0; }
      return m + 1;
    });
    setSelectedDate(null);
  }, []);

  const handleSelectDate = useCallback((day: number) => {
    setSelectedDate(day);
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
    <section className="py-5 section-padding">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-3">
          <h2 className="text-lg sm:text-xl font-bold dark:text-white text-gray-900 mb-0.5">
            <span className="gradient-text-cyan">{greeting}</span>
          </h2>
          <p className="text-[11px] dark:text-[#64748b] text-gray-500">{dateString}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
          {/* Left — Clock + Info */}
          <CardSpotlight className="p-2.5 sm:p-3 flex flex-col items-center justify-center bg-white/40 dark:bg-[#0a0512]/25 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] rounded-2xl">
            {/* Analog clock */}
            <AnalogClock hours={hours} minutes={minutes} seconds={seconds} />

            {/* Digital time */}
            <div className="mt-1.5 text-center">
              <p className="text-base sm:text-lg font-bold dark:text-white text-gray-900 font-mono tracking-wider">
                {timeString}
              </p>
            </div>

            {/* Info row */}
            <div className="mt-1 flex flex-wrap items-center justify-center gap-3 text-[10px] dark:text-[#94a3b8] text-gray-600">
              <div className="flex items-center gap-1">
                <CloudMoon className="w-2.5 h-2.5 text-[#64b5f6]" />
                <span>{hours >= 6 && hours < 18 ? "☀️ Day" : "🌙 Night"}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-[#a78bfa]" />
                <span>{tz.split("/").pop()?.replace("_", " ")}</span>
              </div>
            </div>

            {/* Timezone selector — centered */}
            <div className="mt-1.5 flex items-center justify-center gap-1.5 w-full">
              <Globe className="w-2.5 h-2.5 dark:text-[#00e5ff] text-[#00a8cc] shrink-0" />
              <select
                value={tzIndex}
                onChange={(e) => setTzIndex(Number(e.target.value))}
                className="bg-transparent dark:text-[#00e5ff] text-[#00a8cc] text-[10px] font-medium border-none outline-none cursor-pointer appearance-none text-center"
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
          <CardSpotlight className="p-2.5 sm:p-3 bg-white/40 dark:bg-[#0a0512]/25 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] rounded-2xl">
            {/* Month header with nav */}
            <div className="flex items-center justify-between mb-1">
              <button onClick={prevMonth} className="w-5 h-5 rounded-md flex items-center justify-center dark:hover:bg-white/[0.06] hover:bg-gray-100 dark:text-[#94a3b8] text-gray-500 transition-colors">
                <ChevronLeft className="w-3 h-3" />
              </button>
              <h4 className="text-xs font-bold dark:text-white text-gray-900">
                {monthNames[viewMonth]} {viewYear}
              </h4>
              <button onClick={nextMonth} className="w-5 h-5 rounded-md flex items-center justify-center dark:hover:bg-white/[0.06] hover:bg-gray-100 dark:text-[#94a3b8] text-gray-500 transition-colors">
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <Calendar viewYear={viewYear} viewMonth={viewMonth} today={now} selectedDate={selectedDate} onSelectDate={handleSelectDate} />
          </CardSpotlight>
        </div>
      </div>
    </section>
  );
}
