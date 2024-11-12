import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";
import { BsPlus, BsSearch, BsClock, BsCheckCircle } from "react-icons/bs";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
}

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssignments = assignments
    .filter((a: Assignment) => a.course === cid)
    .filter((a: Assignment) => a.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(id));
    }
  };

  const handleAddAssignment = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/new`, { state: { isNew: true } });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-danger">Assignments</h2>
        <button className="btn btn-danger" onClick={handleAddAssignment}>
          <BsPlus className="me-2" /> Assignment
        </button>
      </div>

      <div className="input-group mb-4">
        <span className="input-group-text">
          <BsSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search for Assignments"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="list-group">
        {filteredAssignments.map((a: Assignment) => (
          <li key={a._id} className="list-group-item p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Link to={`/Kanbas/Courses/${cid}/Assignments/${a._id}`} className="text-decoration-none text-dark">
                  <h5 className="mb-1">{a.title}</h5>
                </Link>
                <p className="text-muted mb-1">{a.description || "No description available."}</p>
                <div className="d-flex align-items-center">
                  <BsClock className="me-2 text-muted" />
                  <small className="text-muted">
                    Due: {a.dueDate || "N/A"} | Points: {a.points || 0}
                  </small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-danger me-2"
                  onClick={() => handleDelete(a._id)}
                >
                  Delete
                </button>
                <BsCheckCircle className="text-success fs-4" />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {filteredAssignments.length === 0 && (
        <div className="text-center text-muted">No assignments found.</div>
      )}
    </div>
  );
}
