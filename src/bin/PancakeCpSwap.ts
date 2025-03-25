#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { PublicKey } from '@solana/web3.js';
import getPoolAccountKey from '../client/instructions/getPoolId';
import getPoolState from '../client/instructions/getPoolState';
import getAmmConfig from '../client/instructions/getAmmConfig';
import getCollectFundFeeData from '../client/instructions/data/collectFundFeeData';
import getCollectProtocolFeeData from '../client/instructions/data/collectProtocolFeeData';
import getAmmConfigAddressByIndex from '../client/instructions/getAmmConfigAddress';
import getUserTokenAccount from '../client/utils/getUserTokenAccount';
import getAuthorityAddress from '../client/instructions/getAuthorityAddress';
import getCreateAmmConfigData from '../client/instructions/data/createAmmConfigData';

yargs(hideBin(process.argv))
  .scriptName('pcs_cp')
  .usage('$0 <cmd> [args]')
  .command(
    'amm_config_address',
    'Calculate AMM Config Address',
    (yargs) =>
      yargs
        .option('programId', { type: 'string', describe: 'Program ID' })
        .option('index', { type: Number, default: 0, describe: 'Amm Config Index' }),
    async (argv) => {
      console.log('get pool state...');
      console.log('id:', argv.programId);
      console.log('index:', argv.index);

      const programId = new PublicKey(argv.programId as string);
      const index = parseInt(argv.index as string, 10);

      const [ammConfigAddress, bump] = await getAmmConfigAddressByIndex(programId, index);
      console.log('amm config address:', ammConfigAddress.toBase58());
    },
  )
  .command(
    'authority_address',
    'Get the authority address for a given program ID',
    (yargs) =>
      yargs.option('programId', {
        type: 'string',
        describe: 'The program ID',
        demandOption: true,
      }),
    async (argv) => {
      console.log('Fetching authority address...');
      console.log('programId:', argv.programId);

      const programId = new PublicKey(argv.programId as string);
      const [authorityAddress, bump] = await getAuthorityAddress(programId);

      console.log('Authority Address:', authorityAddress.toBase58());
      console.log('Bump:', bump);
    },
  )
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
  .command(
    'get_user_token_account',
    "Get the user's associated token account (ATA)",
    (yargs) =>
      yargs
        .option('userAddress', {
          type: 'string',
          describe: 'User wallet address',
          demandOption: true,
        })
        .option('tokenMintAddress', {
          type: 'string',
          describe: 'Token mint address',
          demandOption: true,
        })
        .option('isToken2022', {
          type: 'boolean',
          default: false,
          describe: 'Whether to use Token 2022 program ID',
        })
        .option('allowOwnerOffCurve', {
          type: 'boolean',
          default: false,
          describe: 'Allow owner off curve',
        }),
    async (argv) => {
      console.log('get user token account...');
      console.log('userAddress:', argv.userAddress);
      console.log('tokenMintAddress:', argv.tokenMintAddress);
      console.log('isToken2022:', argv.isToken2022);
      console.log('allowOwnerOffCurve:', argv.allowOwnerOffCurve);

      const tokenAccount = await getUserTokenAccount(
        argv.userAddress as string,
        argv.tokenMintAddress as string,
        argv.isToken2022 as boolean,
        argv.allowOwnerOffCurve as boolean,
      );

      console.log('User token account:', tokenAccount);
    },
  )
  .command(
    'sort_token_order',
    'Sort token0 and token1 addresses',
    (yargs) =>
      yargs
        .option('t0', {
          type: 'string',
          describe: 'The mint address of first token',
          demandOption: true,
        })
        .option('t1', {
          type: 'string',
          describe: 'The mint address of second token',
          demandOption: true,
        }),
    async (argv) => {
      console.log('Sorting tokens...');
      console.log('first token:', argv.t0);
      console.log('second:', argv.t1);

      const token0 = new PublicKey(argv.t0 as string);
      const token1 = new PublicKey(argv.t1 as string);

      // Sort tokens by their Base58 string representation
      let sortedTokens = [token0, token1].sort((a, b) => a.toBase58().localeCompare(b.toBase58()));

      console.log('Sorted tokens:');
      console.log('token0:', sortedTokens[0].toBase58());
      console.log('token1:', sortedTokens[1].toBase58());
    },
  )
  .command(
    'create_amm_config_data',
    'Generate raw instruction data for creating an AMM config',
    (yargs) =>
      yargs
        .option('index', {
          type: 'number',
          describe: 'The index of the AMM config',
          demandOption: true,
        })
        .option('tradeFeeRate', {
          type: 'number',
          describe: 'The trade fee rate',
          demandOption: true,
        })
        .option('protocolFeeRate', {
          type: 'number',
          describe: 'The protocol fee rate',
          demandOption: true,
        })
        .option('fundFeeRate', {
          type: 'number',
          describe: 'The fund fee rate',
          demandOption: true,
        })
        .option('createPoolFee', {
          type: 'number',
          describe: 'The fee for creating a pool',
          demandOption: true,
        }),
    async (argv) => {
      console.log('Generating create AMM config data...');
      console.log('index:', argv.index);
      console.log('tradeFeeRate:', argv.tradeFeeRate);
      console.log('protocolFeeRate:', argv.protocolFeeRate);
      console.log('fundFeeRate:', argv.fundFeeRate);
      console.log('createPoolFee:', argv.createPoolFee);
  
      const data = getCreateAmmConfigData(
        argv.index,
        argv.tradeFeeRate,
        argv.protocolFeeRate,
        argv.fundFeeRate,
        argv.createPoolFee,
      );
  
      console.log('Instruction Data (Hex):', data.hex);
      console.log('Instruction Data (Base58):', data.base58);
    },
  )
  .help().argv;
