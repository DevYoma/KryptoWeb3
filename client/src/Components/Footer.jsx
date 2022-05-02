import React from 'react'
import Logo from '../images/logo.png'

const Footer = () => {
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className='flex flex-[0.5] justify-center items-center'>
          <img src={Logo} alt="logo" className='w-32'/>
        </div>

        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          <p className="text-white text-base text-center mx-2 cursor-pointer">Market</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">Exchange</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">Tutorial</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">Wallet</p>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-sm text-center">Made by Yoma</p>
      </div>
      <div className='sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 ' />
      <div className="flex sm:w-[90%] justify-between items-center">
        <p className="text-white text-sm text-center">lawrenceyoma@gmail.com</p>
        <p className="text-white text-sm text-center">@kryptomastery 2022</p>
      </div>
    </div>
  )
}

export default Footer


// const handleChange = (e) => {
//   setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value
//   }))
// }