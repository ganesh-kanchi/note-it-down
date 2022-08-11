import { useNotes } from "contexts/notesContext";

export const SortAndFilterModal = () => {
  const { notesOrder, setNotesOrder } = useNotes();

  return (
    <div className="flex z-[5] flex-col absolute top-[2.5rem] left-[-2rem] text-[0.9rem] p-[0.5rem] w-max rounded text-black bg-slate-300 leading-6">
        <button
        className="border border-black pr-1 pl-1 rounded text-sm bg-white h-min ml-auto"
        onClick={() =>
            setNotesOrder(() => ({ sort: "", filter: "" }))
        }
        >
        Clear
        </button>

        <p className="font-bold border-black border-b">Sort By</p>
        <div className="sort-modal">
            <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
                <p className="text-left">Date</p>
                <label className="flex items-center">
                <input
                    className="mr-1"
                    type="radio"
                    name="sort-date"
                    value="latest"
                    checked={notesOrder.sort === "latest"}
                    onChange={(e) =>
                    setNotesOrder({ ...notesOrder, sort: e.target.value })
                    }
                />
                Latest first
                </label>
                <label className="flex items-center">
                <input
                    className="mr-1"
                    type="radio"
                    name="sort-date"
                    value="oldest"
                    checked={notesOrder.sort === "oldest"}
                    onChange={(e) =>
                    setNotesOrder({ ...notesOrder, sort: e.target.value })
                    }
                />
                Oldest first
                </label>
                <p className="text-left">Priority</p>
                <label className="flex items-center">
                <input
                    className="mr-1"
                    type="radio"
                    name="sort-priority"
                    value="lowToHigh"
                    checked={notesOrder.sort === "lowToHigh"}
                    onChange={(e) =>
                    setNotesOrder({ ...notesOrder, sort: e.target.value })
                    }
                />
                Low to High
                </label>
                <label className="flex items-center">
                <input
                    className="mr-1"
                    type="radio"
                    name="sort-priority"
                    value="highToLow"
                    checked={notesOrder.sort === "highToLow"}
                    onChange={(e) =>
                    setNotesOrder({ ...notesOrder, sort: e.target.value })
                    }
                />
                High to Low
                </label>
            </div>
        </div>
        
        <p className="font-bold border-black border-b">Filter By</p>
        <div className="filter-modal">
            <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
                <p className="text-left">Priority</p>
                <label className="flex items-center">
                <input
                    className="mr-1"
                    type="radio"
                    name="priority"
                    value="1"
                    checked={notesOrder.filter.Low === "1"}
                    onChange={(e) => {
                    setNotesOrder({ ...notesOrder, filter: { Low: e.target.value } });
                    }}
                />
                Low
                </label>
                <label className="flex items-center">
                <input
                    className="mr-1"
                    type="radio"
                    name="priority"
                    value="2"
                    checked={notesOrder.filter.Medium === "2"}
                    onChange={(e) =>
                    setNotesOrder({
                        ...notesOrder,
                        filter: { Medium: e.target.value },
                    })
                    }
                />
                Medium
                </label>
                <label className="flex items-center">
                <input
                    className="mr-1"
                    type="radio"
                    name="priority"
                    value="3"
                    checked={notesOrder.filter.High === "3"}
                    onChange={(e) =>
                    setNotesOrder({ ...notesOrder, filter: { High: e.target.value } })
                    }
                />
                High
                </label>
            </div>
        </div>

    </div>
  );
};