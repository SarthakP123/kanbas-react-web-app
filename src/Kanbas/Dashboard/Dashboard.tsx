import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RoleOnly from "../Account/AllowCertainRoles";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  editCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  editCourse: (selectedCourse: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (!currentUser) {
    return (
      <div id="wd-dashboard" className="p-4">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <p>No user is logged in. Please log in to view your courses.</p>
      </div>
    );
  }

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <h5>
        
        <RoleOnly role="FACULTY">
        Edit Course
          <button
            className="btn btn-primary float-end"
            onClick={addNewCourse}
            id="wd-add-new-course-click"
          >
            Add
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
        </RoleOnly>
      </h5>
      <br />

      <RoleOnly role="FACULTY">
        <input
          value={course.name}
          className="form-control mb-2"
          placeholder="Course Name"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <textarea
          value={course.description}
          className="form-control mb-2"
          placeholder="Course Description"
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
        />
      </RoleOnly>

      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((c) => (
            <div key={c._id} className="col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link
                  to={`/Kanbas/Courses/${c._id}/Home`}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={c.image || "/images/reactjs.jpg"}
                    alt={c.name}
                    width="100%"
                    height={160}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{c.name}</h5>
                    <p className="card-text">{c.description}</p>
                  </div>
                </Link>
                <RoleOnly role="FACULTY">
                  <div className="card-body">
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        editCourse(c);
                      }}
                      className="btn btn-warning me-2"
                      id="wd-edit-course-click"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(c._id);
                      }}
                      className="btn btn-danger"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </button>
                  </div>
                </RoleOnly>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
