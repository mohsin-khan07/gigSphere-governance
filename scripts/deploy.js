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

// Governor: 0x9132092410671Fa305b8aFa1cc74aF05F2EC256A
// Token: 0xAD083377A736990533bA828f4f4f4B32ADB08a17
