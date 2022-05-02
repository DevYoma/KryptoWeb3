import React, { useState, useContext } from 'react'
import { AiFillPlayCircle } from 'react-icons/ai' 
import {SiEthereum} from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'
import { TransactionContext } from '../context/TransactionContext' 
import { shortenAddress } from '../utils/ShortenAddress'

import { Loader } from './index'

const Welcome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { connectWallet, currentAccount, formData, sendTransaction, handleChange } = useContext(TransactionContext)

  const InputStyles = "my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"

  const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white hover:cursor-pointer";

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault()
    console.log( addressTo, amount, keyword, message);
    if(!addressTo || !amount || !keyword || !message) return;

    // else
    sendTransaction()
  }

  return (
    <div className="flex w-full justify-center items-center">
      <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
        <div className='flex flex-1 justify-start flex-col mf:mr-10'>
          <h1 className='text-white text-3xl sm:text-5xl text-gradient py-1'>
            Send Crypto <br /> across the world
          </h1>

          <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
            Explore the crypto world and sell cryptocurrencies easily on Krypto
          </p>
          {
            !currentAccount && (
              <button
                type='button'
                onClick={connectWallet}
                className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'
              >
                <p className='text-white text-base font-semibold'>Connect Wallet</p>
              </button>
            )
          }

          {/* Beside Button */}
          <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
            <div className={`rounded-tl-2xl ${commonStyles}`}>
              Reliability
            </div>

            <div className={commonStyles}>
              Security
            </div>

            <div className={`rounded-tr-2xl ${commonStyles}`}>
              Ethereum
            </div>

            <div className={`rounded-bl-2xl ${commonStyles}`}>
              Web 3.0
            </div>

            <div className={commonStyles}>
              Low fees  
            </div>

            <div className={`rounded-br-2xl ${commonStyles}`}>
              BlockChain
            </div>
          </div>
        </div>

        {/* ETHEREUM CARD */}
        <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
          <div className='p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism'>
            <div className='flex justify-between flex-col w-full h-full'>
              <div className='flex justify-between items-start'>
                {/* Icon Wrapper */}
                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                  <SiEthereum fontSize={21} color='#fff'/>
                </div>
                <BsInfoCircle fontSize={17} color='#fff'/>
              </div>

              <div>
                <p className='text-white font-light text-sm'>
                  {shortenAddress(currentAccount)}
                </p>
                <p className='text-white font-semibold text-lg mt-1'>
                  Ethereum
                </p>
              </div>
            </div>
          </div>

          {/* FORM DIV */}
          <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'>
           
            <input 
              type="text" 
              placeholder='Address To'
              value={formData.addressTo}
              onChange={handleChange}
              name="addressTo"
              className={InputStyles}
            />

            <input 
              type="number" 
              placeholder='Amount (ETH)'
              value={formData.amount}
              onChange={handleChange}
              name="amount"
              step="0.0001"
              className={InputStyles}
            />

            <input 
              type="text" 
              placeholder='Keyword (GIF)'
              value={formData.keyword}
              onChange={handleChange}
              name='keyword'
              className={InputStyles}
            />

            <input  
              type="text" 
              placeholder='Enter Message'
              value={formData.message}
              onChange={handleChange}
              name='message'
              className={InputStyles}
            />

            {/* selfClosing div */}
            <div className='h-[1px] w-full bg-gray-400 my-2'/>

            {/* Loading */}
            {!isLoading ? (
               <Loader />
            ): (
              <button
                type='button'
                onClick={handleSubmit}
                className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer'
              >
                Send Now
              </button>
            )}

          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Welcome
