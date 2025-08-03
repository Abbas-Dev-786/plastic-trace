Plastic Waste Trace & Reward System
A blockchain-based dApp to track plastic waste and reward recycling efforts with transparency.

Table of Contents

Project Overview
Tech Stack
Repository Structure
User Flows
System Architecture
Plastic Waste Journey
Installation and Setup
Usage
Contributing
License

Project Overview
Tracks plastic waste from collection to recycling using QR codes on Etherlink. Rewards rag pickers and recyclers with tokens and NFTs via thirdweb. Ensures transparency and prevents fraud.
Key Features

Immutable tracking on Etherlink
Token and NFT rewards
Public dashboards for citizens
Fraud-proof QR lifecycle

Tech Stack

Blockchain: Etherlink - Smart contracts in contracts
Frontend: React + thirdweb SDK in client
Backend: Node.js/Express + MongoDB in server
QR Scanning: Mobile-friendly dApp

Sponsor Highlight

Etherlink: Powers contracts for low-fee, fast transactions
thirdweb: Enables wallet and contract interactions in client

Repository Structure

contracts: Solidity contracts (Etherlink)
server: Node.js/Express + MongoDB for analytics
client: React frontend with thirdweb SDK

User Flows
Admin
Manages QR codes, roles, and rewards.
graph TD
    A[Login<br><i>thirdweb (client)</i>] --> B[Generate QR<br><i>QRCodeManager (contracts)</i>]
    B --> C[Assign QR<br><i>QRCodeManager (contracts)</i>]
    C --> D[Approve Roles<br><i>RoleManager (contracts)</i>]
    D --> E[Fund Rewards<br><i>RewardToken (contracts)</i>]
    E --> F[View Analytics<br><i>server + client</i>]

Recycler
Verifies collections and marks recycling.
graph TD
    A[Login<br><i>thirdweb (client)</i>] --> B[Receive QR<br><i>QRCodeManager (contracts)</i>]
    B --> C[Verify QR<br><i>RecyclingTracker (contracts)</i>]
    C --> D[Mark Recycled<br><i>RecyclingTracker (contracts)</i>]
    D --> E[Earn Tokens<br><i>RewardDistributor (contracts)</i>]

Rag Picker
Collects plastics and earns rewards.
graph TD
    A[Login<br><i>thirdweb (client)</i>] --> B[Scan QR<br><i>RecyclingTracker (contracts)</i>]
    B --> C[Deliver Plastics]
    C --> D[Recycler Verifies]
    D --> E[Earn Tokens<br><i>RewardDistributor (contracts)</i>]
    D --> F[Earn NFT<br><i>EcoNFT (contracts)</i>]

Citizen
Views recycling stats.
graph TD
    A[Access Dashboard<br><i>client</i>] --> B[View Plastics Recycled]
    B --> C[View Leaderboards]
    C --> D[Share Stats]

System Architecture
graph TD
    A[Client<br><i>React + thirdweb</i>] -->|Calls| B[Smart Contracts<br><i>Etherlink</i>]
    A -->|Fetches| C[Server<br><i>Node.js + MongoDB</i>]
    B -->|Stores| D[Etherlink Blockchain]
    C -->|Syncs| D
    subgraph Contracts
        B1[RoleManager]
        B2[QRCodeManager]
        B3[RecyclingTracker]
        B4[EcoNFT]
        B5[RewardToken]
        B6[RewardDistributor]
    end

Plastic Waste Journey
sequenceDiagram
    participant A as Admin
    participant Q as QRCodeManager
    participant R as RagPicker
    participant C as Recycler
    participant T as RecyclingTracker
    participant D as RewardDistributor
    participant N as EcoNFT
    A->>Q: Generate QR
    Q-->>A: QR IDs
    A->>Q: Assign to Recycler
    R->>T: Scan QR
    T-->>R: Log Scan
    R->>C: Deliver Plastics
    C->>T: Verify Scan
    T-->>C: Log Verification
    C->>T: Mark Recycled
    C->>D: Distribute Rewards
    D->>R: Mint Tokens
    D->>C: Mint Tokens
    T->>N: Check Milestone
    N->>R: Mint NFT

Installation and Setup
Prerequisites

Node.js (v14+)
Yarn or npm
Hardhat
MongoDB
MetaMask

Clone
git clone https://github.com/your-repo.git
cd your-repo

Contracts
cd contracts
yarn install
npx hardhat compile
npx hardhat run scripts/deploy.js --network etherlink

Server
cd ../server
yarn install
yarn start

Client
cd ../client
yarn install
yarn start

Configuration

Update contract addresses in client and server configs
Set Etherlink RPC in hardhat.config.js

Usage

Admin: Manage QR, roles, rewards (client)
Rag Picker: Scan QR, track rewards (client)
Recycler: Verify, mark recycled (client + contracts)
Citizen: View dashboards (client)

Contributing
See CONTRIBUTING.md.
License
MIT License - see LICENSE.
Powered by Etherlink and thirdweb
