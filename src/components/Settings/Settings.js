import React, { useCallback, useState } from "react";

const columnTitles = [{ id: "1", name: "Date" }, { id: "2", name: "App" }, { id: "3", name: "Requests" }, { id: "4", name: "Responses" }, { id: "5", name: "Impressions" }, { id: "6", name: "Clicks" }, { id: "7", name: "Revenue" }, { id: "8", name: "Fill Rate" }, { id: "9", name: "CTR" },];
const Settings = ({ isVisible, onClose, onApply }) => {
    const [selectedColumns, setSelectedColumns] = useState([true, true, ...Array(7).fill(true)]);

    const handleClick = useCallback((index) => {
        if (index < 2) return;
        // the value of the element at the specified index
        setSelectedColumns((prevState) => {
            const newSelectedColumns = [...prevState];
            newSelectedColumns[index] = !newSelectedColumns[index];
            return newSelectedColumns;
        });
    }, []);
    // ...
    const handleApply = useCallback(() => {
        // Call the `onApply` prop with the `selectedColumns` state variable as an argument
        onApply(selectedColumns);
        onClose()
    }, [onApply, selectedColumns, onClose]);

    const mergedArray = columnTitles.map((columnTitle, index) => ({
        ...columnTitle,
        selected: index < 2 ? true : selectedColumns[index]
    }));
    if (!isVisible) return null;
    return (
        <div className="container mx-auto h-[270px] border-gray-400 border bg-white">
            <h1 className="px-5 py-3 font-semibold">Dimensions and Metrics</h1>
            <div className="cards">
                <div className="grid grid-cols-8 gap-2 ml-6 mr-6">
                    {mergedArray.map((column, index) => (
                        <div
                            key={index}
                            className="flex rounded-lg shadow-lg overflow-hidden w-[120px] h-[40px] border border-gray-400 hover:bg-slate-200 "
                            id="card"
                            onClick={() => handleClick(index)}
                        >
                            <div
                                className={`bg-blue-500 h-full w-1.5 flex-shrink-0 ${column.selected ? "glow-blue-500" : "opacity-10"
                                    }`}
                                id="strip"
                            ></div>
                            <div className="px-4 py-2 font-[16px]">
                                {column.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-end">
                <button className="items-center bg-white border hover:bg-slate-200 border-gray-400 text-blue-500 focus:outline-none font-bold text-sm rounded-lg px-5 py-2.5 text-center mr-4 mt-10" onClick={() => onClose()}>
                    Close
                </button>
                <button className="bg-[#136FED] text-white hover:bg-blue-700  focus:outline-none font-bold text-sm rounded-lg px-5 py-2.5 text-center mr-4 mt-10" onClick={handleApply}>
                    ApplyChanges
                </button>
            </div>
        </div>
    );
};
export default Settings; 