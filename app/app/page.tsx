import { universityData } from "@/lib/data";
import SchedulerClient from "@/components/SchedulerClient";

export default function SchedulerPage() {
    return (
        <main className="h-screen flex flex-col overflow-hidden">
            <header className="flex-none h-16 border-b border-white/10 flex items-center px-6 bg-slate-900 z-10">
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    UniFlow Scheduler
                </h1>
                <div className="ml-auto flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-500/50 border border-indigo-500"></div>
                        <span>Lecture</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500/50 border border-emerald-500"></div>
                        <span>Lab</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-auto">
                <SchedulerClient initialData={universityData} />
            </div>
        </main>
    );
}
