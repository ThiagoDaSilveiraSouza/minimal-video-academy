
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Users, Star, Play, Shield } from "lucide-react";
import { Course } from "@/services/courseService";
import { accessLevelNames } from "@/lib/firebase";

interface CourseCardProps {
  course: Course;
  canAccess: boolean;
}

const CourseCard = ({ course, canAccess }: CourseCardProps) => {
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className={`w-full h-full object-cover transition-transform hover:scale-105 ${
            !canAccess ? "opacity-70" : ""
          }`}
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary/90 hover:bg-primary">
            {course.level}
          </Badge>
        </div>
        {!canAccess && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-slate-800 text-white">
              <Shield className="w-3 h-3 mr-1" />{" "}
              {accessLevelNames[course.accessLevel]}
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {course.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pb-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {course.description}
        </p>
        <div className="flex items-center text-sm mb-1">
          <p className="font-medium">Instrutor:</p>
          <span className="ml-1 text-muted-foreground">
            {course.instructor}
          </span>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground my-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            {course.rating}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 text-gray-500 mr-1" />
            {course.students} alunos
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-500 mr-1" />
            {course.duration}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Link to={`/curso/${course.id}`} className="w-full">
          <Button
            className="w-full"
            variant={canAccess ? "default" : "secondary"}
          >
            <Play className="w-4 h-4 mr-2" />{" "}
            {canAccess ? "Ver curso" : "Detalhes"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
