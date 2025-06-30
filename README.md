🛠 Front-Running Simulation using Hardhat
This project simulates a front-running attack on an Ethereum smart contract using the Hardhat framework. It includes victim and attacker scripts to demonstrate how transaction ordering can be manipulated using gas prices.

Getting Started
Make sure you have all dependencies installed and Hardhat is set up.

Commands to Run the Project
1. Start the Local Hardhat Node
npx hardhat node

2. Open the Hardhat Console on Localhost
npx hardhat console --network localhost

Inside the console, run the following commands to control block mining:
await network.provider.send("evm_setAutomine", [false]);
await network.provider.send("evm_mine");

4. Run the Victim Script
npx hardhat run scripts/victim.js --network localhost

5. Run the Attacker Script
npx hardhat run scripts/attacker.js --network localhost

6. Check the Winner
npx hardhat run scripts/check-winner.js --network localhost

8. Check Account Balances
npx hardhat run scripts/checkAccounts.js --network localhost
