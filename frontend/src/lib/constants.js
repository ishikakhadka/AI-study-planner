export const NAV_ELEMENTS = [
  { label: "Home", href: "/dashboard" },
  { label: "Study Portal", href: "/study-portal" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

import {
  Brain,
  CalendarDays,
  ChartColumn,
  Target,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export const CARD_ELEMENTS = [
  {
    id: 1,
    icon: Brain,
    title: "AI Study Plans",
    description:
      "Generate personalized study schedules tailored to your subjects and deadlines.",
  },
  {
    id: 2,
    icon: CalendarDays,
    title: "Smart Scheduling",
    description:
      "Automatically organize your daily study sessions for maximum productivity.",
  },
  {
    id: 3,
    icon: ChartColumn,
    title: "Progress Tracking",
    description:
      "Monitor completed tasks and visualize your academic growth with insightful analytics.",
  },
  {
    id: 4,
    icon: Target,
    title: "Goal Management",
    description:
      "Break large academic goals into smaller, achievable daily milestones.",
  },
  {
    id: 5,
    icon: GraduationCap,
    title: "Exam Preparation",
    description:
      "Prioritize exams and assignments with AI-powered revision plans.",
  },
  {
    id: 6,
    icon: Sparkles,
    title: "Adaptive Learning",
    description:
      "StudyPilot continuously updates your study plan as your progress changes.",
  },
];

export const COLORS = [
  "#6366F1",
  "#EC4899",
  "#14B8A6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

export const motivationalQuotes = {
  Monday: "Start before you feel ready. Progress begins with one step.",
  Tuesday:
    "You don’t need to do everything today. Just do the next right thing.",
  Wednesday: "Halfway there. Keep going — your future self is counting on you.",
  Thursday: "Small efforts repeated every day become extraordinary results.",
  Friday: "You showed up all week. Finish strong.",
  Saturday: "Learn something today that makes tomorrow a little easier.",
  Sunday: "Rest, reflect, reset. A new week is waiting for you.",
};
