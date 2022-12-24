import React from "react";
import nodata from '../../assets/nodata.svg';

const NotFound = () =>{
    return(
        <div className="flex items-center justify-center bg-[#F9F9F9] h-[250px]">
            <img src={nodata} alt="No data found" className="w-[200px] h-15 mr-4" />
            <div className="text-container">
                <h1 className="text-2xl font-bold"> Hey! Something's off! We couldn't diplay the given data.</h1>
                <h2 className="text-lg font-medium text-[#B9B9B9]"> Try changing your filters or selecting a different data</h2>
            </div>
        </div>
    )
}

export default NotFound;