"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Brain, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white">U</span>
            </div>
            <span className="font-bold text-xl tracking-tight">UniFlow</span>
          </div>
          <Link
            href="/app"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8"
          >
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent"
          >
            The Intelligent <br className="hidden md:block" />
            University Scheduler
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Experience the future of academic planning. Drag, drop, and let our
            physics-based engine handle the conflicts, overlaps, and travel time
            paradoxes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/app"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-indigo-600 px-8 font-medium text-white transition-all duration-300 hover:bg-indigo-700 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <span className="mr-2">Launch App</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="px-8 py-3 rounded-lg text-slate-300 hover:text-white border border-white/10 hover:bg-white/5 transition-all">
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="max-w-7xl mx-auto mt-32 grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Calendar className="h-6 w-6 text-emerald-400" />}
            title="Smart Tetris Overlap"
            description="Dynamic resizing for overlapping events. Say goodbye to cluttered, unreadable schedules."
            delay={0.4}
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-amber-400" />}
            title="Physics Feedback"
            description="Tactile interactions. Cards lift, shadows deepen, and invalid drops shake with intuitive feedback."
            delay={0.5}
          />
          <FeatureCard
            icon={<Brain className="h-6 w-6 text-pink-400" />}
            title="Logic Engine"
            description="Real-time validation for prerequisites and travel time. The system thinks before you drop."
            delay={0.6}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <p>© 2024 UniFlow. Crafted for the future.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all group"
    >
      <div className="h-12 w-12 rounded-lg bg-gray-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/10">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-slate-100">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
