const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const ethers = hre.ethers;
  const [deployer] = await ethers.getSigners();

  const Quiz = await ethers.getContractFactory("Quiz");
  const quiz = await Quiz.deploy("Who is the GOAT?", "goat", {
    value: ethers.parseEther("10.0")
  });

  await quiz.waitForDeployment();
  const address = await quiz.getAddress();

  console.log("✅ Contract deployed at:", address);
  fs.writeFileSync("quiz-address.txt", address);
}

main().catch((error) => {
  console.error("ERROR:", error);
  process.exitCode = 1;
});
