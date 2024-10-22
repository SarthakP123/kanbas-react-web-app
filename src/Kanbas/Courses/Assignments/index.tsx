import { BsGripVertical, BsCheckCircle, BsClock } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import * as db from "../../Database"; 

export default function Assignments() {
  const { cid } = useParams(); 
  const assignments = db.assignments.filter((assignment: any) => assignment.course === cid); 
  return (
    <div id="wd-assignmentsContent" className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-danger">Assignments</h2>
        <div>
          <button className="btn btn-outline-secondary me-2">Show by Date</button>
          <button className="btn btn-outline-secondary">Show by Type</button>
        </div>
      </div>

      <div className="input-group mb-4">
        <span className="input-group-text">
          <BsGripVertical />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search for Assignments"
        />
      </div>


      <h3 className="fw-bold">Upcoming Assignments</h3>

      <ul id="wd-assignment-list" className="list-group">
        {assignments.map((assignment: any) => (
          <li
            key={assignment._id}
            className="wd-assignment-list-item list-group-item p-3 mb-3 d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center">
              <BsClock className="me-3 fs-4" /> 
              <Link
                to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                className="wd-assignment-link text-decoration-none text-dark"
              >
                <strong>{assignment.title}</strong>
                <div className="text-muted">
                  Available until Oct 22 at 11:59pm | Due Oct 29 at 11:59pm <br />
                  <strong>100 pts</strong>
                </div>
              </Link>
            </div>
            <div>
              <BsCheckCircle className="text-success fs-4" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
