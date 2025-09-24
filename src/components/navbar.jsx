import React from 'react'

const Navbar = () => {
  return (
    <nav className='fixed w-full  top-0 z-10 flex justify-between px-3 md:px-44 bg-slate-800 h-14 items-center'>
        <div className='text-2xl text-white'>
            <span className='text-blue-500'> &lt;</span>
            <span>Pass </span>
            <span className='font-bold text-blue-500'>OP</span>
            <span className='text-blue-500'>/&gt;</span>
        </div>
        <button className='flex items-center gap-1 text-blue-500 text-lg border border-blue-500 p-1 rounded-lg'>
          <img src="./icons/githubicon.svg" alt=""/>
          <span>GitHub</span>
        </button>
    </nav>
  )
}

export default Navbar
