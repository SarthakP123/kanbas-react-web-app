import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckMark";
import RoleOnly from "../../Account/AllowCertainRoles";
import { FaTrash } from "react-icons/fa";
export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <RoleOnly role="FACULTY">
      <FaTrash className="text-danger me-2 mb-1" />
        </RoleOnly>
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}