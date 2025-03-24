import * as anchor from '@project-serum/anchor';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { Connection, PublicKey, Keypair, clusterApiUrl } from '@solana/web3.js';
import bs58 from 'bs58';
import dotenv from 'dotenv';

dotenv.config();

let keypair: Keypair;
if (process.env.PRIVATE_KEY) {
  const secretKey = bs58.decode(process.env.PRIVATE_KEY);
  keypair = Keypair.fromSecretKey(secretKey);
} else {
  keypair = Keypair.generate();
}

const network = (process.env.NETWORK as web3.Cluster) || 'devnet';
const connection = new Connection(clusterApiUrl(network), 'confirmed');

const provider = new AnchorProvider(connection, new anchor.Wallet(keypair), {
  preflightCommitment: 'confirmed',
});

export default provider;
