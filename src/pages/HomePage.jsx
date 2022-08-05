import { NavBar, SideBar } from "components"

export const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />

            <section className="flex-grow grid grid-cols-[12rem_1fr] text-black">
                <SideBar />
            </section>
        </div>
    )
} 