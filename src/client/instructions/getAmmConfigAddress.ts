import * as anchor from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';
import provider from '../utils/getProvider';
dotenv.config();

anchor.setProvider(provider);

const defaultProgramId = new PublicKey(process.env.PROGRAM_ID!);

async function getAmmConfigAddressByIndex(
  programId: PublicKey,
  index: number,
): Promise<[PublicKey, number]> {
  const AMM_CONFIG_SEED = 'amm_config';

  const [ammConfigAddress, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(AMM_CONFIG_SEED), new anchor.BN(index).toArrayLike(Buffer, 'be', 2)],
    programId,
  );

  return [ammConfigAddress, bump];
}

export default getAmmConfigAddressByIndex;

// Example usage
// (async () => {
//   const index = 0; // amm config index

//   const [ammConfigAddress, bump] = await getAmmConfigAddressByIndex(
//     defaultProgramId,
//     index
//   );
//   console.log("Amm Config Address:", ammConfigAddress.toString());
//   console.log("Bump:", bump);
// })();
