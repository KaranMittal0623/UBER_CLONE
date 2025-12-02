import React from 'react'

const LocationSearchPanel = (props) => {



    // Sample array for location
    const locations = [
        "24B, Near Kapoor's Cafe, Sheriyan Coding School, Bhopal",
        "23B, Near Malhotra's Cafe, Sheriyan Coding School, Bhopal",
        "22B, Near Sharma's Cafe, Sheriyan Coding School, Bhopal",
        "21B, Near Mittal's Cafe, Sheriyan Coding School, Bhopal"
    ]
  return (
    <div>
        {/* This is just a sample data */}

        {
            locations.map(function(ele,idx){
                return <div key={idx} onClick={()=>{
                    props.setvehiclePanel(true)
                    props.setPanelOpen(false)
                }} className='flex gap-4 items-center justify-start my-4 p-3 border-2 border-gray-100 rounded-xl active:border-black'>
                <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                    <i class="ri-gps-fill"></i>
                </h2>
                <h4 className='font-medium'>{ele}</h4>
            </div>
            })
        }
    </div>
  )
}

export default LocationSearchPanel