import * as anchor from '@project-serum/anchor';
import { Program, AnchorProvider, web3, BN, Idl } from '@project-serum/anchor';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import dotenv from 'dotenv';
import getIDL from '../idl/program_idl';
import provider from '../utils/getProvider';
import getPoolId from './getPoolId';
import getAuthorityAddress from './getAuthorityAddress';
dotenv.config();

anchor.setProvider(provider);

const IDL = getIDL();
async function getPoolStateList(programId: PublicKey) {
  const program = new Program(IDL as Idl, programId, provider);
  const pool_state_list = await program.account.poolState.all();

  return pool_state_list;
}

export default getPoolStateList;

// Example usage
// (async () => {
//   const programId = new PublicKey('7dyEnNFi78NL8gTutUTPqRSR25GCjXPAUpFhumy2yWWi');
//   let pool_state_list = await getPoolStateList(programId);
//   console.log(pool_state_list);
// })();
