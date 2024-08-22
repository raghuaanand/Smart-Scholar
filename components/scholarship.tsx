import Link from "next/link";
import { Button } from "./ui/button";

interface ScholarshipType {
  name: string;
  link: string;
  description: string;
  level: string;
  deadline?: string;
}

const ScholarshipPage = ({ scholarship }: { scholarship: ScholarshipType[] }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto mt-20  md:mt-[150px]" >
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Available Scholarships
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarship.map((s, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {s.name}
                </h3>
                <p className="text-gray-600 mb-4">{s.description}</p>
                <p className="text-sm text-gray-800 mb-2">
                  <span className="font-medium">Degree Level:</span> {s.level}
                </p>
                {s.deadline && (
                  <p className="text-sm text-gray-800 mb-4">
                    <span className="font-medium">Deadline:</span> {s.deadline}
                  </p>
                )}
                <Link href={s.link}>
                  <Button
                    variant={"link"}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                  >
                    Apply Here
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipPage;
