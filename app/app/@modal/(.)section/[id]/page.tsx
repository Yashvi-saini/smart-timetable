import { universityData } from "@/lib/data";
import { getCourseForSection } from "@/lib/logic";
import Modal from "@/components/Modal";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { format } from "date-fns";

export default async function SectionModal({ params }: { params: Promise<{ id: string }> }) {
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

    if (!foundSection || !foundCourse) {
        return (
            <Modal>
                <div className="p-8 text-center text-red-400">Section not found</div>
            </Modal>
        )
    }

    return (
        <Modal>
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {foundCourse.title}
                </h2>
                <div className="text-sm text-slate-400 mb-6 uppercase tracking-wider font-semibold">
                    {foundSection.type} • {foundCourse.courseId}
                </div>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
                            <User className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-medium text-slate-200">Professor</h3>
                            <p className="text-slate-400 capitalize">{foundSection.professorId.replace('_', ' ')}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-medium text-slate-200">Time Schedule</h3>
                            <p className="text-slate-400">
                                {format(new Date(foundSection.startTime), "EEEE, MMMM d")} <br />
                                {format(new Date(foundSection.startTime), "h:mm a")} - {format(new Date(foundSection.endTime), "h:mm a")}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-medium text-slate-200">Location</h3>
                            <p className="text-slate-400">{foundSection.location}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm font-medium transition-colors">
                        Edit Details
                    </button>
                </div>
            </div>
        </Modal>
    );
}
