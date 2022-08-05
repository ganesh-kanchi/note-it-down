import { Link } from "react-router-dom"

export const NavBar = () => {
    return (
        <nav className="flex flex-wrap items-center justify-between w-full pt-1 pr-6 pb-1 pl-6 sticky top-0 z-1 shadow-md">
            <Link to='/' className="text-2xl text-primary font-semibold">Note It Down</Link>

            <div className="flex items-center text-primary text-2xl">
                <div className="mr-2">
                    <button className="">
                        <i class="fa-solid fa-sliders"></i>
                    </button>
                </div>
                <div className="ml-2">
                    <button className="bg-primary text-white rounded-lg p-1 text-lg font-medium">
                        <i class="fa-solid fa-add"></i> Add Note
                    </button>
                </div>
            </div>
            
        </nav>
    )
}