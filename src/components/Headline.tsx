import React from "react";

const Headline = ({title}) =>{

    return (
        <div className="flex gap-5 items-center justify-center"> 
            <div className="bg-green-600 w-[100px] h-[2px]"></div>
            <h1 className="text-gray-600 uppercase text-2xl">{title}</h1>
            <div className="bg-green-600 w-[100px] h-[2px]"></div>
        </div>
        // <Hero />
        // <Features />
        // <FeaturesBlocks />
        // <Testimonials />
        // <Newsletter />
    );
}

export default Headline;