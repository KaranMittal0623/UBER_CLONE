import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
        <h5 onClick={()=>{
          props.setwaitingForDriverPanel(false)
        }} className='p-1 text-center absolute top-0 w-[93%]'><i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i></h5>
        <h3 className='text-2xl font-bold mb-5'>Waiting for Driver</h3>
        <div className='flex items-center justify-between'>
            <img className='h-12' src='https://imgs.search.brave.com/ARNT3U8pDTtdEZ3Vs78jW1Pu-5x91_MB-xyBBWUwryE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjEv/Nzk0Lzc4Mi9zbWFs/bC9pc29tZXRyaWMt/Y2FyLWljb24taXNv/bGF0ZWQtb24td2hp/dGUtZnJlZS12ZWN0/b3IuanBn'></img>
            <div className='text-right'>
                <h2 className='text-lg font-medium'>Sarthak</h2>
                <h4 className='text-xl font-semibold -mt-1 mb-1'>MB04 AB 1234</h4>
                <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
            </div>
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
            <div className='w-full'>
                <div className='flex items-center gap-5 border-2 border-black rounded-lg mt-2'>
                    <i className="ri-map-pin-line text-xl font-bold ml-2"></i>
                    <div className=''>
                        <h3 className='text-lg font-bold'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1'>Kankariya Talab, Bhopal</p>
                    </div>
                </div>

                <div className='flex items-center gap-5  border-2 border-black rounded-lg mt-4'>
                    <i className="ri-map-pin-line text-xl font-bold ml-2"></i>
                    <div className=''>
                        <h3 className='text-lg font-bold'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1'>Kankariya Talab, Bhopal</p>
                    </div>
                </div>

                <div className='flex items-center gap-5 border-2 border-black rounded-lg mt-4'>
                    <i className="ri-map-pin-line text-xl font-bold ml-2"></i>
                    <div className=''>
                        <h3 className='text-lg font-bold'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1'>Kankariya Talab, Bhopal</p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default WaitingForDriver