import { logoutHandler } from "features/auth"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"

export const SideBar = () => {
    const dispatch = useDispatch()
    return (
        <section >
            <aside className="flex flex-col p-4 justify-between h-full">
            <ul>
                <li>
                    <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "inline-block w-full m-2 p-1 text-primary font-bold" : "inline-block w-full m-2 p-1")}
                    >
                    <i className="mr-2 fa-solid fa-house"></i> Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to="/label"
                    className={({ isActive }) => (isActive ? "inline-block w-full m-2 p-1 text-primary font-bold" : "inline-block w-full m-2 p-1")}
                    >
                    <i className="mr-2 fa-solid fa-tags"></i> Labels
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to="/archive"
                    className={({ isActive }) => (isActive ? "inline-block w-full m-2 p-1 text-primary font-bold" : "inline-block w-full m-2 p-1")}
                    >
                    <i className="mr-2 fa-solid fa-box-archive"></i> Archive
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to="/trash"
                    className={({ isActive }) => (isActive ? "inline-block w-full m-2 p-1 text-primary font-bold" : "inline-block w-full m-2 p-1")}
                    >
                    <i className="mr-2 fa-solid fa-trash-can"></i> Trash
                    </NavLink>
                </li>
            </ul>

            <div className="w-full font-semibold flex items-center justify-between m-2 p-1">
                <div className="pl-2 text-xl">
                    <i className="fa-solid fa-circle-user"></i> Admin
                </div>
                <i
                    className="fa-solid fa-right-from-bracket"
                    onClick={() => dispatch(logoutHandler())}
                ></i>
            </div>
            </aside>
        </section>
    )
}