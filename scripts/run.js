const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const gmContractFactory = await hre.ethers.getContractFactory('GmPortal');
  const gmContract = await gmContractFactory.deploy();
  await gmContract.deployed();

  console.log('Contract deployed to:', gmContract.address);
  console.log('Contract deployed by:', owner.address);

  let gmCount;
  gmCount = await gmContract.getTotalGms();
  console.log(gmCount.toNumber());

  let gmTxn = await gmContract.gm('Test message!');
  await gmTxn.wait();

  gmCount = await gmContract.getTotalGms();

  gmTxn = await gmContract.connect(randomPerson).gm('Another message!');
  await gmTxn.wait();

  gmCount = await gmContract.getTotalGms();

  let allGms = await gmContract.getAllGms();
  console.log(allGms);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
