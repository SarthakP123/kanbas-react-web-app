import { BsGripVertical, BsCheckCircle, BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Assignments() {
  return (
    <div id="wd-assignmentsContent" className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-danger">Assignments</h2>

        {/* Buttons Group and Assignment */}
        <div>
          <button className="btn btn-outline-secondary me-2">+ Group</button>
          <Link to="/Kanbas/Courses/1234/Assignments/Editor" className="btn btn-danger">
            <BsPlus className="me-1" /> Assignment
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="input-group mb-3">
        <span className="input-group-text">
          <BsGripVertical />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search for Assignments"
        />
      </div>

      {/* Assignments List */}
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total
      </h3>

      <ul id="wd-assignment-list" className="list-group">
        {/* Assignment 1 */}
        <li className="wd-assignment-list-item list-group-item p-3 mb-3">
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/Kanbas/Courses/1234/Assignments/123" className="wd-assignment-link text-decoration-none text-dark">
              <BsGripVertical className="me-2 fs-4" />
              <strong>A1 - ENV + HTML</strong>
              <div className="text-muted">
                Multiple Modules | Not available until May 6 at 12:00am <br />
                <strong>Due:</strong> May 13 at 11:59pm | <strong>100 pts</strong>
              </div>
            </Link>
            <BsCheckCircle className="text-success fs-4" />
          </div>
        </li>

        {/* Assignment 2 */}
        <li className="wd-assignment-list-item list-group-item p-3 mb-3">
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/Kanbas/Courses/1234/Assignments/124" className="wd-assignment-link text-decoration-none text-dark">
              <BsGripVertical className="me-2 fs-4" />
              <strong>A2 - CSS + BOOTSTRAP</strong>
              <div className="text-muted">
                Multiple Modules | Not available until May 13 at 12:00am <br />
                <strong>Due:</strong> May 20 at 11:59pm | <strong>100 pts</strong>
              </div>
            </Link>
            <BsCheckCircle className="text-success fs-4" />
          </div>
        </li>

        {/* Assignment 3 */}
        <li className="wd-assignment-list-item list-group-item p-3 mb-3">
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/Kanbas/Courses/1234/Assignments/125" className="wd-assignment-link text-decoration-none text-dark">
              <BsGripVertical className="me-2 fs-4" />
              <strong>A3 - JAVASCRIPT + REACT</strong>
              <div className="text-muted">
                Multiple Modules | Not available until May 20 at 12:00am <br />
                <strong>Due:</strong> May 27 at 11:59pm | <strong>100 pts</strong>
              </div>
            </Link>
            <BsCheckCircle className="text-success fs-4" />
          </div>
        </li>
      </ul>
    </div>
  );
}
