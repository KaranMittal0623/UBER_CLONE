import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 onClick={()=>{
          props.setVehiclePanel(false)
        }} className='p-3 text-center absolute top-0 w-[93%]'><i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i></h5>
          <h3 className='text-2xl font-bold mb-5'>Choose a Vehicle</h3>
          <div onClick={()=>{
            props.setconfirmRidePanel(true)
          }} className='w-full flex items-center justify-between active:border-black border-2 rounded-xl pt-2'>
            <img src='https://imgs.search.brave.com/ARNT3U8pDTtdEZ3Vs78jW1Pu-5x91_MB-xyBBWUwryE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjEv/Nzk0Lzc4Mi9zbWFs/bC9pc29tZXRyaWMt/Y2FyLWljb24taXNv/bGF0ZWQtb24td2hp/dGUtZnJlZS12ZWN0/b3IuanBn' className='h-10'></img>
            <div className=' w-1/2 rounded-br-lg rounded-tr-lg'>
              <h4 className='font-extrabold text-xs'>Ubergo <span><i class="ri-user-3-fill"></i> 4</span></h4>
              <h5 className='font-bold text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
              <h2 className='text-xl font-semibold'>Rs.193.20</h2>
            </div>
          </div>

          <div onClick={()=>{
            props.setconfirmRidePanel(true)
          }} className='w-full flex items-center justify-between border-2 rounded-xl mt-3 active:border-black'>
            <img src='https://imgs.search.brave.com/Y0nKMKEE5ZjOcIbrf2LBkk0OzymP4quE1I0rrR7Ym2k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hdGxh/cy1jb250ZW50LWNk/bi5waXhlbHNxdWlk/LmNvbS9hc3NldHNf/djIvMjQ5LzI0OTE0/OTA2MDA0MzI0NDEw/NDgvanBlZy02MDAv/RzAzLmpwZw' className='h-17 ml-3'></img>
            <div className=' w-1/2 rounded-br-lg rounded-tr-lg'>
              <h4 className='font-extrabold text-xs'>Moto <span><i class="ri-user-3-fill"></i> 2</span></h4>
              <h5 className='font-bold text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
              <h2 className='text-xl font-semibold'>Rs.67.20</h2>
            </div>
          </div>

          <div onClick={()=>{
            props.setconfirmRidePanel(true)
          }} className='w-full flex items-center justify-between active:border-black border-2 rounded-xl mt-3 '>
            <img src='https://imgs.search.brave.com/0kIZopx8FbYurkoWok0fMcIdom9Wmg8E426EVIFVcyc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1LzkxLzQ2LzQy/LzM2MF9GXzE1OTE0/NjQyMDFfQUlXaHFT/YjF0dTI4TEk1NXFo/UTJPTmVXcUxkODlP/QzguanBn' className='h-10'></img>
            <div className=' w-1/2 rounded-br-lg rounded-tr-lg'>
              <h4 className='font-extrabold text-xs'>Auto <span><i class="ri-user-3-fill"></i> 3</span></h4>
              <h5 className='font-bold text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
              <h2 className='text-xl font-semibold'>Rs.120.20</h2>
            </div>
          </div>
    </div>
  )
}

export default VehiclePanel