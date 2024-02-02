const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  const transactionCount = await owner.getTransactionCount();

  // gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: owner.address,
    nonce: transactionCount + 1,
  });

  const Governor = await ethers.getContractFactory("GigsGovernor");
  const governor = await Governor.deploy(futureAddress);

  const Gigs = await ethers.getContractFactory("GigSphere");
  const gigs = await Gigs.deploy(governor.address);

  console.log(
    `Governor deployed to ${governor.address}`,
    `Token deployed to ${gigs.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Governor: 0xc9b98043BC38495F8a3b0A055CF0a548e8dD4062
// Token: 0x77e2433DEdC35e444E13C0d5C7d2Bc8A8FeD18CA
