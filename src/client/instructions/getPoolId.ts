import * as anchor from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';
import provider from '../utils/getProvider';
import getAmmConfigAddressByIndex from './getAmmConfigAddress';
dotenv.config();

anchor.setProvider(provider);

// const defaultProgramId = new PublicKey(process.env.PROGRAM_ID!);

async function getPoolAccountKey(
  programId: PublicKey,
  index: number,
  token0Mint: PublicKey,
  token1Mint: PublicKey,
): Promise<[PublicKey, number]> {
  const POOL_SEED = 'pool';
  let [ammConfigKey, _] = await getAmmConfigAddressByIndex(programId, index);
  const [poolAccountKey, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(POOL_SEED), ammConfigKey.toBuffer(), token0Mint.toBuffer(), token1Mint.toBuffer()],
    programId,
  );

  return [poolAccountKey, bump];
}

export default getPoolAccountKey;

// Example usage
// (async () => {
//     const index = 0;
//     const token0Mint = new PublicKey('R5XuTMXanM2os1oDrRi41P4KGshdZovHD64U6dGzJcG');
//     const token1Mint = new PublicKey('F2uJrMEXbYyCNV54qBQhvjfP4wwhEw8qGpfca3Dde5Ru');

//     const [poolAccountKey, bump] = await getPoolAccountKey(defaultProgramId, index, token0Mint, token1Mint);
//     console.log('Pool Account Key:', poolAccountKey.toString());
//     console.log('Bump:', bump);
// })();
