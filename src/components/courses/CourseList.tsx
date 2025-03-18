
import { Course } from "@/services/courseService";
import CourseCard from "./CourseCard";

interface CourseListProps {
  courses: Course[];
  searchTerm: string;
  hasAccess: (level: string) => boolean;
}

const CourseList = ({ courses, searchTerm, hasAccess }: CourseListProps) => {
  // Filter courses based on search term
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <p>Nenhum curso encontrado para "{searchTerm}"</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCourses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          canAccess={hasAccess(course.accessLevel)}
        />
      ))}
    </div>
  );
};

export default CourseList;
