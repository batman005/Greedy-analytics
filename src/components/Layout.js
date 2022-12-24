
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import DatePicker from './DatePicker/DatePicker'
import Table from './Table/Table'
import { FaCalendarAlt } from "react-icons/fa";
import { GoSettings } from "react-icons/go";
import Settings from './Settings/Settings'


export default function Layout() {
	const [selectedColumns, setSelectedColumns] = useState([]);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	
	const onApply = (selectedColumns) => {
		// Do something with the `selectedColumns` array here
		setSelectedColumns(selectedColumns);
	};
	return (
		<>
			<div className="font-lato bg-white h-screen w-screen overflow-hidden flex flex-row ">
				<Sidebar />
				<div className="flex flex-col flex-1 p-4 py-12 overflow-y-auto">
					<h2 className='font-black px-4 text-2xl text-[#1D1A1A]'>Analytics</h2>
					<div className="p-4 py-8">
						<div className="float">
							<button className="float-left inline-flex items-center  bg-white border hover:bg-slate-200 border-gray-400 text-black focus:outline-none font-bold text-sm rounded-lg px-5 py-2.5 text-center mr-4" onClick={() => setShowDatePicker(true)}>
								<FaCalendarAlt className="w-4 h-4 mr-2" style={{ color: '#116FED' }} />
								DatePicker
							</button>
							<button className="float-right  inline-flex items-center bg-white border hover:bg-slate-200 border-gray-400 text-black focus:outline-none font-bold text-sm rounded-lg px-5 py-2.5 text-center" onClick={() => setShowSettings(true)}>
								<GoSettings
									className="w-4 h-4 mr-2"
									style={{ transform: 'rotate(270deg)', color: '#116FED' }} />	Settings</button>
						</div>
						<div className='py-12'>
							<Settings isVisible={showSettings} onClose={() => setShowSettings(false)} onApply={onApply} />
						</div>
						<div className="flex-1 min-h-0 overflow ">
							<Outlet />
							<Table selectedColumns={selectedColumns} />
						</div>
					</div>
				</div>
			</div>
			<DatePicker isVisible={showDatePicker} onClose={() => setShowDatePicker(false)} />
		</>
	)
}