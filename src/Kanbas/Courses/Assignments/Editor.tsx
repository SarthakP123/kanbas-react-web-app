import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as coursesClient from '../client'; 
import * as assignmentsClient from './client';
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const navigate = useNavigate();
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const editing = aid !== "newassignment";

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const currentAssignment = assignments.find((assignment: any) => assignment._id === aid);

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const checkRole = () => {
    if (currentUser.role === "STUDENT") return navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };
  useEffect(() => {
    checkRole();
  }, []);

  // For setting values
  const [_id, setAssignmentID] = useState("");
  const [title, setAssignmentTitle] = useState("");
  const [course, setAssignmentCourse] = useState("");
  const [description, setAssignmentDescription] = useState("");
  const [points, setAssignmentPoints] = useState(0);
  const [dueDate, setAssignmentDDate] = useState("");
  const [availableFrom, setAssignmentADate] = useState("");
  const [availableUntil, setAssignmentAUDate] = useState("");

  // Initialize state when editing an existing assignment
  useEffect(() => {
    if (currentAssignment && _id === "") {
      setAssignmentID(currentAssignment._id);
      setAssignmentTitle(currentAssignment.title);
      setAssignmentDescription(currentAssignment.description);
      setAssignmentPoints(currentAssignment.points);
      setAssignmentDDate(currentAssignment.dueDate);
      setAssignmentADate(currentAssignment.availableFrom);
      setAssignmentAUDate(currentAssignment.availableUntil);
      setAssignmentCourse(currentAssignment.course); // Ensure the course is set
    }
  }, [currentAssignment, _id]);

  const save = async () => {
    const assignment = {
      _id,
      title,
      course,
      description,
      points,
      dueDate,
      availableFrom,
      availableUntil,
    };

    if (!editing) {
      assignment.course = cid!;
      const newAssignment = await coursesClient.createAssignmentForCourse(cid!, assignment);
      dispatch(addAssignment(newAssignment));
    } else {
      await assignmentsClient.updateAssignment(assignment);
      dispatch(updateAssignment(assignment));
    }

    // Navigate back to the assignments page after saving
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <form>
        <div>
          <label htmlFor="wd-name">Assignment Name</label>
          <input
            id="wd-name"
            placeholder="Assignment Name"
            value={title}
            className="form-control border-dark mb-4"
            onChange={(e) => setAssignmentTitle(e.target.value)}
          />
          <textarea
            id="wd-description"
            className="form-control border-dark"
            rows={10}
            value={description}
            onChange={(e) => setAssignmentDescription(e.target.value)}
          ></textarea>
          <br />
        </div>
        <div className="row m-2">
          <div className="col">
            <label htmlFor="wd-points" className="float-end">
              Points
            </label>
          </div>
          <div className="col">
            <input
              id="wd-points"
              placeholder="100"
              value={points}
              className="form-control mb-2 border-dark"
              onChange={(e) => setAssignmentPoints(Number(e.target.value))}
            />
          </div>
        </div>

        {/* ... Rest of your form elements ... */}

        <hr />
        <div className="float-end">
          <Link
            to={`/Kanbas/Courses/${cid}/Assignments`}
            className="wd-dashboard-course-link text-decoration-none text-dark"
          >
            <button type="button" className="btn btn-l border-dark">
              Cancel
            </button>
          </Link>
          <button type="button" className="btn btn-l btn-danger border-dark m-3" onClick={save}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
