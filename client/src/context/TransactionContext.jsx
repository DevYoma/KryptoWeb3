import React, { useState, useEffect, createContext } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'

export const TransactionContext = createContext();

// we have access to the ETH object
const { ethereum } = window;

// FUNCTION TO FETCH ETHEREUM CONTRACT....
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)


    console.log({
        provider,
        signer,
        transactionContract 
    })
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("")
    const [formData, setFormData] = useState({
        addressTo: "", 
        amount: "", 
        keyword: "",
        message: ""
    })

    // just normal react
    
//   const handleChange = (e, name) => {
//     setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
//   };

const handleChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
}

    // checking if a wallet is connected
    const checkIfWalletIsConnected = async () => {

        try {
            if(!ethereum) return alert("Please install metamask")

            // connect metamask to account
            const accounts = await ethereum.request({method: 'eth_accounts'})

            if(accounts.length){
                setCurrentAccount(accounts[0])

                // get all transactions
            }else{
                console.log('No accounts found')
            }        
        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object")
        }
        
        // console.log(accounts)
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install metamask")

            // this is more like the providers fro logging in
            const accounts = await ethereum.request({method: 'eth_requestAccounts'})

            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object")
        }
    }

    // LOGIC FOR SENDING AND STORING TRANSACTIONS
    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Please install Metamask 🦊")

            const { addressTo, amount, keyword, message } = formData;

            // calling the Ethereum contract
            getEthereumContract()

            // get the data from the form
        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object")   
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}> 
            {children}
        </TransactionContext.Provider>
    )
}
