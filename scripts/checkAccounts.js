const hre = require("hardhat");

async function main() {
  const ethers = hre.ethers;
  const [deployer, victim, attacker] = await ethers.getSigners();

  console.log("Deployer:", await deployer.getAddress());
  console.log("Victim:  ", await victim.getAddress());
  console.log("Attacker:", await attacker.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
