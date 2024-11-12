import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const existingAssignment = assignments.find((a: Assignment) => a._id === aid);
  const [assignment, setAssignment] = useState<Assignment>(
    existingAssignment || {
      _id: "",
      title: "",
      description: "",
      points: 100,
      dueDate: "",
      availableDate: "",
      course: cid,
    }
  );

  const handleSave = () => {
    if (existingAssignment) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment(assignment));
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div className="container mt-4">
      <h2>{existingAssignment ? "Edit Assignment" : "New Assignment"}</h2>
      <input
        className="form-control mb-3"
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
        placeholder="Assignment Title"
      />
      <textarea
        className="form-control mb-3"
        value={assignment.description}
        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
        placeholder="Assignment Description"
      />
      <input
        className="form-control mb-3"
        type="number"
        value={assignment.points}
        onChange={(e) => setAssignment({ ...assignment, points: +e.target.value })}
        placeholder="Points"
      />
      <input
        className="form-control mb-3"
        type="date"
        value={assignment.dueDate}
        onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
      />
      <button className="btn btn-success me-2" onClick={handleSave}>
        Save
      </button>
      <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary">
        Cancel
      </Link>
    </div>
  );
}
