import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSubtasks } from "../context/SubtasksContext";

function SubtaskPage() {
  const { id } = useParams();
  const { getSubtasks, subtasks, updateSubtask } = useSubtasks();

  const onChange = async (subtaskId, completed) => {
    try {
      await updateSubtask(subtaskId, { completed });
      await getSubtasks(id);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getSubtasks(id);
  }, []);
  return (
    <div className="bg-zinc-800 p-5 rounded-md ">
      <div className="flex items-center py-2 justify-between">
        <Link
          to={`/tasks/${id}/add-subtask`}
          className="flex gap-2 bg-green-500 text-lg p-2 rounded-md hover:bg-green-700 font-bold"
        >
          Nueva Subtarea
        </Link>
      </div>
      {subtasks.length === 0 ? (
        <>
          <h1>No hay subtareas</h1>
        </>
      ) : (
        <ul className="space-y-2">
          {subtasks.map((subtask) => (
            <li
              key={subtask._id}
              className="flex items-center justify-between bg-white/10 backdrop-blur-md p-3 rounded shadow"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={subtask.completed}
                  onChange={() => onChange(subtask._id, !subtask.completed)}
                  className={`${subtask.completed ? "accent-green-500 cursor-pointer" : "cursor-pointer"}`}
                />
                <span
                  className={`${
                    subtask.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {subtask.title}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SubtaskPage;
