#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { PublicKey } from '@solana/web3.js';
import getPoolAccountKey from '../client/instructions/getPoolId';
import getPoolState from '../client/instructions/getPoolState';
import getAmmConfig from '../client/instructions/getAmmConfig';
import getCollectFundFeeData from '../client/instructions/data/collectFundFeeData';
import getCollectProtocolFeeData from '../client/instructions/data/collectProtocolFeeData';

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
  .command(
    'collect_fund_fee_data',
    'Collect Fund Fee Instruction Data',
    (yargs) =>
      yargs
        .option('amount0', {
          type: Number,
          default: 0,
          describe:
            'The maximum amount of token_0 to send, can be 0 to collect fees in only token_1',
        })
        .option('amount1', {
          type: Number,
          default: 0,
          describe:
            'The maximum amount of token_1 to send, can be 0 to collect fees in only token_0',
        }),
    async (argv) => {
      console.log('collect fund fee data...');
      console.log('amount0:', argv.amount0);
      console.log('amount1:', argv.amount1);

      const data = await getCollectFundFeeData(argv.amount0, argv.amount1);
      console.log('data:', data);
    },
  )
  .command(
    'collect_protocol_fee_data',
    'Collect Protocol Fee Instruction Data',
    (yargs) =>
      yargs
        .option('amount0', {
          type: Number,
          default: 0,
          describe:
            'The maximum amount of token_0 to send, can be 0 to collect fees in only token_1',
        })
        .option('amount1', {
          type: Number,
          default: 0,
          describe:
            'The maximum amount of token_1 to send, can be 0 to collect fees in only token_0',
        }),
    async (argv) => {
      console.log('collect protocol fee data...');
      console.log('amount0:', argv.amount0);
      console.log('amount1:', argv.amount1);

      const data = await getCollectProtocolFeeData(argv.amount0, argv.amount1);
      console.log('data:', data);
    },
  )

  .help().argv;
