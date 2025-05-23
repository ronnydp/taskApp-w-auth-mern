import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dropdown() {
  const { user, logout } = useAuth();
  return (
    <Menu as="div" className="relative inline-block tet-left">
      <div>
        <MenuButton className="inline-flex w-full text-lg justify-center gap-x-1.5 rounded-md bg-zinc-700 px-3 py-2 font-bold text-white-900 shadow-xs ring-1 ring-zinc-700 ring-inset hover:bg-zinc-500 cursor-pointer">
          {user.username.toUpperCase()}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-white-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-zinc-700 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <Link
              to={`/profile`}
              className="block px-4 py-2 text-lg text-white-700 data-focus:bg-zinc-800 data-focus:text-white-900 data-focus:outline-hidden"
            >
              Cuenta
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              className="block px-4 py-2 text-lg text-white-700 data-focus:bg-zinc-800 data-focus:text-white-900 data-focus:outline-hidden"
              to={"/"}
              onClick={() => {
                logout();
              }}
            >
              Cerrar sesión
            </Link>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}

export default Dropdown;
