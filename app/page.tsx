"use client";

import { motion, useScroll } from "framer-motion";
import { ArrowRight, Calendar, Brain, Zap, Play, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] text-slate-50 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px]" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-bold text-white">U</span>
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              UniFlow
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#features" className="hidden md:block text-sm text-slate-400 hover:text-white transition-colors">Features</Link>
            <Link href="#workflow" className="hidden md:block text-sm text-slate-400 hover:text-white transition-colors">How it Works</Link>
            <Link
              href="/app"
              className="px-4 py-2 text-sm font-medium bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
            >
              Master Your <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Academic Time
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Stop wrestling with spreadsheets. Our physics-based engine handles conflicts, travel time, and prerequisites instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/app"
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-bold text-slate-900 transition-all duration-300 hover:bg-slate-200 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <span className="mr-2">Get Started</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="h-14 px-8 rounded-full text-slate-300 hover:text-white border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2 group">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Play className="w-3 h-3 fill-current" />
                </div>
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
            >
              {/* Trusted By Lines */}
              <p className="text-xs tracking-widest uppercase font-semibold">Trusted By Departments At</p>
              <div className="h-px w-12 bg-white/20"></div>
              <span className="font-serif font-bold">Stanford</span>
              <span className="font-mono font-bold">MIT</span>
            </motion.div>
          </div>

          {/* Enhanced Right Visual */}
          <div className="flex-1 w-full max-w-[600px] perspective-1000">
            <motion.div
              initial={{ rotateX: 20, rotateY: -20, opacity: 0 }}
              animate={{ rotateX: 5, rotateY: -5, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden group"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Header Bar */}
              <div className="h-8 flex items-center gap-2 mb-4 px-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-3 gap-2 h-[300px]">
                {/* Column 1 */}
                <div className="space-y-2 pt-8">
                  <FloatingCard theme="indigo" width="w-full" delay={0} />
                  <FloatingCard theme="indigo" width="w-full" delay={2} />
                </div>
                {/* Column 2 */}
                <div className="space-y-2 relative">
                  {/* Error Shake Animation Block */}
                  <motion.div
                    animate={{ y: [0, 100, 0], rotate: [0, 2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-full z-20"
                  >
                    <div className="h-24 rounded-lg bg-emerald-500/20 border border-emerald-500/50 p-3 backdrop-blur-md shadow-lg">
                      <div className="w-12 h-2 bg-emerald-400/50 rounded mb-2"></div>
                      <div className="w-20 h-2 bg-emerald-400/30 rounded"></div>
                      <div className="absolute -right-2 -top-2 bg-emerald-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Success
                      </div>
                    </div>
                  </motion.div>
                </div>
                {/* Column 3 */}
                <div className="space-y-4 pt-4">
                  <FloatingCard theme="purple" width="w-full" delay={1} />
                  <FloatingCard theme="purple" width="w-full" delay={3} />
                </div>
              </div>

              {/* Overlay Gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-4">
              Reinventing the Schedule
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We replaced manual conflict checking with an intelligent physics engine.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
        </div>
      </section>

      {/* How it Works / Workflow */}
      <section id="workflow" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">From Chaos to Clarity in <span className="text-indigo-400">Seconds</span></h2>
              <div className="space-y-8">
                <StepItem
                  number="01"
                  title="Import Data"
                  desc="Upload your CSV or connect directly to your SIS. We handle the parsing."
                />
                <StepItem
                  number="02"
                  title="Drag & Drop"
                  desc="Visually arrange classes. Our engine prevents conflicts in real-time."
                />
                <StepItem
                  number="03"
                  title="Publish"
                  desc="Share the optimized schedule with students and faculty instantly."
                />
              </div>
            </div>
            <div className="relative">
              {/* Interactive Stats Visual */}
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <div className="text-sm font-semibold text-slate-300">Optimization Report</div>
                  <div className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">Live</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-xs text-slate-400 mb-1">Conflicts Resolved</div>
                    <div className="text-2xl font-bold text-white">1,248</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-xs text-slate-400 mb-1">Time Saved</div>
                    <div className="text-2xl font-bold text-indigo-400">420h</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Room Utilization</span>
                    <span>98%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "98%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    ></motion.div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                    <span>Student Satisfaction</span>
                    <span>4.9/5</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    ></motion.div>
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 -right-10 -bottom-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Trusted by Academic Leaders</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="UniFlow cut our scheduling time by 90%. It's like having a supercomputer for a registrar."
              author="Dr. Sarah Chen"
              role="Dean of Engineering"
            />
            <TestimonialCard
              quote="The conflict detection is magic. No more angry emails about double-booked rooms."
              author="Mark Thompson"
              role="Registrar, State Tech"
            />
            <TestimonialCard
              quote="Finally, software that feels like it was designed in this decade. Beautiful and functional."
              author="Elena Rodriguez"
              role="Provost"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Optimize?</h2>
          <p className="text-slate-400 text-xl mb-10">Join 500+ universities modernizing their workflow today.</p>
          <Link
            href="/app"
            className="inline-flex h-16 items-center justify-center rounded-full bg-white px-10 font-bold text-slate-900 transition-all duration-300 hover:scale-105 hover:bg-indigo-50"
          >
            Launch Scheduler
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#020617] py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-slate-800 rounded flex items-center justify-center">
              <span className="font-bold text-xs text-white">U</span>
            </div>
            <p>© 2024 UniFlow Inc.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">GitHub</a>
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
      className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all group cursor-default"
    >
      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/10 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-slate-100 group-hover:text-indigo-300 transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
    </motion.div>
  );
}

function FloatingCard({ theme, width, delay }: { theme: "indigo" | "purple", width: string, delay: number }) {
  const styles = {
    indigo: {
      card: "bg-indigo-500/20 border-indigo-500/40",
      bar1: "bg-indigo-500/50",
      bar2: "bg-indigo-500/30"
    },
    purple: {
      card: "bg-purple-500/20 border-purple-500/40",
      bar1: "bg-purple-500/50",
      bar2: "bg-purple-500/30"
    }
  };

  const s = styles[theme];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`h-20 rounded-lg border ${s.card} ${width} p-3 flex flex-col justify-between`}
    >
      <div className={`w-8 h-2 rounded ${s.bar1}`}></div>
      <div className={`w-16 h-2 rounded ${s.bar2}`}></div>
    </motion.div>
  )
}

function StepItem({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-6">
      <div className="text-4xl font-bold text-white/10 font-mono">{number}</div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-slate-200">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function TestimonialCard({ quote, author, role }: { quote: string, author: string, role: string }) {
  return (
    <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/5 relative">
      <div className="text-4xl text-indigo-500 absolute top-4 left-4 font-serif opacity-30">"</div>
      <p className="text-lg text-slate-300 mb-6 relative z-10 italic">
        {quote}
      </p>
      <div>
        <div className="font-bold text-white">{author}</div>
        <div className="text-sm text-slate-500">{role}</div>
      </div>
    </div>
  )
}
