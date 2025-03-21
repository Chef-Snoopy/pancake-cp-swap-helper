import * as anchor from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';
import provider from '../utils/getProvider';
dotenv.config();

anchor.setProvider(provider);

// const defaultProgramId = new PublicKey(process.env.PROGRAM_ID!);

async function getAuthorityAddress(programId: PublicKey): Promise<[PublicKey, number]> {
  const AUTH_SEED = 'vault_and_lp_mint_auth_seed';

  const [authorityAddress, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(AUTH_SEED)],
    programId,
  );

  return [authorityAddress, bump];
}

export default getAuthorityAddress;

// Example usage
// (async () => {
//   const [authorityAddress, bump] = await getAuthorityAddress(defaultProgramId);
//   console.log("Authority Address:", authorityAddress.toString());
//   console.log("Bump:", bump);
// })();
