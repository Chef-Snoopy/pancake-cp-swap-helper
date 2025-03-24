#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { PublicKey } from '@solana/web3.js';
import getPoolAccountKey from '../client/instructions/getPoolId';
import getPoolState from '../client/instructions/getPoolState';
import getAmmConfig from '../client/instructions/getAmmConfig';

yargs(hideBin(process.argv))
  .scriptName('pcs_cp')
  .usage('$0 <cmd> [args]')
  .command(
    'pool_state',
    'Get Pool State Information',
    (yargs) =>
      yargs
        .option('programId', { type: 'string', describe: 'Program ID' })
        .option('index', { type: Number, default: 0, describe: 'Amm Config Index' })
        .option('t0', { type: 'string', describe: 'token0 mint address' })
        .option('t1', { type: 'string', describe: 'token1 mint address' }),
    async (argv) => {
      console.log('get pool state...');
      console.log('id:', argv.programId);
      console.log('index:', argv.index);
      console.log('t0:', argv.t0);
      console.log('t1:', argv.t1);

      const programId = new PublicKey(argv.programId as string);
      const index = parseInt(argv.index as string, 10);
      let token0Mint = new PublicKey(argv.t0 as string);
      let token1Mint = new PublicKey(argv.t1 as string);

      if (token0Mint.toBase58() > token1Mint.toBase58()) {
        [token0Mint, token1Mint] = [token1Mint, token0Mint];
      }

      const [poolAccountKey, bump] = await getPoolAccountKey(
        programId,
        index,
        token0Mint,
        token1Mint,
      );
      const poolState = await getPoolState(programId, poolAccountKey);
      console.log('pool state:', poolState);
    },
  )
  .command(
    'amm_config',
    'Get AMM Config Information',
    (yargs) =>
      yargs
        .option('programId', { type: 'string', describe: 'Program ID' })
        .option('index', { type: Number, default: 0, describe: 'Amm Config Index' }),
    async (argv) => {
      console.log('get amm config...');
      console.log('id:', argv.programId);
      console.log('index:', argv.index);

      const programId = new PublicKey(argv.programId as string);
      const index = parseInt(argv.index as string, 10);

      const ammConfig = await getAmmConfig(programId, index);
      console.log('amm config:', ammConfig);
    },
  )
  .help().argv;
