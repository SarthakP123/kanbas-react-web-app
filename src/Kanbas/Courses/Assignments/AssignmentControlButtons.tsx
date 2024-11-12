import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

interface AssignmentControlButtonsProps {
  id: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function AssignmentControlButtons({ id, onDelete, onEdit }: AssignmentControlButtonsProps) {
  return (
    <div className="float-end">
      <FaEdit className="text-primary me-3" onClick={() => onEdit(id)} />
      <FaTrash className="text-danger" onClick={() => onDelete(id)} />
    </div>
  );
}
