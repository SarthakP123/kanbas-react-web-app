import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import { Routes, Route, Navigate } from "react-router";
import PeopleTable from "./People/Table";
import QuizList from "./Quizzes/quizlist";
import QuizEditor from "./Quizzes/quizeditor";
import QuizTaker from "./Quizzes/QuizTaker";
import QuizPreview from "./Quizzes/QuizPreview";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const location = useLocation();
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const foundCourse = courses.find((course) => course._id === cid);
    if (foundCourse) {
      setCurrentCourse(foundCourse);
    }
  }, [cid, courses]);

  if (!currentCourse) {
    return <div>Course not found</div>;
  }

  const currentSection = location.pathname.split("/").pop();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {currentCourse.name} &gt; {currentSection}
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
            <Route 
              path="Quizzes" 
              element={<QuizList currentCourse={currentCourse} />} 
            />
            <Route 
              path="Quizzes/new" 
              element={
                currentUser?.role === "FACULTY" ? 
                  <QuizEditor currentCourse={currentCourse} /> : 
                  <Navigate to="../" />
              } 
            />
            <Route 
              path="Quizzes/:qid" 
              element={<QuizEditor currentCourse={currentCourse} />} 
            />
            <Route 
              path="Quizzes/:qid/edit" 
              element={
                currentUser?.role === "FACULTY" ? 
                  <QuizEditor currentCourse={currentCourse} /> : 
                  <Navigate to="../" />
              } 
            />
              <Route path="Quizzes/:quizId/take" element={<QuizTaker currentCourse={currentCourse} />} />
              <Route 
    path="Quizzes/:quizId/preview" 
    element={
      currentUser?.role === "FACULTY" ? 
        <QuizPreview currentCourse={currentCourse} /> : 
        <Navigate to="../" />
    }
  />
  <Route path="Quizzes/:quizId/edit" element={<QuizEditor currentCourse={currentCourse} />} />
  <Route path="Quizzes/:quizId/take" element={<QuizTaker currentCourse={currentCourse} />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}