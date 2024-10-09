import { BsPlus, BsGripVertical } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckMark";

export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus className="fs-4" />
    </div>
  );
}
