import { FaPlus } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import RoleOnly from "../../Account/AllowCertainRoles";
import { Link, useParams } from "react-router-dom";

export default function AssignmentControls() {
  const { cid } = useParams();

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <div className="d-flex flex-wrap mb-3">
        <div className="input-group w-75">
          <span className="input-group-text">
            <HiMagnifyingGlass className="me-2 fs-5" />
          </span>
          <input type="text" className="form-control" placeholder="Search..." />
        </div>
        <RoleOnly role="FACULTY">
          <Link
            to={`/Kanbas/Courses/${cid}/Assignments/newassignment`}
            className="text-dark text-decoration-none w-25 ms-2"
          >
            <button className="btn btn-danger w-100 mt-1 text-start">
              <FaPlus className="me-2 fs-5" /> Assignment
            </button>
          </Link>
        </RoleOnly>
      </div>
    </div>
  );
}
