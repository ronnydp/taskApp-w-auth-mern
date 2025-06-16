import KebabMenu from "./KebabMenu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";
import useTaskDate from "../hooks/useTaskDate";
import useOutsideClick from "../hooks/useOutsideClick";
import { getRelativeDateText } from "../utils/dateUtils";

function TaskCard({ task, isCalendarOpen, onToggleCalendar }) {
  const {today, dueDate, taskUpdated, diffDays} = useTaskDate(task.date, task.updatedAt)

  const [date, setDate] = useState(null);
  const calendarRef = useRef(null);

  const handleOutsideClick = () => {
    onToggleCalendar(null) // Esto cierra el calendario
  }
  useOutsideClick(calendarRef, handleOutsideClick)

  return (
    <div className="flex flex-col justify-between bg-zinc-800 max-w-md w-full p-5 rounded-md hover:bg-zinc-900 select-none">
      <div className="flex gap-x-2 justify-between">
        <h1 className="text-2xl font-bold cursor-default">{task.title}</h1>
        <KebabMenu task={task} />
      </div>
      <div className="flex flex-col items-start h-full">
        <p className="text-slate-300 text-lg cursor-default">
          {task.description}
        </p>
      </div>
      <div
        className="flex justify-between items-center mt-3 rounded-2xl px-2.5 w-fit hover:bg-zinc-800 border border-zinc-600 cursor-pointer"
        onClick={onToggleCalendar}
      >
        <p
          className={`cursor-pointer  ${
            task.completed
              ? "text-white-500"
              : diffDays === 0
              ? "text-blue-400 font-bold"
              : diffDays > 0
              ? "text-white-500 font-bold"
              : "text-red-600 font-bold"
          }`}
        >
          {getRelativeDateText(today, dueDate, diffDays, taskUpdated, task.completed)}
        </p>
      </div>
      {isCalendarOpen && (
        <div className="absolute z-10 mt-2" ref={calendarRef}>
          <DatePicker
            id={task._id}
            selected={date}
            onChange={(date) => {
              setDate(date);
              setShowCalendar(false); // cerrar calendario al seleccionar
            }}
            inline
          />
        </div>
      )}
    </div>
  );
}

export default TaskCard;