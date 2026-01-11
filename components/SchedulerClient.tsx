"use client";

import { useState, useMemo, useRef } from "react";
import { Department, SectionEvent } from "@/lib/types";
import { getAllSections, validateMove } from "@/lib/logic";
import { computeEventLayouts } from "@/lib/layoutUtils";
import { motion, PanInfo, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { addMinutes, format, startOfWeek, addDays, getDay, differenceInMinutes, setHours, setMinutes } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

interface SchedulerClientProps {
    initialData: Department[];
}

const CELL_HEIGHT = 80; 
const MINUTES_PER_PIXEL = 60 / CELL_HEIGHT;
const START_HOUR = 8;
const END_HOUR = 20;

export default function SchedulerClient({ initialData }: SchedulerClientProps) {
    const [data, setData] = useState<Department[]>(initialData);
    const containerRef = useRef<HTMLDivElement>(null);

    const sections = useMemo(() => getAllSections(data), [data]);
    const layouts = useMemo(() => computeEventLayouts(sections, START_HOUR), [sections]);

    const baseDate = useMemo(() => {
        if (sections.length > 0) return startOfWeek(new Date(sections[0].startTime), { weekStartsOn: 1 });
        return startOfWeek(new Date(), { weekStartsOn: 1 });
    }, [sections]);

    const weekDays = useMemo(() => {
        return Array.from({ length: 5 }).map((_, i) => addDays(baseDate, i));
    }, [baseDate]);

    const updateSectionTime = (sectionId: string, newStart: Date, newEnd: Date) => {
        setData((prev) => {
            const newData = JSON.parse(JSON.stringify(prev)) as Department[];

            for (const dept of newData) {
                for (const course of dept.courses) {
                    const sectionIndex = course.sections.findIndex((s) => s.id === sectionId);
                    if (sectionIndex !== -1) {
                        course.sections[sectionIndex].startTime = newStart.toISOString();
                        course.sections[sectionIndex].endTime = newEnd.toISOString();
                        return newData;
                    }
                }
            }
            return newData;
        });
    };

    return (
        <div className="flex h-full flex-col bg-slate-900/50">
            {/* Header Days */}
            <div className="flex border-b border-white/10 ml-16">
                {weekDays.map((day) => (
                    <div key={day.toString()} className="flex-1 py-3 text-center border-l border-white/5">
                        <div className="text-sm font-medium text-slate-300">
                            {format(day, "EEE")}
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {format(day, "d")}
                        </div>
                    </div>
                ))}
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto relative" ref={containerRef}>
                <div className="flex min-h-[960px] relative"> 
                    {/* Time Axis */}
                    <div className="w-16 flex-none border-r border-white/10 bg-slate-900/80 sticky left-0 z-30">
                        {Array.from({ length: END_HOUR - START_HOUR + 1 }).map((_, i) => {
                            const hour = START_HOUR + i;
                            return (
                                <div key={hour} className="h-[80px] text-right pr-2 pt-1 text-xs text-slate-500 relative">
                                    <span className="-top-2 relative bg-slate-900 px-1">{format(setHours(new Date(), hour), "h a")}</span>
                                    <div className="absolute top-0 right-0 w-2 border-t border-white/10"></div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Day Columns */}
                    {weekDays.map((day, colIndex) => {
                        const dayParams = { start: setHours(day, START_HOUR), end: setHours(day, END_HOUR) };
                        return (
                            <div key={day.toString()} className="flex-1 border-l border-white/5 relative group">
                                {/* Grid Lines */}
                                {Array.from({ length: END_HOUR - START_HOUR }).map((_, i) => (
                                    <div key={i} className="absolute w-full border-t border-white/[0.03]" style={{ top: (i + 1) * CELL_HEIGHT }}></div>
                                ))}

                                {/* Events */}
                                {sections.filter(s => {
                                    const d = new Date(s.startTime);
                                    return d.getDate() === day.getDate() && d.getMonth() === day.getMonth();
                                }).map(section => {
                                    const layout = layouts[section.id];
                                    if (!layout) return null;

                                    return (
                                        <DraggableEvent
                                            key={section.id}
                                            section={section}
                                            layout={layout}
                                            allSections={sections}
                                            departments={data}
                                            onUpdate={updateSectionTime}
                                        />
                                    );
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

// Draggable Component
function DraggableEvent({ section, layout, allSections, departments, onUpdate }: {
    section: SectionEvent;
    layout: any;
    allSections: SectionEvent[];
    departments: Department[];
    onUpdate: (id: string, start: Date, end: Date) => void;
}) {
    const controls = useAnimation();
    const [isDragging, setIsDragging] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const handleDragStart = () => {
        setIsDragging(true);
        setIsValid(true);
    };

    const handleDragEnd = async (event: any, info: PanInfo) => {
        setIsDragging(false);
        const yOffset = info.offset.y;

        const minutesDelta = Math.round((yOffset * MINUTES_PER_PIXEL) / 15) * 15;

        const newStart = addMinutes(new Date(section.startTime), minutesDelta);
        const newEnd = addMinutes(new Date(section.endTime), minutesDelta);

        const validation = validateMove(section, newStart, newEnd, allSections, departments);

        if (validation.isValid) {

            onUpdate(section.id, newStart, newEnd);
        } else {

            setIsValid(false);
            await controls.start({
                x: [0, -10, 10, -10, 10, 0],
                transition: { duration: 0.4 }
            });
            setIsValid(true);
        }
    };

    const router = useRouter(); 
    const handleTap = () => {
        if (!isDragging) {
            router.push(`/app/section/${section.id}`);
        }
    };

    return (
        <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragSnapToOrigin
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onTap={handleTap} 
            animate={controls}
            whileDrag={{ scale: 1.05, zIndex: 50, boxShadow: "0px 10px 20px rgba(0,0,0,0.5)" }}
            style={{
                position: "absolute",
                top: `${layout.top * (1 / MINUTES_PER_PIXEL)}px`,
                left: `${layout.left}%`,
                width: `${layout.width}%`,
                height: `${layout.height * (1 / MINUTES_PER_PIXEL)}px`,
                padding: "2px",
            }}
            className="z-10 cursor-grab active:cursor-grabbing" 
        >
            <div className="w-full h-full block">
                <div className={cn(
                    "w-full h-full rounded-md p-2 text-xs border-l-4 overflow-hidden transition-colors duration-200 select-none", 
                    section.type === 'lecture' ? "bg-indigo-500/20 border-indigo-500 text-indigo-100 hover:bg-indigo-500/30" :
                        section.type === 'lab' ? "bg-emerald-500/20 border-emerald-500 text-emerald-100 hover:bg-emerald-500/30" :
                            "bg-amber-500/20 border-amber-500 text-amber-100 hover:bg-amber-500/30",
                    !isValid && "ring-2 ring-red-500 bg-red-500/10"
                )}>
                    <div className="font-bold flex items-center justify-between">
                        <span>{section.id.split('-')[0].toUpperCase()}</span>
                        {section.professorId === 'prof_smith' ? '👨‍🏫 Smith' : '👨‍🔬 Jones'}
                    </div>
                    <div className="opacity-80 truncate">{section.location}</div>
                    <div className="flex items-center gap-1 mt-1 opacity-60 text-[10px]">
                        {format(new Date(section.startTime), "h:mm")} - {format(new Date(section.endTime), "h:mm")}
                    </div>

                    {!isValid && (
                        <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 backdrop-blur-[1px]">
                            <AlertTriangle className="text-red-500 w-6 h-6 animate-pulse" />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
