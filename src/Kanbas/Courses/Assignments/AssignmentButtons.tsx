import { PiNotePencil } from "react-icons/pi";
import { BsGripVertical } from "react-icons/bs";
export default function AssignmentButtons() {
    return (
      <div className="float-start">
        <BsGripVertical className="fs-4" />
        <PiNotePencil className="me-2 text-success"/>
      </div>
  );}