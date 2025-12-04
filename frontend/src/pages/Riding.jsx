import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div>
        <Link to='/home' className='fixed right-2 top-2 h--10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="ri-home-4-line text-lg font-medium"></i>
        </Link>
        <div className='h-1/2'>
            <img src='https://imgs.search.brave.com/QNWNi5wdONhlYZH0C7nDUkZ8pjvuNmVZXz2xqq_Kep8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by90b3ktY2FyLXB1/c2gtcGluLW1hcC10/cmF2ZWxsaW5nLWNv/bmNlcHQtc2hhbGxv/dy1kZXB0aC1maWVs/ZF8zNTM3OC0xMTYu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw' alt='' className='h-full w-full object-cover'></img>
        </div>
        <div className='h-1/2 p-4'>
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

            <button className='w-full bg-green-600 text-white font-bold p-2 rounded-xl mt-4'>Make a Payment</button>
        </div>
    </div>
  )
}

export default Riding