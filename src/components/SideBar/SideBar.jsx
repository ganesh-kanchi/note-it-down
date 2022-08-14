import { logoutHandler } from "features/auth"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

export const SideBar = () => {
    const dispatch = useDispatch()
    const {token} = useSelector(state => state.auth)
    const {firstName} = JSON.parse(localStorage.getItem("user"));
    return (
        <section >
            <aside className="flex flex-col p-4 justify-between h-full">
            <ul className="w-max">
                <li>
                    <NavLink
                    to="/"
                    className={({ isActive }) => (`${isActive ?  "text-primary font-bold" : null} inline-block w-full m-2 p-2 hover:bg-slate-300 rounded-full`)}
                    >
                    <i className="mr-2 fa-solid fa-house"></i> Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to="/labels"
                    className={({ isActive }) => (`${isActive ?  "text-primary font-bold" : null} inline-block w-full m-2 p-2 hover:bg-slate-300 rounded-full`)}
                    >
                    <i className="mr-2 fa-solid fa-tags"></i> Labels
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to="/archives"
                    className={({ isActive }) => (`${isActive ?  "text-primary font-bold" : null} inline-block w-full m-2 p-2 hover:bg-slate-300 rounded-full`)}
                    >
                    <i className="mr-2 fa-solid fa-box-archive"></i> Archive
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to="/trash"
                    className={({ isActive }) => (`${isActive ?  "text-primary font-bold" : null} inline-block w-full m-2 p-2 hover:bg-slate-300 rounded-full`)}
                    >
                    <i className="mr-2 fa-solid fa-trash-can"></i> Trash
                    </NavLink>
                </li>
            </ul>

            <div className="w-full font-semibold flex items-center justify-between m-2 p-1">
                <div className="pl-2 text-xl">
                    <i className="fa-solid fa-circle-user"></i> { token ? firstName : "User"}
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