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
  const [_, victim] = await ethers.getSigners();

  await logBalances("Before Victim Submission", { victim });

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.question("Enter your quiz answer (as victim): ", async (answer) => {
    const gasPriceGwei = "1";
    const gasPrice = ethers.parseUnits(gasPriceGwei, "gwei");

    // 💾 Save answer and gas price
    fs.writeFileSync("mempool.json", JSON.stringify({ answer, gasPrice: gasPriceGwei }));

    try {
      const tx = await quiz.connect(victim).submitAnswer(answer, {
        gasPrice
      });
      console.log("🟡 Victim TX sent:", tx.hash);
      await tx.wait();
      console.log("✅ Victim TX mined");
    } catch (err) {
      console.error("❌ Victim TX failed:", err);
    }

    await logBalances("After Victim Submission", { victim });
    rl.close();
  });
}

main().catch((error) => {
  console.error("ERROR:", error);
  process.exitCode = 1;
});
