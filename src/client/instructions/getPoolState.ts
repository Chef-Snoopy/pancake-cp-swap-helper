import * as anchor from '@project-serum/anchor';
import { Program, AnchorProvider, web3, BN, Idl } from '@project-serum/anchor';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import dotenv from 'dotenv';
import getIDL from '../idl/program_idl';
import provider from '../utils/getProvider';
import getPoolId from './getPoolId';
import getAuthorityAddress from './getAuthorityAddress';
import convertJsonValues from '../utils/convertJsonValue';
dotenv.config();

anchor.setProvider(provider);

const IDL = getIDL();
async function getPoolState(programId: PublicKey, poolStateAddress: PublicKey) {
  let [authority, _] = await getAuthorityAddress(programId);
  const program = new Program(IDL as Idl, programId, provider);
  const poolStateAccount = await program.account.poolState.fetch(poolStateAddress);
  // console.log("Pool State Account:", poolStateAccount);

  // console.log("Amm Config:", (poolStateAccount.ammConfig as PublicKey).toBase58());
  // console.log("Pool Creator:", (poolStateAccount.poolCreator as PublicKey).toBase58());
  // console.log("Token 0 Vault:", (poolStateAccount.token0Vault as PublicKey).toBase58());
  // console.log("Token 1 Vault:", (poolStateAccount.token1Vault as PublicKey).toBase58());
  // console.log("LP Mint:", (poolStateAccount.lpMint as PublicKey).toBase58());
  // console.log("Token 0 Mint:", (poolStateAccount.token0Mint as PublicKey).toBase58());
  // console.log("Token 1 Mint:", (poolStateAccount.token1Mint as PublicKey).toBase58());
  // console.log("Token 0 Program:", (poolStateAccount.token0Program as PublicKey).toBase58());
  // console.log("Token 1 Program:", (poolStateAccount.token1Program as PublicKey).toBase58());
  // console.log("Observation Key:", (poolStateAccount.observationKey as PublicKey).toBase58());
  // console.log("Auth Bump:", poolStateAccount.authBump);
  // console.log("Status:", poolStateAccount.status);
  // console.log("LP Mint Decimals:", poolStateAccount.lpMintDecimals);
  // console.log("Mint 0 Decimals:", poolStateAccount.mint0Decimals);
  // console.log("Mint 1 Decimals:", poolStateAccount.mint1Decimals);
  // console.log("LP Supply:", poolStateAccount.lpSupply);
  // console.log("Protocol Fees Token 0:", poolStateAccount.protocolFeesToken0);
  // console.log("Protocol Fees Token 1:", poolStateAccount.protocolFeesToken1);
  // console.log("Fund Fees Token 0:", poolStateAccount.fundFeesToken0);
  // console.log("Fund Fees Token 1:", poolStateAccount.fundFeesToken1);
  // console.log("Open Time:", poolStateAccount.openTime);
  // console.log("Recent Epoch:", poolStateAccount.recentEpoch);
  // console.log("Padding:", poolStateAccount.padding);

  const poolState = {
    authority: authority.toBase58(),
    poolState: poolStateAddress.toBase58(),
    ammConfig: (poolStateAccount.ammConfig as PublicKey).toBase58(),
    poolCreator: (poolStateAccount.poolCreator as PublicKey).toBase58(),
    token0Vault: (poolStateAccount.token0Vault as PublicKey).toBase58(),
    token1Vault: (poolStateAccount.token1Vault as PublicKey).toBase58(),
    lpMint: (poolStateAccount.lpMint as PublicKey).toBase58(),
    token0Mint: (poolStateAccount.token0Mint as PublicKey).toBase58(),
    token1Mint: (poolStateAccount.token1Mint as PublicKey).toBase58(),
    token0Program: (poolStateAccount.token0Program as PublicKey).toBase58(),
    token1Program: (poolStateAccount.token1Program as PublicKey).toBase58(),
    observationKey: (poolStateAccount.observationKey as PublicKey).toBase58(),
    authBump: poolStateAccount.authBump,
    status: poolStateAccount.status,
    lpMintDecimals: poolStateAccount.lpMintDecimals,
    mint0Decimals: poolStateAccount.mint0Decimals,
    mint1Decimals: poolStateAccount.mint1Decimals,
    lpSupply: poolStateAccount.lpSupply,
    protocolFeesToken0: poolStateAccount.protocolFeesToken0,
    protocolFeesToken1: poolStateAccount.protocolFeesToken1,
    fundFeesToken0: poolStateAccount.fundFeesToken0,
    fundFeesToken1: poolStateAccount.fundFeesToken1,
    openTime: poolStateAccount.openTime,
    recentEpoch: poolStateAccount.recentEpoch,
    // padding: poolStateAccount.padding,
  };

  let poolState_format = convertJsonValues(poolState);
  return poolState_format;
}

export default getPoolState;

// Example usage
// (async () => {
//   const poolStateAddress = new PublicKey(
//     "6wq7U2ShRrEtk9xHWpeFBGEMzcFV5DgjSAd8mHeN8zoE"
//   ); // 替换为实际的 PoolState 公钥
//   let pool_state_format = await getPoolState(defaultProgramId, poolStateAddress);
//   console.log(pool_state_format);
// })();
