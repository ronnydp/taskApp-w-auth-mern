import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";

export default function KebabMenu({ task }) {
  const { deleteTask } = useTasks();
  return (
    <Menu as="div" className=" relative inline-block text-left">
      <div>
        <MenuButton>
          <EllipsisVerticalIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-500 cursor-pointer hover:text-white"
          />
        </MenuButton>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-0 w-40 origin-top-right rounded-md bg-zinc-700 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
          <MenuItem>
                <Link to={`/tasks/${task._id}/subtasks`} className="block p-2 text-lg text-white-700 data-focus:bg-zinc-800 data-focus:text-white-900 data-focus:outline-hidden cursor-pointer">
                    📓 Subtareas
                </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to={`/tasks/${task._id}`}
                className="block p-2 text-lg text-white-700 data-focus:bg-zinc-800 data-focus:text-white-900 data-focus:outline-hidden"
              >
                ✏️ Editar
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                className="block p-2 text-lg text-white-700 data-focus:bg-zinc-800 data-focus:text-white-900 data-focus:outline-hidden cursor-pointer"
                onClick={() => {
                  deleteTask(task._id);
                }}
              >
                🗑️ Eliminar
              </Link>
            </MenuItem>
          </div>
        </MenuItems>
      </div>
    </Menu>
  );
}
