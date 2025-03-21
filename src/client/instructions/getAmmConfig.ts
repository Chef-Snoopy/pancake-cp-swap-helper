import * as anchor from '@project-serum/anchor';
import { Program, AnchorProvider, web3, Idl } from '@project-serum/anchor';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import dotenv from 'dotenv';
import getIDL from '../idl/program_idl';
import provider from '../utils/getProvider';
import getAmmConfigAddressByIndex from './getAmmConfigAddress';

dotenv.config();
anchor.setProvider(provider);

const IDL = getIDL();

async function getAmmConfig(programId: PublicKey, index: number) {
  const program = new Program(IDL as Idl, programId, provider);
  const [ammConfigAddress, bump] = await getAmmConfigAddressByIndex(programId, index);
  let ammConfigAccount = await program.account.ammConfig.fetch(ammConfigAddress);
  //   console.log('Bump:', ammConfigAccount.bump);
  //   console.log('Disable Create Pool:', ammConfigAccount.disableCreatePool);
  //   console.log('Index:', ammConfigAccount.index);
  //   console.log('Trade Fee Rate:', ammConfigAccount.tradeFeeRate);
  //   console.log('Protocol Fee Rate:', ammConfigAccount.protocolFeeRate);
  //   console.log('Fund Fee Rate:', ammConfigAccount.fundFeeRate);
  //   console.log('Create Pool Fee:', ammConfigAccount.createPoolFee);
  //   console.log('Protocol Owner:', (ammConfigAccount.protocolOwner as PublicKey).toBase58());
  //   console.log('Fund Owner:', (ammConfigAccount.fundOwner as PublicKey).toBase58());
  //   console.log('Padding:', ammConfigAccount.padding);

  const ammConfig = {
    ammConfig: ammConfigAddress.toBase58(),
    bump: ammConfigAccount.bump,
    disableCreatePool: ammConfigAccount.disableCreatePool,
    index: ammConfigAccount.index,
    tradeFeeRate: ammConfigAccount.tradeFeeRate,
    protocolFeeRate: ammConfigAccount.protocolFeeRate,
    fundFeeRate: ammConfigAccount.fundFeeRate,
    createPoolFee: ammConfigAccount.createPoolFee,
    protocolOwner: (ammConfigAccount.protocolOwner as PublicKey).toBase58(),
    fundOwner: (ammConfigAccount.fundOwner as PublicKey).toBase58(),
    // padding: ammConfigAccount.padding,
  };

  return ammConfig;
}

export default getAmmConfig;

// (async () => {
//   await getAmmConfig(new PublicKey(process.env.PROGRAM_ID!), 0);
// })();
