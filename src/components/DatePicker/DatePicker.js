import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchApp, fetchReport } from '../../models/actions/useAnalytics';



const DatePicker = ({ isVisible, onClose }) => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState('YYYY-MM-DD');
    const [endDate, setEndDate] = useState('YYYY-MM-DD');


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchReport(startDate, endDate));
        dispatch(fetchApp());
        onClose();
    };


    if (!isVisible) return null;

    const handleClose = (e) => {
        if (e.target.id === 'wrapper')
            onClose();
    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id="wrapper" onClick={handleClose}>
                <div className='w-[400px] flex flex-col'>
                    <button className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button>
                    <div className="bg-white p-2 rounded">
                        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                                        StartDate
                                    </label>
                                    <input type="text" className="form-control block w-full  px-3    py-1.5  text-base  font-normal  text-gray-700  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                </div>
                                <div className="form-group mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                        EndDate
                                    </label>
                                    <input type="text" className="form-control block w-full   px-3   py-1.5 text-base font-normal    text-gray-700   bg-white bg-clip-padding  border border-solid border-gray-300 rounded transition ease-in-out   m-0    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)} />
                                </div>
                                <button type="submit" className="w-full px-6  py-2.5   bg-blue-600  text-white font-medium   text-xs     leading-tight   uppercase   rounded shadow-md    hover:bg-blue-700 hover:shadow-lg  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0     active:bg-blue-800 active:shadow-lg  transition duration-150  ease-in-out">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DatePicker;

