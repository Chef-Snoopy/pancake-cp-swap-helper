import * as anchor from '@project-serum/anchor';
import { Program, AnchorProvider, web3, Idl } from '@project-serum/anchor';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import bs58 from 'bs58';
import dotenv from 'dotenv';
import getIDL from '../idl/program_idl';
import provider from '../utils/getProvider';
import getPoolState from './getPoolState';
dotenv.config();

const IDL = getIDL();
anchor.setProvider(provider);

const privateKeyString = process.env.PRIVATE_KEY;
if (!privateKeyString) {
  throw new Error('PRIVATE_KEY is not defined in the .env file');
}

const secretKey = bs58.decode(privateKeyString);
if (secretKey.length !== 64) {
  throw new Error('bad secret key size');
}

const keypair = Keypair.fromSecretKey(secretKey);

async function collectProtocolFee(
  programId: PublicKey,
  poolState: PublicKey,
  recipientToken0Account: PublicKey,
  recipientToken1Account: PublicKey,
  amount0Requested: number,
  amount1Requested: number,
) {
  const program = new Program(IDL as Idl, programId, provider);
  let pool_state_obj = await getPoolState(programId, poolState);
  const ctx = {
    accounts: {
      owner: keypair.publicKey,
      authority: pool_state_obj.authority,
      poolState: poolState,
      ammConfig: pool_state_obj.ammConfig,
      token0Vault: pool_state_obj.token0Vault,
      token1Vault: pool_state_obj.token1Vault,
      vault0Mint: pool_state_obj.token0Mint,
      vault1Mint: pool_state_obj.token1Mint,
      recipientToken0Account: recipientToken0Account,
      recipientToken1Account: recipientToken1Account,
      tokenProgram: TOKEN_PROGRAM_ID,
      tokenProgram2022: TOKEN_2022_PROGRAM_ID,
    },
    signers: [keypair],
  };

  try {
    const tx = await program.rpc.collectProtocolFee(
      new anchor.BN(amount0Requested),
      new anchor.BN(amount1Requested),
      ctx,
    );
    return tx;
  } catch (error) {
    console.error('Error collecting protocol fee:', error);
  }
}

export default collectProtocolFee;
