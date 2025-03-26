import * as anchor from '@project-serum/anchor';
import { Program, AnchorProvider, web3, Idl } from '@project-serum/anchor';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import provider from '../utils/getProvider';
import { getAccount, TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import convertJsonValues from '../utils/convertJsonValue';

anchor.setProvider(provider);

async function getUserTokenAccountInfo(tokenAccountAddress: string, isToken2022 = false) {
  // User wallet address (Owner)
  const tokenAccountPublicKey = new PublicKey(tokenAccountAddress);

  let tokenAccountInfo = await getAccount(
    provider.connection,
    tokenAccountPublicKey,
    'confirmed',
    isToken2022 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID,
  );

  let tokenAccountInfo_format = convertJsonValues(tokenAccountInfo);
  return tokenAccountInfo_format;
}

export default getUserTokenAccountInfo;

// (async () => {
//   const userTokenAccountINfo = await getUserTokenAccountInfo(
//     'FiPgyaQtH2kaY955NRakywT1eiYMu9SdAqAVwfVbEV7e',
//     true,
//   );
// })();
