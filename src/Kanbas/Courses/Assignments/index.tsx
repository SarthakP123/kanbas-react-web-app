import { FaGripVertical, FaTrash } from "react-icons/fa";
import AssignmentControls from "./AssignmentControls";
import AssignmentButtons from "./AssignmentButtons";
import { useParams, Link } from "react-router-dom";
import { deleteAssignment, setAssignments } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import RoleOnly from "../../Account/AllowCertainRoles";
import GreenCheckmark from "../Modules/GreenCheckMark";
import { IoEllipsisVertical } from "react-icons/io5";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

interface Assignment {
  _id: string;
  title: string;
  availableFrom: string;
  dueDate: string;
  points: number;
}

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>("");

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const fetchedAssignments = await coursesClient.findAssignmentsForCourse(cid!);
        dispatch(setAssignments(fetchedAssignments));
      } catch (error) {
        console.error("Error loading assignments:", error);
      }
    };
    loadAssignments();
  }, [cid, dispatch]);

  const handleDeleteAssignment = async () => {
    try {
      await assignmentsClient.deleteAssignment(selectedAssignmentId);
      dispatch(deleteAssignment(selectedAssignmentId));
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  return (
    <div id="assignments-container">
      <AssignmentControls />
      <div className="assignments-wrapper">
        <div className="assignments-header d-flex align-items-center p-3 bg-secondary text-white">
          <FaGripVertical className="me-2 fs-3" />
          <h4 className="mb-0">Assignments</h4>
        </div>
        <div className="assignments-list">
          {assignments.map((assignment: Assignment) => (
            <div key={assignment._id} className="assignment-item p-3 mb-3 border rounded shadow-sm">
              <div className="d-flex justify-content-between align-items-start">
                <div className="assignment-details">
                  <Link
                    to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    className="text-dark text-decoration-none"
                  >
                    <h5 className="mb-2">{assignment.title}</h5>
                  </Link>
                  <p className="mb-1 text-muted fs-6">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Available from: {assignment.availableFrom}</strong> |{" "}
                    <strong>Due:</strong> {assignment.dueDate} | {assignment.points} pts
                  </p>
                  <AssignmentButtons />
                </div>
                <div className="assignment-actions d-flex align-items-center">
                  <GreenCheckmark />
                  <IoEllipsisVertical className="fs-4 ms-3" />
                  <RoleOnly role="FACULTY">
                    <FaTrash
                      className="text-danger ms-3 cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#delete-assignment-modal"
                      onClick={() => setSelectedAssignmentId(assignment._id)}
                    />
                  </RoleOnly>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  
      {/* Delete Assignment Modal */}
      <div
        id="delete-assignment-modal"
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this assignment? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                onClick={handleDeleteAssignment}
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
          }  