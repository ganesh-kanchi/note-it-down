import { SortAndFilterModal } from "components";
import { useNotes } from "contexts/notesContext";
import { useState } from "react";
import { Link } from "react-router-dom"

export const NavBar = () => {
    const {setShowInputModal, setBeingEdited, setFormInput, initialFormInputs } = useNotes();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const filterModalToggle = () => {
    setShowFilterModal(!showFilterModal)
  }
    return (
        <nav className="flex flex-wrap items-center justify-between w-full pt-1 pr-6 pb-1 pl-6 sticky top-0 z-[1] shadow-md bg-white">
            <Link to='/' className="text-2xl text-primary font-semibold">Note It Down</Link>

            <div className="flex items-center text-primary text-2xl">
                <div className="mr-2 relative">
                    <button className="" onClick={filterModalToggle} >
                        <i class="fa-solid fa-sliders"></i>
                    </button>
                    {showFilterModal ? (
                        <SortAndFilterModal />
                    ) : null}
                </div>
                <div className="ml-2">
                    <button onClick={()=>{
                        setShowInputModal(true);
                        setBeingEdited(true);
                        setShowFilterModal(false);
                        setFormInput(initialFormInputs);
                    }} className="bg-primary text-white rounded-lg p-1 text-lg font-medium">
                        <i class="fa-solid fa-add"></i> Add Note
                    </button>
                </div>
            </div>
            
        </nav>
    )
}