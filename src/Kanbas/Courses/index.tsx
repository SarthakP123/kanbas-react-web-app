import { useParams, useLocation } from "react-router-dom";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import { Routes, Route } from "react-router";
import PeopleTable from "./People/Table";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const location = useLocation();

  // Find the course by its ID from the passed courses prop
  const course = courses.find((course) => course._id === cid);

  if (!course) {
    return <div>Course not found</div>;
  }

  const currentSection = location.pathname.split("/").pop();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course.name} &gt; {currentSection}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
