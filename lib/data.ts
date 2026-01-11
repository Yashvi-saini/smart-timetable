import { Department } from "./types";

export const universityData: Department[] = [
    {
        deptId: "CS",
        name: "Computer Science",
        courses: [
            {
                courseId: "CS101",
                title: "Intro to Algo",
                hasPrerequisiteRule: true,
                sections: [
                    {
                        id: "cs101-lab-a",
                        type: "lab",
                        professorId: "prof_smith",
                        location: "Science Center",
                        startTime: "2024-04-09T14:00:00",
                        endTime: "2024-04-09T15:30:00",
                    },
                    {
                        id: "cs101-lec-a",
                        type: "lecture",
                        professorId: "prof_smith",
                        location: "North Hall",
                        startTime: "2024-04-10T09:00:00",
                        endTime: "2024-04-10T10:30:00",
                    },
                ],
            },
        ],
    },
    {
        deptId: "ENG",
        name: "Engineering",
        courses: [
            {
                courseId: "ENG202",
                title: "Thermodynamics",
                hasPrerequisiteRule: false,
                sections: [
                    {
                        id: "eng202-sem",
                        type: "seminar",
                        professorId: "prof_jones",
                        location: "Engineering Wing",
                        startTime: "2024-04-10T10:30:00",
                        endTime: "2024-04-10T12:00:00",
                    },
                    {
                        id: "eng202-lec",
                        type: "lecture",
                        professorId: "prof_smith",
                        location: "North Hall",
                        startTime: "2024-04-10T10:00:00",
                        endTime: "2024-04-10T11:30:00",
                    },
                ],
            },
        ],
    },
];
