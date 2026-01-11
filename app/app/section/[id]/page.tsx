import { universityData } from "@/lib/data";
import { Calendar, Clock, MapPin, User, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

export default async function SectionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: sectionId } = await params;

    let foundSection = null;
    let foundCourse = null;

    for (const dept of universityData) {
        for (const course of dept.courses) {
            const sec = course.sections.find(s => s.id === sectionId);
            if (sec) {
                foundSection = sec;
                foundCourse = course;
                break;
            }
        }
        if (foundSection) break;
    }

    if (!foundSection || !foundCourse) return <div className="p-10 text-white">Not Found</div>;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-6 flex flex-col items-center justify-center">
            <Link href="/app" className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back to Scheduler
            </Link>

            <div className="max-w-2xl w-full bg-slate-900 border border-white/10 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-[100px] rounded-full"></div>

                <div className="relative z-10">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
                        {foundCourse.title}
                    </h1>
                    <div className="flex gap-4 mb-10">
                        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-bold border border-indigo-500/30">
                            {foundCourse.courseId}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 text-sm border border-white/10 uppercase">
                            {foundSection.type}
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3 mb-2 text-indigo-400">
                                <User className="h-5 w-5" />
                                <span className="font-semibold uppercase text-xs tracking-wider">Instructor</span>
                            </div>
                            <p className="text-xl capitalize">{foundSection.professorId.replace('_', ' ')}</p>
                        </div>

                        <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3 mb-2 text-emerald-400">
                                <MapPin className="h-5 w-5" />
                                <span className="font-semibold uppercase text-xs tracking-wider">Location</span>
                            </div>
                            <p className="text-xl">{foundSection.location}</p>
                        </div>

                        <div className="bg-black/20 p-6 rounded-2xl border border-white/5 md:col-span-2">
                            <div className="flex items-center gap-3 mb-2 text-amber-400">
                                <Clock className="h-5 w-5" />
                                <span className="font-semibold uppercase text-xs tracking-wider">Schedule</span>
                            </div>
                            <p className="text-2xl font-mono">
                                {format(new Date(foundSection.startTime), "EEEE")}s
                            </p>
                            <p className="text-lg text-slate-400 mt-1">
                                {format(new Date(foundSection.startTime), "h:mm a")} — {format(new Date(foundSection.endTime), "h:mm a")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
