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

//this is like the most important part of the app...
    // console.log({
    //     provider,
    //     signer,
    //     transactionContract 
    // })
    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("")
    const [formData, setFormData] = useState({
        addressTo: "", 
        amount: "", 
        keyword: "",
        message: ""
    })
    const [loading, setLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))

const handleChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
}

// For the transaction section on the page. it is called in CHECKIFWALLETISCONNECTED
    const getAllTransactions = async () => {
        try {
            if(!ethereum) return alert("Please install metamask 🦊")

            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions()
            // console.log(availableTransactions)

        } catch (error) {
            console.log(error)

            throw new Error("No Ethereum Object")
        }
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
                getAllTransactions();
            }else{
                console.log('No accounts found')
            }        
        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object")
        }
        
        // console.log(accounts)
    }

    // FUNCTION TO CHECK IF TRANSACTIONS EXISTS
    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem('transactionCount', transactionCount)
        } catch (error) {
            console.log(error)

            throw new Error("No Ethereum");
        }
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
            const transactionContract = getEthereumContract()
            // converting Amount entered in form to HEX or GWEI
            const parsedAmount = ethers.utils.parseEther(amount)
            // this only sends ETH from one address to another...
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount, 
                    to: addressTo,
                    gas: '0x5208', 
                    value: parsedAmount._hex,
                }]
            })

            // To store our transaction(ADDING TO BLOCKCHAIN)
            const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount, message, keyword)

            setLoading(true)
            console.log(`Loading - ${transactionHash.hash}`)
            await transactionHash.wait(); // this waits for the transaction to be finished

            setLoading(false)
            console.log(`Success - ${transactionHash.hash}`)

            const transactionsCount = await transactionContract.getTransactionCount();
            
            setTransactionCount(transactionsCount.toNumber())

            // get the data from the form
        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object")   
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}> 
            {children}
        </TransactionContext.Provider>
    )
}
