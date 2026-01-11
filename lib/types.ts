export type Building = "North Hall" | "Science Center" | "Engineering Wing";

export interface SectionEvent {
  id: string;
  type: "lecture" | "lab" | "seminar";
  professorId: "prof_smith" | "prof_jones";
  location: Building;
  startTime: string;
  endTime: string;
}

export interface Course {
  courseId: string;
  title: string;
  hasPrerequisiteRule: boolean;
  sections: SectionEvent[];
}

export interface Department {
  deptId: string;
  name: string;
  courses: Course[];
}
