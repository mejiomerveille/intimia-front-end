import React,{useEffect} from "react";

const Loader = () =>{
    return(
        <div className="flex justify-center items-center h-screen">
        <div className="relative w-20 h-20 animate-spin-reverse">
          <div className="absolute top-0 left-0 w-5 h-5 bg-green-500 rounded-full animate-pulse-in"></div>
          <div className="absolute top-0 right-0 w-5 h-5 bg-black rounded-full animate-pulse-out"></div>
          <div className="absolute bottom-0 left-0 w-5 h-5 bg-red-500 rounded-full animate-pulse-in"></div>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-pink-500 rounded-full animate-pulse-out"></div>
        </div>
      </div>
    )
}
export default Loader;