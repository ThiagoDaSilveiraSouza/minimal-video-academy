
import { Button } from "@/components/ui/button";

interface CourseSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const CourseSearch = ({ searchTerm, setSearchTerm }: CourseSearchProps) => {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Pesquisar cursos..."
          className="w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md px-3 py-1 h-auto"
          size="sm"
        >
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default CourseSearch;
