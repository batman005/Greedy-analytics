import React, { useState } from "react";
import { sepFormatter, RevenueFormatter, dateFormatter } from "./Formatter";

import { useSelector } from "react-redux";
import { FaFilter } from "react-icons/fa";
import imageUrl from '../../assets/Image 29.png'
import NotFound from "../NotFound/NotFound";
const columnTitles = ["Date", "App", "Requests", "Responses", "Impressions", "Clicks", "Revenue", "Fill Rate", "CTR"];

const Table = ({ selectedColumns }) => {
    const data = useSelector((state) => state.reportList.app.reportList.reports.data);
    const appNameMap = useSelector((state) => {
        const appList = state.reportList.app.appList.apps.data;
        return appList.reduce((map, app) => {
            map[app.app_id] = app.app_name;
            return map;
        }, {});
    });

    // Add a state variable to store the app filter value
    const [appFilter, setAppFilter] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    if (!data || !Array.isArray(data)) {
        return <div><NotFound /></div>;
    }

    const filteredData = data.filter(item =>
        item.app_id ? appNameMap[item.app_id]?.toLowerCase().includes(appFilter.toLowerCase()) : false
    );
    const rows = filteredData.map((item, index) => {
        if (!filteredData.length) {
            return <div>404 Not Found</div>;
        }
        const formattedResponses = sepFormatter.format((item.responses));
        const formattedRequests = sepFormatter.format((item.requests));
        const formattedImpressions = sepFormatter.format((item.impressions));
        const formattedClicks = sepFormatter.format((item.clicks));
        const formattedRevenue = RevenueFormatter.format((item.revenue));
        const formattedDate = dateFormatter.format(new Date(item.date));
        const fillRate = (item.responses / item.requests * 100).toFixed(2);
        const ctr = (item.clicks / item.impressions * 100).toFixed(2);



        return (
            <tr className="border-t-2 border-gray-100 bg-white text-dark-black h-12 md:h-auto md:table-row" key={index}>
                {selectedColumns.length === 0 ? (
                    // Show all columns if no columns are selected
                    <>
                        <td className="px-2 py-2 text-dark-black">{formattedDate}</td>
                        <td className="px-2 py-2 text-dark-black float-left inline-flex items-center"> <img className="w-6 h-6 mr-2" src={imageUrl} alt={appNameMap[item.app_id]} /> {appNameMap[item.app_id]}</td>
                        <td className="px-2 py-2 text-dark-black">{formattedRequests}</td>
                        <td className="px-2 py-2 text-dark-black">{formattedResponses}</td>
                        <td className="px-2 py-2 text-dark-black">{formattedImpressions}</td>
                        <td className="px-2 py-2 text-dark-black">{formattedClicks}</td>
                        <td className="px-2 py-2 text-dark-black">{formattedRevenue}</td>
                        <td className="px-2 py-2 text-dark-black">{`${fillRate}%`}</td>
                        <td className="px-2 py-2 text-dark-black">{`${ctr}%`}</td>
                    </>
                ) : (
                    // Only show the columns that are selected
                    selectedColumns.map((selected, index) =>
                        selected ? (
                            <td className="px-2 py-2 text-dark-black" key={index}>
                                {columnTitles[index] === "App"
                                    ? <>

                                        <img className="w-6 h-6 mr-2  float-left inline-flex items-center" src={imageUrl} alt={appNameMap[item.app_id]} /> {appNameMap[item.app_id]}
                                    </>
                                    : columnTitles[index] === "Date"
                                        ? formattedDate
                                        : columnTitles[index] === "Requests"
                                            ? formattedRequests
                                            : columnTitles[index] === "Responses"
                                                ? formattedResponses
                                                : columnTitles[index] === "Impressions"
                                                    ? formattedImpressions
                                                    : columnTitles[index] === "Clicks"
                                                        ? formattedClicks
                                                        : columnTitles[index] === "Revenue"
                                                            ? formattedRevenue
                                                            : columnTitles[index] === "Fill Rate"
                                                                ? `${fillRate}%`
                                                                : `${ctr}%`}
                            </td>
                        ) : null
                    )
                )}
            </tr>
        );

    });


    return (
        <div>
            <table className="table-auto bg-white w-full py-7">
                <thead className="h-12">
                    <tr>
                        {selectedColumns.length === 0 ? (
                            columnTitles.map((title, index) => (
                                <th
                                    className="px-4 py-2 font-semibold text-light-gray"
                                    key={title}
                                >
                                    {title === "App" ? (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            {/* Show the input field and button only when the filter is open */}
                                            {isFilterOpen ? (
                                                <>
                                                    <div className='bg-[#FFFFFF]  border border-[#EAEAEA] w-[260px] fixed rounded-lg  h-40 p-4 flex items-center flex-col place-content-evenly ml-[30px]'>
                                                        <label className="">Search App</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Search"
                                                            className="w-[198px] rounded-lg  border-2 border-[#136FED] justify-evenly"
                                                            value={appFilter}
                                                            onChange={(e) => setAppFilter(e.target.value)}
                                                        />
                                                        <button className="bg-[#136FED] text-white hover:bg-blue-700  focus:outline-none font-bold text-sm rounded-lg px-1 py-2.5 text-center" onClick={() => setIsFilterOpen(false)}>
                                                            <FaFilter className="inline-block h-4 w-4 mr-2 hover:bg-slate-50" />
                                                            Close
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <FaFilter
                                                    className="inline-block h-4 w-4 mr-2 cursor-pointer"
                                                    onClick={() => setIsFilterOpen(true)}
                                                />
                                            )}
                                            {title}
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <FaFilter style={{ marginBottom: 2 , marginLeft:6 }} />
                                            {title}
                                        </div>
                                    )}
                                </th>
                            ))
                        ) : (
                            columnTitles.map((title, index) =>
                                selectedColumns[index] ? (
                                    <th
                                        className="px-4 py-2 font-semibold text-light-gray"
                                        key={title}
                                    >
                                        {title === "App" && selectedColumns[index] ? (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                }}
                                            >
                                                {/* Show the input field and button only when the filter is open */}
                                                {isFilterOpen ? (
                                                    <>
                                                        <div className=' bg-[#FFFFFF]  border border-[#EAEAEA] w-[260px] fixed rounded-lg  h-40 p-4 flex items-center flex-col place-content-evenly ml-[30px] '>
                                                            <label className="">Search App</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Search"
                                                                className="w-[198px] rounded-lg  border-2 border-[#136FED] justify-evenly"
                                                                value={appFilter}
                                                                onChange={(e) => setAppFilter(e.target.value)}
                                                            />
                                                            <button className="bg-[#136FED] text-white hover:bg-blue-700  focus:outline-none font-bold text-sm rounded-lg px-1 py-2.5 text-center" onClick={() => setIsFilterOpen(false)}>
                                                                <FaFilter className="inline-block h-4 w-4 mr-2 hover:bg-slate-50" />
                                                                Close
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <FaFilter
                                                        className="inline-block h-4 w-4 mr-2 cursor-pointer"
                                                        onClick={() => setIsFilterOpen(true)}
                                                    />
                                                )}
                                                {title}
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                }}
                                            >
                                                <FaFilter style={{ marginBottom: 2, marginLeft:6  }} />
                                                {title}
                                            </div>
                                        )}
                                    </th>
                                ) : null
                            )
                        )}
                    </tr>
                </thead>
                <tbody className="ml-5">{rows}</tbody>
            </table>
        </div>
    );
};

export default Table;