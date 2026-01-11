import { Course, Department, SectionEvent } from "./types";
import { addMinutes, differenceInMinutes, isBefore, isAfter, parseISO } from "date-fns";

export function getAllSections(departments: Department[]): SectionEvent[] {
    return departments.flatMap((dept) =>
        dept.courses.flatMap((course) => course.sections)
    );
}

export function getCourseForSection(
    sectionId: string,
    departments: Department[]
): Course | undefined {
    for (const dept of departments) {
        for (const course of dept.courses) {
            if (course.sections.some((s) => s.id === sectionId)) {
                return course;
            }
        }
    }
    return undefined;
}

export type ValidationResult = {
    isValid: boolean;
    error?: string;
};

export function validateMove(
    movedSection: SectionEvent,
    newStartTime: Date,
    newEndTime: Date,
    allSections: SectionEvent[],
    departments: Department[]
): ValidationResult {
    const otherSections = allSections.filter((s) => s.id !== movedSection.id);

    const profSections = otherSections.filter(
        (s) => s.professorId === movedSection.professorId
    );

    for (const s of profSections) {
        const sStart = new Date(s.startTime);
        const sEnd = new Date(s.endTime);
        if (newStartTime < sEnd && newEndTime > sStart) {
            return {
                isValid: false,
                error: `Professor ${movedSection.professorId} is already teaching at this time.`,
            };
        }

        if (s.location !== movedSection.location) {

            const buffer = 15; 
            const diffAfter = (newStartTime.getTime() - sEnd.getTime()) / 60000;
            const diffBefore = (sStart.getTime() - newEndTime.getTime()) / 60000;

            if (diffAfter >= 0 && diffAfter < buffer) {
                return { isValid: false, error: `Travel Time Paradox: Need 15m buffer from ${s.location}.` };
            }

            if (diffBefore >= 0 && diffBefore < buffer) {
                return { isValid: false, error: `Travel Time Paradox: Need 15m buffer to ${s.location}.` };
            }
        }
    }

    const course = getCourseForSection(movedSection.id, departments);
    if (course && course.hasPrerequisiteRule) {
        if (movedSection.type === "lab") {
            const lectures = course.sections.filter((s) => s.type === "lecture" && s.id !== movedSection.id);
            for (const lec of lectures) {
                const lecEnd = new Date(lec.startTime);
                const currentLec = allSections.find(s => s.id === lec.id) || lec;
                const currentLecEnd = new Date(currentLec.endTime);

                if (newStartTime < currentLecEnd) {
                    return { isValid: false, error: "Prerequisite: Lab cannot be before Lecture." };
                }
            }
        }

        if (movedSection.type === "lecture") {
            const labs = course.sections.filter(s => s.type === 'lab' && s.id !== movedSection.id);
            for (const lab of labs) {
                const currentLab = allSections.find(s => s.id === lab.id) || lab;
                const currentLabStart = new Date(currentLab.startTime);
                if (newEndTime > currentLabStart) {
                    return { isValid: false, error: "Prerequisite: Lecture must be before Lab." };
                }
            }
        }
    }

    return { isValid: true };
}
