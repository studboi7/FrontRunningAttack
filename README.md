# 🛠 Front-Running Attack using Hardhat

This project simulates a front-running attack on an Ethereum smart contract using the Hardhat framework. It includes victim and attacker scripts to demonstrate how transaction ordering can be manipulated using gas prices.

---

## 🚀 Getting Started

Make sure you have all dependencies installed and Hardhat is set up.

---

## 📦 Commands to Run the Project

### 1. Start the Local Hardhat Node

```bash
npx hardhat node
```

---

### 2. Open the Hardhat Console on Localhost

```bash
npx hardhat console --network localhost
```

Inside the console, run:

```js
await network.provider.send("evm_setAutomine", [false]);
await network.provider.send("evm_mine");
```

This disables auto-mining and allows manual control of block production.

---

### 3. Run the Victim Script

```bash
npx hardhat run scripts/victim.js --network localhost
```

---

### 4. Run the Attacker Script

```bash
npx hardhat run scripts/attacker.js --network localhost
```

---

### 5. Check the Winner

```bash
npx hardhat run scripts/check-winner.js --network localhost
```

---

### 6. Check Account Address

```bash
npx hardhat run scripts/checkAccounts.js --network localhost
```

---

## 📁 Project Structure

- `scripts/victim.js`: Simulates a victim submitting an answer.
- `scripts/attacker.js`: Simulates an attacker exploiting front-running.
- `scripts/check-winner.js`: Displays who received the reward.
- `scripts/checkAccounts.js`: Logs ETH balances of all relevant accounts.

---

## 📌 Notes

- Automine is turned off during the simulation to mimic the mempool behavior.
- Use manual mining (`evm_mine`) after submitting transactions to control block inclusion order.

---

## ✅ Prerequisites

- Node.js & npm
- Hardhat
- A basic understanding of smart contracts and Ethereum

---
