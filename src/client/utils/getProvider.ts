import * as anchor from '@project-serum/anchor';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { Connection, PublicKey, Keypair, clusterApiUrl } from '@solana/web3.js';
import bs58 from 'bs58';
// import dotenv from "dotenv";

// dotenv.config();

let keypair: Keypair = Keypair.generate();

// const network = (process.env.NETWORK as web3.Cluster) || "devnet";
const network = 'devnet';

// 配置 Solana Devnet 连接
const connection = new Connection(clusterApiUrl(network), 'confirmed');

// 设置 Anchor Provider
const provider = new AnchorProvider(connection, new anchor.Wallet(keypair), {
  preflightCommitment: 'confirmed',
});

export default provider;
