const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const ethers = hre.ethers;
  const quizAddress = fs.readFileSync("quiz-address.txt", "utf8").trim();
  const quiz = await ethers.getContractAt("Quiz", quizAddress);

  const winner = await quiz.winner();

  if (winner === ethers.ZeroAddress) {
    console.log("❌ No one has won the quiz yet.");
  } else {
    const balance = await ethers.provider.getBalance(winner);
    console.log("🏆 Winner is:", winner);
    console.log("💰 Winner Balance:", ethers.formatEther(balance), "ETH");
  }
}

main().catch(console.error);
