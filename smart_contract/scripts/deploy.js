
const main = async () => {
 
  // We get the contract to deploy

  
  // const Greeter = await hre.ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, Hardhat!");

  // await greeter.deployed();
  // console.log("Greeter deployed to:", greeter.address);

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy()

  await transactions.deployed();
  console.log("Transactions deployed to: ", transactions.address)

}

const runMain = async () => {
  try {
    await main()
    process.exit(0); // meaning the process went successfully
  } catch (error) {
    console.log(error);
    process.exit(1); // meaning there was an error running the project
  }
}

runMain();