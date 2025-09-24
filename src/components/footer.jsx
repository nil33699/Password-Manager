import React from 'react'

const Footer = () => {
  return (
    <footer className=" flex justify-center md:gap-10 gap-2 fixed bottom-0  w-full bg-slate-800 text-gray-400 text-center py-3">
        <div className='text-white'>
            <span className='text-blue-500'> &lt;</span>
            <span>Pass </span>
            <span className='font-bold text-blue-500'>OP</span>
            <span className='text-blue-500'>/&gt;</span>
        </div>
    <p className="text-sm">
      © {new Date().getFullYear()}. All Rights Reserved.
    </p>
    <img src="./icons/githubicon.svg" alt=""/>
  </footer>
  
  )
}

export default Footer
